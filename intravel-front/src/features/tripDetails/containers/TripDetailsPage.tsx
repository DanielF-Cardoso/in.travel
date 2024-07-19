import { PlusIcon } from "lucide-react";
import { CreateActivityModal } from "../components/CreateActivityModal";
import { ImportantLinks } from "../components/ImportantLinks";
import { Guests } from "../components/Guests";
import { Activities } from "../components/Activities";
import { Header } from "../components/Header";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";

export function TripDetailsPage() {
    const { tripId } = useParams<{ tripId: string }>();
    const navigate = useNavigate();
    interface Trip {
        id: string;
        name: string;
    }
    
    const [trip, setTrip] = useState<null | Trip>(null);
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    useEffect(() => {
        async function fetchTrip() {
            try {
                const response = await api.get(`/trips/${tripId}`);
                if (response.data) {
                    setTrip(response.data);
                } else {
                    navigate('/tripnotfound');
                }
            } catch (error) {
                navigate('/tripnotfound');
            }
        }

        fetchTrip();
    }, [tripId, navigate]);

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true);
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false);
    }

    if (trip === null) {
        return null;
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <Header />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <Button variant="primary" size="default" onClick={openCreateActivityModal}>
                            <PlusIcon size={20} />
                            Cadastrar Atividade
                        </Button>
                    </div>
                    <Activities />
                </div>
                <div className="w-80 space-y-6">
                    <ImportantLinks />
                    <div className="w-full h-px bg-gray-800" />
                    <Guests />
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} />
            )}

        </div>
    );
}
