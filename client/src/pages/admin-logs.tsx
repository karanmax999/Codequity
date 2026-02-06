import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogs, BlogPost } from "@/hooks/use-blogs";
import { usePartners, Partner } from "@/hooks/use-partners";
import { useProjects, Project } from "@/hooks/use-projects";
import {
    Plus, Edit2, Trash2, Eye, EyeOff, Star,
    Link as LinkIcon, Calendar, User, Tag, ArrowLeft,
    Save, X, CheckCircle, AlertCircle, Handshake, Rocket,
    ExternalLink, Twitter, LogOut, Video, Upload, Loader2
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

// ADMIN ACCESS CONFIGURATION (Frontend Check)
const ADMIN_WALLETS = [
    "0x715F47Ce330aF0fd7130290874a182FBaF1D892F",
    "0x86E25598E12a7116eBb3C2bD41Ad80bdEC4a9bEf"
];

export default function AdminLogs() {
    const {
        adminBlogs: blogs,
        loading: blogsLoading,
        createBlog,
        updateBlog,
        removeBlog
    } = useBlogs();

    const { partners, loading: partnersLoading, savePartner, deletePartner } = usePartners();
    const { projects, loading: projectsLoading, saveProject, deleteProject } = useProjects();

    const { toast } = useToast();
    const activeAccount = useActiveAccount();

    const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem("convex_session_id"));
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const loginMutation = useAction(api.auth_actions.login);
    const logoutMutation = useMutation(api.auth.logout);
    const validateQuery = useQuery(api.auth.validateSession, { sessionId: sessionId || "" });

    const isAdmin = activeAccount && ADMIN_WALLETS.some(
        addr => addr.toLowerCase() === activeAccount.address.toLowerCase()
    );

    const [activeTab, setActiveTab] = useState<'blogs' | 'partners' | 'projects'>('blogs');
    const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
    const [editingPartner, setEditingPartner] = useState<Partial<Partner> | null>(null);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState<'image' | 'video' | null>(null);
    const [imageError, setImageError] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const getUrl = useMutation(api.files.getImageUrl);

    const loading = blogsLoading || partnersLoading || projectsLoading;

    const handleLogin = async () => {
        if (!activeAccount) return;
        setIsLoggingIn(true);
        try {
            const now = new Date().toISOString();
            const message = `Login to Codequity Admin at ${now}`;
            const signature = await activeAccount.signMessage({ message });

            const result = await loginMutation({
                address: activeAccount.address,
                message,
                signature
            });

            setSessionId(result.sessionId);
            localStorage.setItem("convex_session_id", result.sessionId);
            toast({ title: "Authenticated", description: "Secure session established." });
        } catch (error: any) {
            console.error("Login failed:", error);
            toast({ title: "Login Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        if (sessionId) {
            await logoutMutation({ sessionId });
            localStorage.removeItem("convex_session_id");
            setSessionId(null);
            toast({ title: "Logged Out", description: "Session terminated." });
        }
    };

    const handleSaveBlog = async () => {
        if (!editingBlog?.title || !editingBlog?.slug || !sessionId) return;

        setIsSaving(true);
        try {
            const blogId = (editingBlog.id || (editingBlog as any)._id) as Id<"blogs"> | undefined;
            const tagsArray = typeof editingBlog.tags === 'string'
                ? (editingBlog.tags as string).split(',').map(t => t.trim())
                : (editingBlog.tags || []);

            const payload = {
                title: editingBlog.title,
                slug: editingBlog.slug,
                excerpt: editingBlog.excerpt || "",
                content: editingBlog.content || "",
                image_url: editingBlog.image_url || "",
                video_url: editingBlog.video_url || "",
                video_storage_id: editingBlog.video_storage_id || "",
                author_name: editingBlog.author_name || "Admin",
                status: editingBlog.status || "draft",
                tags: tagsArray,
                published_at: editingBlog.published_at || new Date().toISOString(),
                is_featured: editingBlog.is_featured || false,
            };

            if (blogId) {
                await updateBlog({ sessionId, id: blogId, ...payload });
                toast({ title: "Success", description: "Transmission updated." });
            } else {
                await createBlog({ sessionId, ...payload } as any);
                toast({ title: "Success", description: "New transmission sent." });
            }
            setEditingBlog(null);
        } catch (err: any) {
            toast({ title: "Error Saving", description: err.message, variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSavePartner = async () => {
        if (!editingPartner?.name || !sessionId) return;
        setIsSaving(true);
        const res = await savePartner(editingPartner, sessionId);
        if (res.success) {
            toast({ title: "Success", description: "Partner info synchronized." });
            setEditingPartner(null);
        } else {
            toast({ title: "Error Saving", description: res.message, variant: "destructive" });
        }
        setIsSaving(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const file = e.target.files?.[0];
        if (!file || !sessionId) return;

        setIsUploading(type);
        try {
            const uploadUrl = await generateUploadUrl({ sessionId });
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const url = await getUrl({ storageId });

            if (type === 'image') {
                setEditingBlog(prev => prev ? { ...prev, image_url: url || "" } : null);
                setImageError(false);
            } else {
                setEditingBlog(prev => prev ? { ...prev, video_url: url || "", video_storage_id: storageId } : null);
            }
            toast({ title: "Upload Success", description: `${type === 'image' ? 'Image' : 'Video'} synchronized.` });
        } catch (err: any) {
            toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
        } finally {
            setIsUploading(null);
        }
    };

    const handleSaveProject = async () => {
        if (!editingProject?.name || !sessionId) return;
        setIsSaving(true);
        const res = await saveProject(editingProject, sessionId);
        if (res.success) {
            toast({ title: "Success", description: "Project updated." });
            setEditingProject(null);
        } else {
            toast({ title: "Error Saving", description: res.message, variant: "destructive" });
        }
        setIsSaving(false);
    };

    const toggleStatus = async (blog: BlogPost) => {
        if (!sessionId) return;
        const newStatus = blog.status === 'published' ? 'draft' : 'published';
        try {
            await updateBlog({
                sessionId,
                id: (blog as any)._id || blog.id as any,
                status: newStatus
            });
            toast({ title: "Status Updated", description: `${blog.title} is now a ${newStatus}.` });
        } catch (e: any) {
            toast({ title: "Error", description: e.message, variant: "destructive" });
        }
    };

    const toggleFeatured = async (blog: BlogPost) => {
        if (!sessionId) return;
        try {
            await updateBlog({
                sessionId,
                id: (blog as any)._id || blog.id as any,
                is_featured: !blog.is_featured
            });
            toast({ title: "Featured Updated", description: `Featured status toggled for ${blog.title}.` });
        } catch (e: any) {
            toast({ title: "Error", description: e.message, variant: "destructive" });
        }
    };

    const deleteBlog = async (id: string) => {
        if (!sessionId || !confirm("Are you sure you want to delete this log?")) return;
        try {
            await removeBlog({ sessionId, id: id as Id<"blogs"> });
            toast({ title: "Log Deleted", description: "The transmission has been purged." });
        } catch (e: any) {
            toast({ title: "Error", description: e.message, variant: "destructive" });
        }
    };

    if (!activeAccount) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                        <User className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-black mb-4 uppercase tracking-tighter">AUTHENTICATION <span className="text-primary">REQUIRED</span></h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">This terminal is restricted. Please connect your administrative wallet.</p>
                    <div className="flex justify-center"><ConnectButton client={client} theme="dark" /></div>
                    <Link href="/"><button className="mt-8 text-xs uppercase tracking-widest text-gray-600 hover:text-white transition-colors flex items-center gap-2 mx-auto"><ArrowLeft className="w-3 h-3" /> Abort Mission</button></Link>
                </motion.div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-black mb-4 uppercase tracking-tighter text-red-500">ACCESS <span className="text-white">DENIED</span></h1>
                    <p className="text-gray-500 mb-4 leading-relaxed">Your wallet <code className="text-gray-300 bg-white/5 px-2 py-1 rounded">{activeAccount.address.slice(0, 6)}...</code> does not have clearance.</p>
                    <div className="flex justify-center mb-8"><ConnectButton client={client} theme="dark" /></div>
                    <Link href="/"><button className="text-xs uppercase tracking-widest text-gray-600 hover:text-white transition-colors flex items-center gap-2 mx-auto"><ArrowLeft className="w-3 h-3" /> Return to Base</button></Link>
                </motion.div>
            </div>
        );
    }

    if (!sessionId) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                        <User className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-black mb-4 uppercase tracking-tighter">SECURE <span className="text-primary">LOGIN</span></h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">Identity verified. Please sign the message to establish a secure session.</p>
                    <button
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className="px-8 py-3 bg-primary text-black font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
                    >
                        {isLoggingIn ? "Signing..." : "Sign to Login"}
                    </button>
                    <Link href="/"><button className="mt-8 text-xs uppercase tracking-widest text-gray-600 hover:text-white transition-colors flex items-center gap-2 mx-auto"><ArrowLeft className="w-3 h-3" /> Cancel</button></Link>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <Link href="/">
                                <button className="text-gray-500 hover:text-white flex items-center gap-2 mb-4 transition-colors">
                                    <ArrowLeft className="w-4 h-4" /> Back to Site
                                </button>
                            </Link>
                            <h1 className="text-4xl font-orbitron font-black tracking-tighter">
                                CONTROL <span className="text-primary">CENTER</span>
                            </h1>
                            <p className="text-gray-500 mt-2">Manage your transmissions and site content.</p>
                        </div>

                        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-fit">
                            <button
                                onClick={() => setActiveTab('blogs')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'blogs' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Tag className="w-3 h-3 inline-block mr-2" /> Blogs
                            </button>
                            <button
                                onClick={() => setActiveTab('partners')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'partners' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Handshake className="w-3 h-3 inline-block mr-2" /> Partners
                            </button>
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'projects' ? 'bg-primary text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Rocket className="w-3 h-3 inline-block mr-2" /> Projects
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    if (activeTab === 'blogs') setEditingBlog({ title: '', slug: '', excerpt: '', content: '', status: 'draft', tags: [], image_url: '' } as any);
                                    if (activeTab === 'partners') setEditingPartner({ name: '', category: 'Ecosystems', logo_url: '', website_url: '', is_active: true });
                                    if (activeTab === 'projects') setEditingProject({ name: '', tagline: '', description: '', tags: [], status: 'building', cohort_id: 'C3' });
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
                            >
                                <Plus className="w-4 h-4" /> Create
                            </button>
                            <button onClick={handleLogout} className="p-3 bg-white/5 text-gray-400 hover:text-white border border-white/10 rounded-full transition-colors" title="Logout">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {activeTab === 'blogs' ? (
                            <>
                                <StatCard label="Total Logs" value={blogs.length} />
                                <StatCard label="Published" value={blogs.filter((b: any) => b.status === 'published').length} color="text-green-500" />
                                <StatCard label="Featured" value={blogs.filter((b: any) => b.is_featured).length} color="text-yellow-500" />
                            </>
                        ) : activeTab === 'partners' ? (
                            <>
                                <StatCard label="Total partners" value={partners.length} />
                                <StatCard label="Active Allies" value={partners.filter((p: any) => p.is_active).length} color="text-green-500" />
                                <StatCard label="Categories" value={new Set(partners.map((p: any) => p.category)).size} color="text-primary" />
                            </>
                        ) : (
                            <>
                                <StatCard label="Total Projects" value={projects.length} />
                                <StatCard label="Mainnet/Live" value={projects.filter((p: any) => p.status === 'mainnet' || p.status === 'live').length} color="text-green-500" />
                                <StatCard label="Building" value={projects.filter((p: any) => p.status === 'building').length} color="text-orange-500" />
                            </>
                        )}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">{activeTab === 'blogs' ? 'Transmission' : activeTab === 'partners' ? 'Partner' : 'Project'}</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">{activeTab === 'blogs' ? 'Status' : activeTab === 'partners' ? 'Category' : 'Cohort'}</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">{activeTab === 'blogs' ? 'Featured' : activeTab === 'partners' ? 'Active' : 'Status'}</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="p-12 text-center text-gray-500 animate-pulse">Synchronizing control center...</td>
                                        </tr>
                                    ) : activeTab === 'blogs' ? (
                                        blogs.map((blog: any) => (
                                            <tr key={blog.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 font-normal">
                                                    <div className="flex items-center gap-4">
                                                        {blog.image_url && (
                                                            <img src={blog.image_url} className="w-12 h-12 rounded-lg object-cover border border-white/10" alt="" />
                                                        )}
                                                        <div>
                                                            <div className="font-bold group-hover:text-primary transition-colors">{blog.title}</div>
                                                            <div className="text-xs text-gray-500 font-mono">/{blog.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => toggleStatus(blog)}
                                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${blog.status === 'published'
                                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                            }`}
                                                    >
                                                        {blog.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                        {blog.status}
                                                    </button>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => toggleFeatured(blog)}
                                                        className={`p-2 rounded-lg transition-all ${blog.is_featured
                                                            ? 'text-yellow-500 bg-yellow-500/10'
                                                            : 'text-gray-500 hover:text-white'
                                                            }`}
                                                    >
                                                        <Star className={`w-5 h-5 ${blog.is_featured ? 'fill-current' : ''}`} />
                                                    </button>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                                                            <Eye className="w-4 h-4" />
                                                        </a>
                                                        <button onClick={() => setEditingBlog(blog)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deleteBlog(blog.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : activeTab === 'partners' ? (
                                        partners.map((partner: any) => (
                                            <tr key={partner.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2">
                                                            {partner.logo_url ? <img src={partner.logo_url} className="max-w-full max-h-full" alt="" /> : <Handshake className="w-4 h-4 text-gray-600" />}
                                                        </div>
                                                        <div className="font-bold group-hover:text-primary transition-colors">{partner.name}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-xs text-gray-400 uppercase tracking-widest">{partner.category}</span>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => savePartner({ ...partner, is_active: !partner.is_active }, sessionId!)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${partner.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                                                    >
                                                        {partner.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => setEditingPartner(partner)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deletePartner(partner.id, sessionId!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        projects.map((project: any) => (
                                            <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 font-normal">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                                            {project.image_url ? <img src={project.image_url} className="w-full h-full object-cover" alt="" /> : <Rocket className="w-4 h-4 text-gray-600" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold group-hover:text-primary transition-colors">{project.name}</div>
                                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{project.tagline}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-xs font-bold font-orbitron">{project.cohort_id}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${project.status === 'live' || project.status === 'mainnet' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {project.website_url && (
                                                            <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        <button onClick={() => setEditingProject(project)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deleteProject(project.id, sessionId!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Master Template Form (Modal) */}
                <AnimatePresence>
                    {editingBlog && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingBlog(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-orbitron font-black uppercase tracking-widest text-primary">
                                        {editingBlog.id ? 'Edit Log' : 'New Transmission'}
                                    </h2>
                                    <button onClick={() => setEditingBlog(null)} className="p-2 text-gray-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Title</label>
                                            <input type="text" id="blog-title" name="blog-title" value={editingBlog.title} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, title: e.target.value } : null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Slug</label>
                                            <input type="text" id="blog-slug" name="blog-slug" value={editingBlog.slug} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, slug: e.target.value } : null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-primary outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Image URL / Upload</label>
                                            <div className="flex gap-2">
                                                <input type="text" id="blog-image-url" name="blog-image-url" value={editingBlog.image_url || ''} onChange={(e) => { setEditingBlog(prev => prev ? { ...prev, image_url: e.target.value } : null); setImageError(false); }} className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all" />
                                                <label className="cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all flex items-center justify-center">
                                                    {isUploading === 'image' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} disabled={!!isUploading} />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Video URL / Upload</label>
                                            <div className="flex gap-2">
                                                <input type="text" id="blog-video-url" name="blog-video-url" value={editingBlog.video_url || ''} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, video_url: e.target.value } : null)} className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all" />
                                                <label className="cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all flex items-center justify-center">
                                                    {isUploading === 'video' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                                                    <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} disabled={!!isUploading} />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Tags</label>
                                            <input type="text" id="blog-tags" name="blog-tags" value={Array.isArray(editingBlog.tags) ? editingBlog.tags.join(', ') : (editingBlog.tags || '')} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, tags: e.target.value } as any : null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Excerpt</label>
                                            <textarea id="blog-excerpt" name="blog-excerpt" rows={3} value={editingBlog.excerpt} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, excerpt: e.target.value } : null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all resize-none" />
                                        </div>
                                        <div className="h-full">
                                            <div className="flex items-center justify-between mb-2"><label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest">Media Preview</label></div>
                                            <div className="aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center relative">
                                                {editingBlog.video_url ? (
                                                    <video src={editingBlog.video_url} className="w-full h-full object-cover" controls />
                                                ) : editingBlog.image_url && !imageError ? (
                                                    <img src={editingBlog.image_url} className="w-full h-full object-cover" onError={() => setImageError(true)} alt="" />
                                                ) : (
                                                    <div className="text-gray-600 font-mono text-xs">NO MEDIA</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Content</label>
                                    <textarea id="blog-content" name="blog-content" rows={12} value={editingBlog.content} onChange={(e) => setEditingBlog(prev => prev ? { ...prev, content: e.target.value } : null)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white text-lg leading-relaxed focus:border-primary outline-none transition-all font-serif" />
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <button onClick={() => setEditingBlog(null)} className="px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-white transition-colors">Cancel</button>
                                    <button onClick={handleSaveBlog} disabled={isSaving} className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                                        {isSaving ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                                        {editingBlog.id ? 'Update Transmission' : 'Send Transmission'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Partner Editor Modal */}
                <AnimatePresence>
                    {editingPartner && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingPartner(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl overflow-y-auto rounded-3xl shadow-2xl p-8">
                                <h2 className="text-xl font-orbitron font-black uppercase tracking-widest text-primary mb-8">{(editingPartner as any).id || (editingPartner as any)._id ? 'Edit Partner' : 'New Alliance'}</h2>
                                <div className="space-y-6 mb-10">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Partner Name</label>
                                            <input type="text" id="partner-name" name="partner-name" value={editingPartner.name} onChange={e => setEditingPartner({ ...editingPartner, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Category</label>
                                            <select id="partner-category" name="partner-category" value={editingPartner.category} onChange={e => setEditingPartner({ ...editingPartner, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary">
                                                <option value="Ecosystems">Ecosystems</option>
                                                <option value="Infrastructure">Infrastructure</option>
                                                <option value="Venture Capital">Venture Capital</option>
                                                <option value="Community">Community</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Website URL</label>
                                        <input type="text" id="partner-website" name="partner-website" value={editingPartner.website_url} onChange={e => setEditingPartner({ ...editingPartner, website_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Logo URL</label>
                                        <input type="text" id="partner-logo" name="partner-logo" value={editingPartner.logo_url} onChange={e => setEditingPartner({ ...editingPartner, logo_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Perk Title</label>
                                            <input type="text" id="partner-perk" name="partner-perk" value={editingPartner.perk_title} onChange={e => setEditingPartner({ ...editingPartner, perk_title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                        <div className="flex items-end">
                                            <button onClick={() => setEditingPartner({ ...editingPartner, is_active: !editingPartner.is_active })} className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] border transition-all ${editingPartner.is_active ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                                                {editingPartner.is_active ? 'Status: Active' : 'Status: Inactive'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 font-orbitron">
                                    <button onClick={() => setEditingPartner(null)} className="px-6 py-2 text-gray-500 hover:text-white uppercase text-xs tracking-widest font-black">Cancel</button>
                                    <button onClick={handleSavePartner} disabled={isSaving} className="px-8 py-3 bg-primary text-black rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">Synchronize Alliance</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Project Editor Modal */}
                <AnimatePresence>
                    {editingProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProject(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl overflow-y-auto rounded-3xl shadow-2xl p-8">
                                <h2 className="text-xl font-orbitron font-black uppercase tracking-widest text-primary mb-8">{(editingProject as any).id || (editingProject as any)._id ? 'Edit Project' : 'New Deployment'}</h2>
                                <div className="space-y-6 mb-10">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Project Name</label>
                                            <input type="text" id="project-name" name="project-name" value={editingProject.name} onChange={e => setEditingProject({ ...editingProject, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Status</label>
                                            <select id="project-status" name="project-status" value={editingProject.status} onChange={e => setEditingProject({ ...editingProject, status: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary">
                                                <option value="building">Building</option>
                                                <option value="testnet">Testnet</option>
                                                <option value="mainnet">Mainnet</option>
                                                <option value="live">Live</option>
                                                <option value="beta">Beta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Tagline</label>
                                        <input type="text" id="project-tagline" name="project-tagline" value={editingProject.tagline} onChange={e => setEditingProject({ ...editingProject, tagline: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Description</label>
                                        <textarea id="project-description" name="project-description" rows={3} value={editingProject.description} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Cohort ID</label>
                                            <input type="text" id="project-cohort" name="project-cohort" value={editingProject.cohort_id} onChange={e => setEditingProject({ ...editingProject, cohort_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Tags</label>
                                            <input type="text" id="project-tags" name="project-tags" value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : (editingProject.tags || '')} onChange={e => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()) })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Website URL</label>
                                            <input type="text" id="project-website" name="project-website" value={editingProject.website_url} onChange={e => setEditingProject({ ...editingProject, website_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-2">Image URL</label>
                                            <input type="text" id="project-image" name="project-image" value={editingProject.image_url} onChange={e => setEditingProject({ ...editingProject, image_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 font-orbitron">
                                    <button onClick={() => setEditingProject(null)} className="px-6 py-2 text-gray-500 hover:text-white uppercase text-xs tracking-widest font-black">Cancel</button>
                                    <button onClick={handleSaveProject} disabled={isSaving} className="px-8 py-3 bg-primary text-black rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all">Finalize Deployment</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

function StatCard({ label, value, color = "text-white" }: { label: string, value: number, color?: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">{label}</div>
            <div className={`text-3xl font-orbitron font-black ${color}`}>{value}</div>
        </div>
    );
}
