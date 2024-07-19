import { CircleCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { DeleteActivityModal } from "./DeleteActivityModal";

interface Activity {
    date: string;
    activities: {
        id: string;
        title: string;
        occurs_at: string;
    }[];
}

export function Activities() {
    const { tripId } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

    useEffect(() => {
        api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities));
      }, [tripId]);

    const openDeleteModal = (activityId: string) => {
        setSelectedActivityId(activityId);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-8">
            {activities.map(category => (
                <div key={category.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-gray-300 font-semibold">Dia {format(new Date(category.date), 'd', { locale: pt })}</span>
                        <span className="text-xs text-gray-500">{format(new Date(category.date), 'EEEE', { locale: pt })}</span>
                    </div>
                    {category.activities.length > 0 ? (
                        <div className="space-y-2.5">
                            {category.activities.map(activity => (
                                <div key={activity.id} className="px-4 py-2.5 bg-gray-900 rounded-xl shadow-shape flex items-center gap-3">
                                    <CircleCheck className="text-lime-300" size={20} />
                                    <span className="text-gray-100">{activity.title}</span>
                                    <span className="text-sm ml-auto text-gray-400">
                                        {format(new Date(activity.occurs_at), 'HH:mm')} h
                                    </span>
                                    <Trash2 className="shrink-0 text-red-500 cursor-pointer" size={14} onClick={() => openDeleteModal(activity.id)} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Nenhuma atividade cadastrada nessa data.</p>
                    )}
                </div>
            ))}
            {isDeleteModalOpen && selectedActivityId && (
                <DeleteActivityModal
                    activityId={selectedActivityId}
                    closeDeleteActivityModal={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    );
}