import { Mail, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react"; 
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";

interface InviteParticipantModalProps {
    closeInviteParticipantModal: () => void
}

interface Participant {
    id: string;
    name: string;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
    trip_id: string;
  }

export function InviteParticipantModal({
    closeInviteParticipantModal
}: InviteParticipantModalProps) {
    const [error, setError] = useState<string | null>(null);
    const { tripId } = useParams();

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const name = data.get('name')?.toString();
        const email = data.get('email')?.toString();

        if(!name) {
            setError("É necessário informar o nome do convidado.");
            return;
        }

        if(!email) {
            setError("É necessário informar o e-mail do convidado.");
            return;
        }

        const response = await api.get(`/trips/${tripId}/participants?email=${email}`);
        const emailAlreadyRegistered = response.data.participants.some((participant: Participant) => participant.email === email);        
        if (emailAlreadyRegistered) {
            setError("Esse participante já faz parte da viagem.");
            return;
        }

        await api.post(`/trips/${tripId}/invite`, {
            name,
            email
        });

        window.document.location.reload()
    }

    return (
        <Modal>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Convidar Amigos</h2>
                    <button onClick={closeInviteParticipantModal}>
                        <X className="text-gray-400" size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-400">
                    Convide um amigo para se juntar a sua viagem. Os convidados receberão um e-mail com um link para confirmar sua participação.
                </p>

            </div>
            <form onSubmit={createLink} className="space-y-3">
                <div className="h-14 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
                    <Tag className="text-gray-400" size={20} />
                    <input name="name" type="name" placeholder="Nome do seu amigo" className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1" />
                </div>

                <div className="h-14 flex-1 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
                    <Mail className="text-gray-400" size={20} />
                    <input name="email" type="email" placeholder="O melhor e-mail dele" className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1" />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Button variant="primary" size="full">
                    Enviar Convite
                </Button>
            </form>
        </Modal>
    );
}