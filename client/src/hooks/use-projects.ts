import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    image_url: string;
    tags: string[];
    website_url: string;
    twitter_url?: string;
    cohort_id: string;
    status: string;
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('projects')
                .select('*')
                .order('name');

            if (fetchError) throw fetchError;
            setProjects(data || []);
        } catch (err: any) {
            console.error('Error fetching projects:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const saveProject = async (project: Partial<Project>) => {
        try {
            const { id, ...data } = project;
            const { error: saveError } = id
                ? await supabase.from('projects').update(data).eq('id', id)
                : await supabase.from('projects').insert([data]);

            if (saveError) throw saveError;
            await fetchProjects();
            return { success: true };
        } catch (err: any) {
            return { success: false, message: err.message };
        }
    };

    const deleteProject = async (id: string) => {
        try {
            const { error: deleteError } = await supabase.from('projects').delete().eq('id', id);
            if (deleteError) throw deleteError;
            await fetchProjects();
            return { success: true };
        } catch (err: any) {
            return { success: false, message: err.message };
        }
    };

    return { projects, loading, error, refresh: fetchProjects, saveProject, deleteProject };
}
