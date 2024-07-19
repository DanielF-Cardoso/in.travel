import { ClientError } from "../errors/client-error";
import { dayjs } from "../utils/dayjs";
import { sendTripConfirmationEmail } from "../utils/emails";
import { getMailClient } from "../config/mail";
import { prisma } from "../utils/prisma";

export async function createActivity(
  tripId: string,
  data: { title: string; occurs_at: Date }
) {
  const { title, occurs_at } = data;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  if (dayjs(occurs_at).isBefore(trip.starts_at)) {
    throw new ClientError(
      "A data da atividade precisa ser depois do início da viagem"
    );
  }

  if (dayjs(occurs_at).isAfter(dayjs(trip.ends_at).endOf("day"))) {
    throw new ClientError("Invalid activity date.");
  }

  const activity = await prisma.activity.create({
    data: {
      title,
      occurs_at,
      trip_id: tripId,
    },
  });

  return { activity };
}

export async function getActivities(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      activities: {
        orderBy: {
          occurs_at: "asc",
        },
      },
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const differrenceInDaysBetweenStartAndEnd = dayjs(trip.ends_at).diff(
    dayjs(trip.starts_at),
    "days"
  );

  const activities = Array.from({
    length: differrenceInDaysBetweenStartAndEnd + 1,
  }).map((_, index) => {
    const date = dayjs(trip.starts_at).add(index, "days");

    return {
      date: date.toDate(),
      activities: trip.activities.filter((activity) => {
        return dayjs(activity.occurs_at).isSame(date, "day");
      }),
    };
  });

  return activities;
}

export async function deleteActivity(tripId: string, activityId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      activities: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const activity = trip.activities.find(
    (activity) => activity.id === activityId
  );

  if (!activity) {
    throw new ClientError("Atividade não encontrada");
  }

  await prisma.activity.delete({
    where: {
      id: activityId,
    },
  });

  return { tripId, activityId };
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
