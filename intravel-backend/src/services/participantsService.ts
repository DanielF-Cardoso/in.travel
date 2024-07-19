import { ClientError } from "../errors/client-error";
import { sendTripConfirmationEmail } from "../utils/emails";
import { getMailClient } from "../config/mail";
import { prisma } from "../utils/prisma";

export async function confirmParticipant(participantId: string) {
  const participant = await prisma.participant.findUnique({
    where: {
      id: participantId,
    },
    include: {
      trip: true,
    },
  });

  if (!participant) {
    throw new ClientError("Participante não encontrado");
  }

  if (participant.is_confirmed) {
    return;
  }

  await prisma.participant.update({
    where: {
      id: participantId,
    },
    data: {
      is_confirmed: true,
    },
  });

  return participant.trip.id;
}

export async function getParticipant(participantId: string) {
  const participant = await prisma.participant.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      is_confirmed: true,
    },
    where: {
      id: participantId,
    },
  });

  if (!participant) {
    throw new ClientError("Participante não encontrado");
  }

  return participant;
}

export async function deleteParticipant(tripId: string, participantId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      participants: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const participantExists = trip.participants.some(
    (participant) => participant.id === participantId
  );
  if (!participantExists) {
    throw new ClientError("Participante não encontrado");
  }

  await prisma.participant.delete({
    where: {
      id: participantId,
    },
  });

  return { tripId, participantId };
}

export async function getParticipants(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      participants: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  return trip.participants;
}

export async function createInvite(
  tripId: string,
  data: { email: string; name: string }
) {
  const { email } = data;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      participants: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const participant = await prisma.participant.create({
    data: {
      email,
      name: data.name,
      trip_id: tripId,
    },
  });

  const transporter = await getMailClient();

  await sendTripConfirmationEmail(trip, transporter, participant);

  return { participant };
}
