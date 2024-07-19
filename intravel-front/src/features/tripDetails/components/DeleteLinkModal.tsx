import { X } from "lucide-react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface DeletelinksModalProps {
    closeDeletelinksModal: () => void;
    linksId: string;
}

export function DeletelinksModal({
    closeDeletelinksModal,
    linksId
}: DeletelinksModalProps) {

    const { tripId } = useParams();

    async function deletelinks() {
        await api.delete(`/trips/${tripId}/links/${linksId}`);
        window.document.location.reload();
    }

    return (
        <Modal>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Deletar Link</h2>
                    <button onClick={closeDeletelinksModal}>
                        <X className="text-gray-400" size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-400">
                    Tem certeza que deseja deletar este link? Esta ação não pode ser desfeita.
                </p>
            </div>

            <div className="space-y-3">
                <Button variant="danger" size="full" onClick={deletelinks}>
                    Deletar link
                </Button>
            </div>
        </Modal>
    );
}