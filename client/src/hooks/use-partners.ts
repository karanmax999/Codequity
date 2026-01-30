import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface Partner {
    _id: Id<"partners">;
    _creationTime: number;
    name: string;
    category: string;
    logo_url?: string;
    website_url?: string;
    perk_title?: string;
    perk_description?: string;
    is_active: boolean;
}

export function usePartners() {
    const partners = useQuery(api.partners.list);
    const createPartner = useMutation(api.partners.create);
    const updatePartner = useMutation(api.partners.update);
    const deletePartnerMutation = useMutation(api.partners.remove);

    const loading = partners === undefined;

    const savePartner = async (partner: Partial<Partner> & { id?: string }, sessionId: string) => {
        try {
            if (partner.id || partner._id) {
                // Update
                const id = (partner.id || partner._id) as Id<"partners">;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { _id, _creationTime, id: legacyId, ...data } = partner;

                await updatePartner({
                    sessionId,
                    id,
                    name: data.name,
                    category: data.category,
                    logo_url: data.logo_url,
                    website_url: data.website_url,
                    perk_title: data.perk_title,
                    perk_description: data.perk_description,
                });
            } else {
                // Create
                await createPartner({
                    sessionId,
                    name: partner.name || "Untitled",
                    category: partner.category,
                    logo_url: partner.logo_url,
                    website_url: partner.website_url,
                    perk_title: partner.perk_title,
                    perk_description: partner.perk_description,
                    is_active: true,
                });
            }
            return { success: true };
        } catch (err: any) {
            console.error("Error saving partner:", err);
            return { success: false, message: err.message };
        }
    };

    const deletePartner = async (id: string, sessionId: string) => {
        try {
            await deletePartnerMutation({ sessionId, id: id as Id<"partners"> });
            return { success: true };
        } catch (err: any) {
            console.error("Error deleting partner:", err);
            return { success: false, message: err.message };
        }
    };

    // Adapter
    const adaptedPartners = (partners || []).map((p: any) => ({
        ...p,
        id: p._id,
    })) as Partner[];

    return {
        partners: adaptedPartners,
        loading,
        error: null,
        refresh: () => { },
        savePartner,
        deletePartner
    };
}
