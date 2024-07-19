import { Link2, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "../components/CreateLinkModal";
import { DeletelinksModal } from "../components/DeleteLinkModal";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";

interface Links {
    id: string;
    title: string;
    url: string;
}

export function ImportantLinks() {
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
    const [isDeleteLinkModalOpen, setIsDeleteLinkModalOpen] = useState(false);
    const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true);
    }

    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false);
    }

    function openDeleteLinkModal(linkId: string) {
        setSelectedLinkId(linkId);
        setIsDeleteLinkModalOpen(true);
    }

    function closeDeleteLinkModal() {
        setIsDeleteLinkModalOpen(false);
    }

    const { tripId } = useParams();
    const [links, setLinks] = useState<Links[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links));
    }, [tripId]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>
            <div className="space-y-5">
                {links.length > 0 ? (
                    links.map(link => (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <div>
                                    <span className="block font-medium text-gray-100">{link.title}</span>
                                    <a href={link.url} className="block text-xs text-gray-400 truncate hover:text-zinc-200">
                                        {link.url}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href={link.url}>
                                <Link2 className="shrink-0" size={20} />
                                </a>
                                <Trash2 className="shrink-0 text-red-500 cursor-pointer" size={20} onClick={() => openDeleteLinkModal(link.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Nenhum link cadastrado.</p>
                )}
            </div>

            <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
                <PlusIcon size={20} />
                Cadastrar Novo Link
            </Button>

            {isCreateLinkModalOpen && (
                <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
            )}

            {isDeleteLinkModalOpen && selectedLinkId && (
                <DeletelinksModal closeDeletelinksModal={closeDeleteLinkModal} linksId={selectedLinkId} />
            )}
        </div>
    );
}