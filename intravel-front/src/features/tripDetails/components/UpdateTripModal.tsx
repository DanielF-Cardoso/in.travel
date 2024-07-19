import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { DayPicker, DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { X, Calendar, Map } from "lucide-react";
import { format } from "date-fns";

interface UpdateTripModalProps {
  closeUpdateTripModal: () => void;
}

export function UpdateTripModal({
  closeUpdateTripModal,
}: UpdateTripModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { tripId } = useParams();

  async function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !eventStartAndEndDates ||
      !eventStartAndEndDates.from ||
      !eventStartAndEndDates.to
    ) {
      setError("Por favor, selecione um intervalo de datas.");
      return;
    }

    if (!destination) {
      setError("Por favor, preencha o destino.");
      return;
    }

    try {
      await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: eventStartAndEndDates.from.toISOString(),
        ends_at: eventStartAndEndDates.to.toISOString(),
      });

      window.document.location.reload();
    } catch (error) {
      setError("Erro ao atualizar a viagem. Tente novamente.");
    }
  }

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? `${format(eventStartAndEndDates.from, "d LLL")} até ${format(
          eventStartAndEndDates.to,
          "d LLL"
        )}`
      : "Selecione as datas";

  return (
    <Modal>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Atualizar Detalhes da Viagem
          </h2>
          <button onClick={closeUpdateTripModal}>
            <X className="text-gray-400" size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Atualize os detalhes da viagem. Certifique-se de preencher todos os
          campos.
        </p>

        <div className="flex flex-col gap-2">
          <div className="h-14 px-4 bg-gray-950 rounded-lg flex items-center gap-2">
            <Map className="text-gray-400" size={20} />
            <input
              name="destination"
              type="text"
              placeholder="Destino da viagem"
              className="bg-transparent text-lg placeholder-gray-400 outline-none flex-1"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>

          <button
            onClick={openDatePicker}
            className="h-14 px-4 bg-gray-950 rounded-lg flex items-center gap-2"
          >
            <Calendar className="text-gray-400" size={20} />
            <span className="text-lg text-gray-400">{displayedDate}</span>
          </button>
        </div>

        {isDatePickerOpen && (
          <Modal>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione as Datas</h2>
                <button onClick={closeDatePicker}>
                  <X className="text-gray-400" size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Informe a data de início e fim da viagem
              </p>

              <DayPicker
                mode="range"
                numberOfMonths={2}
                pagedNavigation
                showOutsideDays
                locale={ptBR}
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </Modal>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

        <form onSubmit={updateTrip} className="mt-4">
          <Button variant="primary" size="full">
            Atualizar Viagem
          </Button>
        </form>
      </div>
    </Modal>
  );
}
