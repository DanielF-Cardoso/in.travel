import { User, X, AtSign } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";

interface ConfirmTripModalProps {
  closeConfirmModal: () => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  destination: string;
  startDate: string;
  endDate: string;
}

export function ConfirmTripModal({
  closeConfirmModal,
  setOwnerEmail,
  setOwnerName,
  createTrip,
  destination,
  startDate,
  endDate,
}: ConfirmTripModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let valid = true;

    if (!name) {
      setNameError("Por favor, preencha seu nome completo.");
      valid = false;
    } else {
      setNameError(null);
    }

    if (!email) {
      setEmailError("Por favor, preencha seu melhor e-mail.");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (valid) {
      setOwnerName(name);
      setOwnerEmail(email);
      createTrip(event);
    }
  }

  return (
    <Modal>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Confirmar Criação de Viagem</h2>
          <button onClick={closeConfirmModal}>
            <X className="text-gray-400" size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Para finalizar a criação da viagem para{" "}
          <span className="font-semibold text-gray-100">{destination}</span> nas
          datas de{" "}
          <span className="font-semibold text-gray-100">
            {startDate} a {endDate}
          </span>
          , preencha seus dados abaixo:
        </p>
      </div>

      <form onSubmit={handleCreateTrip} className="space-y-3">
        <div className="py-2.5 px-4 bg-gray-950 border border-gray-800 rounded-lg flex items-center gap-2">
          <User className="text-gray-400" size={20} />
          <input
            type="name"
            name="name"
            placeholder="Seu nome completo"
            className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {nameError && (
          <div className="text-red-500 text-sm mt-2">{nameError}</div>
        )}

        <div className="py-2.5 px-4 bg-gray-950 border border-gray-800 rounded-lg flex items-center gap-2">
          <AtSign className="text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Seu melhor e-mail"
            className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        {emailError && (
          <div className="text-red-500 text-sm mt-2">{emailError}</div>
        )}
        <p className="text-sm text-gray-400">
            Você receberá um e-mail de confirmação para a criação da viagem.
        </p>
        <Button type="submit" variant="primary" size="full">
          Confirmar Criação da Viagem
        </Button>
      </form>
    </Modal>
  );
}
