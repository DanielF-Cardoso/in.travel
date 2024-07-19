import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const [error, setError] = useState<string | null>(null);
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occurs_at = data.get("occurs_at")?.toString();

    if (!title) {
      setError("É necessário informar o nome da atividade.");
      return;
    }

    if (!occurs_at) {
      setError("É necessário informar a data e hora da atividade.");
      return;
    }

    const tripResponse = await api.get(`/trips/${tripId}`);
    const { starts_at, ends_at } = tripResponse.data.trip;

    const activityDate = new Date(occurs_at);
    const startDate = new Date(starts_at);
    const endDate = new Date(ends_at);

    if (activityDate < startDate) {
      setError(
        "Não é possível cadastrar uma atividade antes do início da viagem."
      );
      return;
    }

    if (activityDate > endDate) {
      setError(
        "Não é possível cadastrar uma atividade após o término da viagem."
      );
      return;
    }

    await api.post(`/trips/${tripId}/activities`, { title, occurs_at });

    window.document.location.reload();
  }

  return (
    <Modal>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cadastrar Atividade</h2>
          <button onClick={closeCreateActivityModal}>
            <X className="text-gray-400" size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Cadastre uma nova atividade para a viagem, todos os convidados podem
          visualizar as atividades.
        </p>
      </div>

      <form onSubmit={createActivity} className="space-y-3">
        <div className="h-14 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
          <Tag className="text-gray-400" size={20} />
          <input
            name="title"
            type="title"
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
          />
        </div>

        <div className="h-14 flex-1 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
          <Calendar className="text-gray-400" size={20} />
          <input
            name="occurs_at"
            type="datetime-local"
            placeholder="Data e horário da atividade"
            className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <Button variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  );
}
