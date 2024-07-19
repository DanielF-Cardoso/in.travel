import { AtSign, Mail, User, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";

interface InviteGuestsModalProps {
    closeGuestsModal: () => void;
    participants: { name: string; email: string }[];
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>, name: string, email: string) => void;
    removeEmailToInvite: (email: string) => void;
}

export function InviteGuestsModal({
    closeGuestsModal,
    participants,
    addNewEmailToInvite,
    removeEmailToInvite
}: InviteGuestsModalProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addNewEmailToInvite(event, name, email);
        setName("");
        setEmail("");
    }

    return (
        <Modal>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecionar Amigos</h2>
                    <button onClick={closeGuestsModal}>
                        <X className="text-gray-400" size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-400">
                    Os seus amigos receberão e-mails para confirmar a participação na viagem.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {participants.map(({ name, email }) => (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-gray-800 flex items-center gap-2">
                        <span className="text-gray-300">{name} - {email}</span>
                        <button type="button" onClick={() => removeEmailToInvite(email)}>
                            <X className="text-gray-400" size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full h-px bg-gray-800" />

            <form onSubmit={handleSubmit} className="p-2.5 bg-gray-950 border border-gray-800 rounded-lg flex flex-col gap-4">
                <div className="px-2 flex items-center flex-1 gap-2 mb-2">
                    <User className="text-gray-400" size={20} />
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome do seu amigo"
                        className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
                    />
                </div>               
                <div className="px-2 flex items-center flex-1 gap-2">
                    <AtSign className="text-gray-400" size={20} />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o e-mail do seu amigo"
                        className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
                    />
                </div>

                <Button type="submit" variant="primary">
                    Convidar Amigo
                    <Mail size={20} />
                </Button>
            </form>
        </Modal>
    )
}
