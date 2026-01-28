import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Partner {
    id: string;
    name: string;
    category: string;
    logo_url: string;
    website_url: string;
    perk_title?: string;
    perk_description?: string;
    is_active: boolean;
}

export function usePartners() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPartners = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('partners')
                .select('*')
                .order('name');

            if (fetchError) throw fetchError;
            setPartners(data || []);
        } catch (err: any) {
            console.error('Error fetching partners:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const savePartner = async (partner: Partial<Partner>) => {
        try {
            const { id, ...data } = partner;
            const { error: saveError } = id
                ? await supabase.from('partners').update(data).eq('id', id)
                : await supabase.from('partners').insert([data]);

            if (saveError) throw saveError;
            await fetchPartners();
            return { success: true };
        } catch (err: any) {
            return { success: false, message: err.message };
        }
    };

    const deletePartner = async (id: string) => {
        try {
            const { error: deleteError } = await supabase.from('partners').delete().eq('id', id);
            if (deleteError) throw deleteError;
            await fetchPartners();
            return { success: true };
        } catch (err: any) {
            return { success: false, message: err.message };
        }
    };

    return { partners, loading, error, refresh: fetchPartners, savePartner, deletePartner };
}
