import { Calendar, MapPin, Settings2} from "lucide-react";
import { Button } from "../../../components/Button";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { UpdateTripModal } from "./UpdateTripModal";

interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

export function Header() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
    }, [tripId]);

    const displayedDate = trip
        ? format(new Date(trip.starts_at), 'd LLL', { locale: ptBR }).concat(' até ', format(new Date(trip.ends_at), 'd LLL', { locale: ptBR }))
        : null;

    return (
        <div className="px-4 h-16 rounded-xl bg-gray-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="text-gray-400" size={24} />
                <span className="text-gray-400">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={24} />
                    <span className="text-gray-400">{displayedDate}</span>
                </div>

                <div className="w-px h-6 bg-gray-800" />

                <Button variant="secondary" onClick={() => setIsUpdateModalOpen(true)}> {/* Adicione a função para abrir o modal */}
                    Alterar Local/Data
                    <Settings2 size={20} />
                </Button>
            </div>

            {isUpdateModalOpen && ( /* Renderize o modal condicionalmente */
                <UpdateTripModal closeUpdateTripModal={() => setIsUpdateModalOpen(false)} />
            )}
        </div>
    );
}
