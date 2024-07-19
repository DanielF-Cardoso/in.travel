import { PlaneTakeoff, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/Button";
import { useState } from "react";

interface Participant {
  name: string;
  email: string;
}

interface InviteGuestsStepProps {
  GuestsModal: () => void;
  ConfirmModal: () => void;
  participants: Participant[];
}

export function InviteGuestsStep({
  GuestsModal,
  ConfirmModal,
  participants,
}: InviteGuestsStepProps) {
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (participants.length === 0) {
      setError("É necessário pelo menos adicionar um amigo.");
    } else {
      setError(null);
      ConfirmModal();
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <button
          type="button"
          onClick={GuestsModal}
          className="flex items-center gap-2 flex-1"
        >
          <UserRoundPlus className="text-gray-400" size={20} />
          {participants.length > 0 ? (
            <span className="text-gray-100 text-lg text-left flex-1">
              {participants.length} amigo(s) convidado(s)
            </span>
          ) : (
            <span className="text-gray-400 text-lg text-left flex-1">
              Com quem vamos?
            </span>
          )}
        </button>

        <div className="w-px h-6 bg-gray-800" />

        <Button variant="primary" size="default" onClick={handleConfirm}>
          Confirmar Viagem
          <PlaneTakeoff size={20} />
        </Button>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
