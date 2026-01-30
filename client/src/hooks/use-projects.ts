import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export interface Project {
    _id: Id<"projects">;
    _creationTime: number;
    name: string;
    tagline?: string;
    description?: string;
    image_url?: string;
    tags?: string[];
    website_url?: string;
    twitter_url?: string;
    cohort_id?: string;
    status?: string;
}

export function useProjects() {
    // Real-time query: auto-updates when data changes!
    const projects = useQuery(api.projects.list);
    const createProject = useMutation(api.projects.create);
    const updateProject = useMutation(api.projects.update);
    const deleteProjectMutation = useMutation(api.projects.remove);

    const loading = projects === undefined;

    const saveProject = async (project: Partial<Project> & { id?: string }, sessionId: string) => {
        try {
            if (project.id || project._id) {
                // Update existing
                const id = (project.id || project._id) as Id<"projects">;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { _id, _creationTime, id: legacyId, ...data } = project;

                await updateProject({
                    sessionId,
                    id,
                    ...data,
                });
            } else {
                // Create new
                await createProject({
                    sessionId,
                    name: project.name || "Untitled",
                    tagline: project.tagline,
                    description: project.description,
                    image_url: project.image_url,
                    tags: project.tags,
                    website_url: project.website_url,
                    twitter_url: project.twitter_url,
                    cohort_id: project.cohort_id,
                    status: project.status,
                });
            }
            return { success: true };
        } catch (err: any) {
            console.error("Error saving project:", err);
            return { success: false, message: err.message };
        }
    };

    const deleteProject = async (id: string, sessionId: string) => {
        try {
            await deleteProjectMutation({ sessionId, id: id as Id<"projects"> });
            return { success: true };
        } catch (err: any) {
            console.error("Error deleting project:", err);
            return { success: false, message: err.message };
        }
    };

    // Adapter to match old interface where possible
    const adaptedProjects = projects?.map((p: Project) => ({
        ...p,
        id: p._id, // Map _id to id for compatibility
    })) || [];

    return {
        projects: adaptedProjects,
        loading,
        error: null,
        refresh: () => { }, // No-op: Convex is real-time
        saveProject,
        deleteProject
    };
}
