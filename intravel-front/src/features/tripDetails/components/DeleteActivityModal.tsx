import { X } from "lucide-react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface DeleteActivityModalProps {
    closeDeleteActivityModal: () => void;
    activityId: string; 
}

export function DeleteActivityModal({
    closeDeleteActivityModal,
    activityId
}: DeleteActivityModalProps) {

    const { tripId } = useParams();

    async function deleteActivity() {
        await api.delete(`/trips/${tripId}/activities/${activityId}`);
        window.document.location.reload();
    }

    return (
        <Modal>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Deletar Atividade</h2>
                    <button onClick={closeDeleteActivityModal}>
                        <X className="text-gray-400" size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-400">
                    Tem certeza que deseja deletar esta atividade? Esta ação não pode ser desfeita.
                </p>
            </div>

            <div className="space-y-3">
                <Button variant="danger" size="full" onClick={deleteActivity}>
                    Deletar atividade
                </Button>
            </div>
        </Modal>
    );
}