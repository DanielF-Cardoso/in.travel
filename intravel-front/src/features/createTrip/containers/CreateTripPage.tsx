import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from '../components/InviteGuestsModal'
import { ConfirmTripModal } from '../components/ConfirmTripModal'
import { DestinationAndDateStep } from '../components/DestinationAndDateStep'
import { InviteGuestsStep } from '../components/InviteGuest'
import { DateRange } from 'react-day-picker'
import { api } from '../../../lib/axios'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function CreateTripPage() {
  const navigate = useNavigate()

  const [IsGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setGuestsModalOpen] = useState(false)
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const [participants, setParticipants] = useState<{ name: string; email: string }[]>([])

  function GuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function GuestsModal() {
    setGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setGuestsModalOpen(false)
  }

  function ConfirmModal() {
    setConfirmModalOpen(true)
  }

  function closeConfirmModal() {
    setConfirmModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()

    if (!name || !email) {
      return null
    }

    if (participants.some(participant => participant.email === email)) {
      return
    }

    setParticipants([
      ...participants,
      { name, email }
    ])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newParticipantList = participants.filter(participant => participant.email !== emailToRemove)
    setParticipants(newParticipantList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination, ownerName, ownerEmail, eventStartAndEndDates, participants)

    if (!destination || !ownerName || !ownerEmail || !eventStartAndEndDates || participants.length === 0) {
      return null
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      participants
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="IN.TRAVEL" className="w-56" />
          <p className="text-gray-300 text-lg">Transforme sonhos em destinos incríveis com seus amigos</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            IsGuestsInputOpen={IsGuestsInputOpen}
            GuestsInput={GuestsInput}
            closeGuestsInput={closeGuestsInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {IsGuestsInputOpen && (
            <InviteGuestsStep
              GuestsModal={GuestsModal}
              ConfirmModal={ConfirmModal}
              participants={participants}
            />
          )}
        </div>

        <p className="text-gray-500 text-sm">
          Planejar sua viagem com a IN.TRAVEL significa concordar <br />
          com nossos <a className="text-gray-300 underline" href="#">Termos de Uso</a> e <a className="text-gray-300 underline" href="#">Políticas de Privacidade.</a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          participants={participants}
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          removeEmailToInvite={removeEmailToInvite}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmTripModal
          closeConfirmModal={closeConfirmModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          destination={destination}
          startDate={eventStartAndEndDates?.from ? format(eventStartAndEndDates.from, 'd LLL', { locale: ptBR }) : ''}
          endDate={eventStartAndEndDates?.to ? format(eventStartAndEndDates.to, 'd LLL', { locale: ptBR }) : ''}
        />
      )}
    </div>
  )
}
