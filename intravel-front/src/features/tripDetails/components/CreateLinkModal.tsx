import { Link2, Tag, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
}

export function CreateLinkModal({
    closeCreateLinkModal
}: CreateLinkModalProps) {
    const [error, setError] = useState<string | null>(null);

    const { tripId } = useParams()

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        
        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()

        if(!url) {
            setError("É necessário pelo menos adicionar um link.");
            return;
        }

        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        window.document.location.reload()

    }

    return (
        <Modal>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Cadastrar Link</h2>
                    <button onClick={closeCreateLinkModal}>
                        <X className="text-gray-400" size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-400">
                    Cadastre um novo link para a viagem, todos os convidados podem visualizar os links.
                </p>

            </div>

            <form onSubmit={createLink} className="space-y-3">

                <div className="h-14 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
                    <Tag className="text-gray-400" size={20} />
                    <input name="title" type="title" placeholder="Qual a atividade?" className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1" />
                </div>

                <div className="h-14 flex-1 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
                    <Link2 className="text-gray-400" size={20} />
                    <input name="url" type="url" placeholder="URL do link" className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1" />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Button variant="primary" size="full">
                    Salvar Link
                </Button>
            
            </form>
        </Modal>
    )
}