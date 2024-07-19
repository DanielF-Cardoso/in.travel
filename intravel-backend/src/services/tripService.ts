import { ClientError } from "../errors/client-error";
import { dayjs } from "../utils/dayjs";
import { prisma } from "../utils/prisma";
import { CreateTripSchema } from "../schemas/tripSchemas";
import {
  sendConfirmationEmails,
  sendTripCreationConfirmationEmail,
} from "../utils/emails";
import { getMailClient } from "../config/mail";

export async function createTrip(data: CreateTripSchema) {
  const {
    destination,
    starts_at,
    ends_at,
    owner_name,
    owner_email,
    participants,
  } = data;

  const startDate = new Date(starts_at);
  const endDate = new Date(ends_at);

  if (dayjs(startDate).isBefore(new Date())) {
    throw new ClientError("A data de início da viagem precisa ser no futuro");
  }

  if (dayjs(endDate).isBefore(startDate)) {
    throw new ClientError(
      "A data de fim da viagem precisa ser depois da data de início"
    );
  }

  const trip = await prisma.trip.create({
    data: {
      destination,
      starts_at: startDate,
      ends_at: endDate,
      participants: {
        createMany: {
          data: [
            {
              name: owner_name,
              email: owner_email,
              is_owner: true,
              is_confirmed: true,
            },
            ...participants.map(({ name, email }) => ({
              name,
              email,
              is_confirmed: false,
              is_owner: false,
            })),
          ],
        },
      },
    },
  });

  const transporter = await getMailClient();
  await sendTripCreationConfirmationEmail(
    destination,
    startDate,
    endDate,
    owner_name,
    owner_email,
    trip.id,
    transporter
  );

  return trip;
}

export async function getTrip(tripId: string) {
  const trip = await prisma.trip.findUnique({
    select: {
      id: true,
      destination: true,
      starts_at: true,
      ends_at: true,
      is_confirmed: true,
    },
    where: { id: tripId },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  return trip;
}

export async function confirmTrip(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      participants: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  if (trip.is_confirmed) {
    return;
  }

  await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      is_confirmed: true,
    },
  });

  const transporter = await getMailClient();

  const participantsToNotify = trip.participants.filter(
    (participant) => !participant.is_owner
  );

  try {
    await sendConfirmationEmails(trip, transporter, participantsToNotify);
  } catch (error) {
    throw new Error("Falha ao enviar e-mails de confirmação");
  }

  return { message: "Viagem confirmada e e-mails enviados com sucesso." };
}

export async function updateTrip(
  tripId: string,
  data: { destination: string; starts_at: Date; ends_at: Date }
) {
  const { destination, starts_at, ends_at } = data;

  if (dayjs(starts_at).isBefore(new Date())) {
    throw new ClientError("A data de início da viagem precisa ser no futuro");
  }

  if (dayjs(ends_at).isBefore(starts_at)) {
    throw new ClientError(
      "A data de fim da viagem precisa ser depois da data de início"
    );
  }

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  await prisma.trip.update({
    where: {
      id: tripId,
    },
    data: {
      destination,
      starts_at,
      ends_at,
    },
  });

  return { tripId: trip.id };
}
