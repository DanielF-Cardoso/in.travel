import nodemailer from "nodemailer";
import { env } from "../config/env";
import { dayjs } from "./dayjs";
import { Trip, Participant } from "@prisma/client";
import { tripCreationConfirmationEmail } from "../emails/tripConfirmationEmail";
import { tripParticipantConfirmationEmail } from "../emails/participantConfirmationEmail";

export async function sendConfirmationEmails(
  trip: Trip & { participants: Participant[] },
  transporter: nodemailer.Transporter,
  participantsToNotify: Participant[]
) {
  const formattedStartDate = dayjs(trip.starts_at).format("LL");
  const formattedEndDate = dayjs(trip.ends_at).format("LL");

  await Promise.all(
    participantsToNotify.map(async (participant) => {
      const confirmationLink = `${env.API_BASE_URL}/api/v1/participants/${participant.id}/confirm`;

      try {
        await transporter.sendMail({
          from: {
            name: env.EMAIL_NAME,
            address: env.EMAIL_USER,
          },
          to: participant.email,
          subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate} a ${formattedEndDate}`,
          html: tripParticipantConfirmationEmail(
            trip.destination,
            formattedStartDate,
            formattedEndDate,
            confirmationLink,
            participant.name
          ),
        });
      } catch (error) {
        console.error(
          `Erro ao enviar e-mail para ${participant.email}:`,
          error
        );
      }
    })
  );
}

export async function sendTripCreationConfirmationEmail(
  destination: string,
  starts_at: Date,
  ends_at: Date,
  owner_name: string,
  owner_email: string,
  tripId: string,
  transporter: nodemailer.Transporter
) {
  const formattedStartDate = dayjs(starts_at).format("LL");
  const formattedEndDate = dayjs(ends_at).format("LL");
  const confirmationLink = `${env.API_BASE_URL}/api/v1/trips/${tripId}/confirm`;

  try {
    await transporter.sendMail({
      from: {
        name: env.EMAIL_NAME,
        address: env.EMAIL_USER,
      },
      to: {
        name: owner_name,
        address: owner_email,
      },
      subject: `Confirme sua viagem para ${destination} em ${formattedStartDate} a ${formattedEndDate}`,
      html: tripCreationConfirmationEmail(
        destination,
        formattedStartDate,
        formattedEndDate,
        confirmationLink,
        owner_name
      ),
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendTripConfirmationEmail(
  trip: Trip & { participants: Participant[] },
  transporter: nodemailer.Transporter,
  participant: Participant
) {
  const formattedStartDate = dayjs(trip.starts_at).format("LL");
  const formattedEndDate = dayjs(trip.ends_at).format("LL");

  const confirmationLink = `${env.API_BASE_URL}/api/v1/participants/${participant.id}/confirm`;

  await transporter.sendMail({
    from: {
      name: env.EMAIL_NAME,
      address: env.EMAIL_USER,
    },
    to: participant.email,
    subject: `Confirme sua presença na viagem para ${trip.destination} em ${formattedStartDate} a ${formattedEndDate}`,
    html: tripParticipantConfirmationEmail(
      trip.destination,
      formattedStartDate,
      formattedEndDate,
      confirmationLink,
      participant.name
    ),
  });
}
