import { CheckCircle2, CircleDashed, UserPlus } from "lucide-react";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { InviteParticipantModal } from "./InviteParticipantModal";

interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {
    const [isInviteParticipantModalOpen, setIsInviteParticipantModal] = useState(false);

    function openInviteParticipantModal() {
        setIsInviteParticipantModal(true);
    }

    function closeInviteParticipantModal() {
        setIsInviteParticipantModal(false);
    }

    const { tripId } = useParams()
    const [participants, setParticipants] = useState<Participant[]>([])

    useEffect(() => {
        api.get(`trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-gray-100">{participant.name ?? `Convidado ${index}`}</span>
                                <span className="block text-xs text-gray-400 truncate">
                                    {participant.email}</span>
                            </div>
                            {participant.is_confirmed ? (
                                <CheckCircle2 className="text-green-400 shrink-0" size={24} />
                            ) : (
                                <CircleDashed className="text-gray-400 shrink-0" size={24} />
                            )}
                        </div>
                    )
                })}
            </div>

            <Button  onClick={ openInviteParticipantModal } variant="secondary" size="full">
                <UserPlus size={20} />
                Convidar Amigos
            </Button>

            {isInviteParticipantModalOpen && (
                <InviteParticipantModal closeInviteParticipantModal={closeInviteParticipantModal} />
            )}

        </div>
    )
}