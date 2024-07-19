import { Calendar, CircleArrowRight, Map, Settings2, X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { useState } from 'react';
import { Modal } from '../../../components/Modal';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import "react-day-picker/dist/style.css";
import { ptBR } from 'date-fns/locale';

interface DestinationAndDateStepProps {
  IsGuestsInputOpen: boolean;
  eventStartAndEndDates: DateRange | undefined;
  GuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  IsGuestsInputOpen,
  GuestsInput,
  closeGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destination, setDestinationState] = useState<string>('');

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function validateDates() {
    if (!destination) {
      setError("Por favor, insira o destino.");
      return false;
    }

    if (!eventStartAndEndDates || !eventStartAndEndDates.from || !eventStartAndEndDates.to) {
      setError("Por favor, selecione as datas de início e fim.");
      return false;
    }

    const now = new Date();
    if (eventStartAndEndDates.from < now) {
      setError("Ooops, a data de início da viagem precisa ser no futuro.");
      return false;
    }

    if (eventStartAndEndDates.to < eventStartAndEndDates.from) {
      setError("Ooops, a data de fim da viagem precisa ser depois da data de início.");
      return false;
    }

    setError(null);
    return true;
  }

  function handleGuestsInput() {
    if (validateDates()) {
      GuestsInput();
    }
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, 'd LLL').concat(' até ', format(eventStartAndEndDates.to, 'd LLL'))
    : null;

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Map className="text-gray-400" size={20} />
          <input
            disabled={IsGuestsInputOpen}
            type="text"
            placeholder="Para onde vamos?"
            className="bg-transparent placeholder-gray-400 text-lg outline-none flex-1"
            onChange={event => {
              setDestination(event.target.value);
              setDestinationState(event.target.value);
            }}
          />
        </div>

        <button onClick={openDatePicker} disabled={IsGuestsInputOpen} className="flex items-center gap-2 text-left">
          <Calendar className="text-gray-400" size={20} />
          <span className="text-lg text-gray-400 w-40">
            {displayedDate || 'Quando?'}
          </span>
        </button>

        {isDatePickerOpen && (
          <Modal>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="text-gray-400" size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-400">
                Informe a data de início e fim da viagem
              </p>

              <DayPicker mode="range" numberOfMonths={2} pagedNavigation showOutsideDays locale={ptBR} selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
            </div>
          </Modal>
        )}

        <div className="w-px h-6 bg-gray-800" />

        {IsGuestsInputOpen ? (
          <Button variant="secondary" size="default" onClick={closeGuestsInput}>
            Alterar Local/Data
            <Settings2 size={20} />
          </Button>
        ) : (
          <Button variant="primary" size="default" onClick={handleGuestsInput}>
            Continuar
            <CircleArrowRight size={20} />
          </Button>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  )
}
