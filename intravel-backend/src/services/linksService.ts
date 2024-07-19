import { ClientError } from "../errors/client-error";
import { prisma } from "../utils/prisma";

export async function createLink(
  tripId: string,
  data: { title: string; url: string }
) {
  const { title, url } = data;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const link = await prisma.link.create({
    data: {
      title,
      url,
      trip_id: tripId,
    },
  });

  return { link };
}

export async function getLinks(tripId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      Link: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  return trip.Link;
}

export async function deleteLink(tripId: string, linkId: string) {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
    include: {
      Link: true,
    },
  });

  if (!trip) {
    throw new ClientError("Viagem não encontrada");
  }

  const link = trip.Link.find((link) => link.id === linkId);

  if (!link) {
    throw new ClientError("Link não encontrado");
  }

  await prisma.link.delete({
    where: {
      id: linkId,
    },
  });

  return { tripId, linkId };
}
