import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBlogs, BlogPost } from "@/hooks/use-blogs";
import { supabase } from "@/lib/supabase";
import {
    Plus, Edit2, Trash2, Eye, EyeOff, Star,
    Link as LinkIcon, Calendar, User, Tag, ArrowLeft,
    Save, X, CheckCircle, AlertCircle
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdweb";

// ADMIN ACCESS CONFIGURATION
// Add your wallet addresses here to grant access to the dashboard
const ADMIN_WALLETS = [
    "0x715F47Ce330aF0fd7130290874a182FBaF1D892F",
    "0x86E25598E12a7116eBb3C2bD41Ad80bdEC4a9bEf"
];

export default function AdminLogs() {
    const { blogs, loading, refresh } = useBlogs();
    const { toast } = useToast();
    const activeAccount = useActiveAccount();

    // Check if the current user is an admin
    const isAdmin = activeAccount && ADMIN_WALLETS.some(
        addr => addr.toLowerCase() === activeAccount.address.toLowerCase()
    );

    const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Fetch all blogs (including drafts) on mount
    useEffect(() => {
        refresh(true);
    }, []);

    const handleSave = async () => {
        if (!editingBlog?.title || !editingBlog?.slug) {
            toast({ title: "Validation Error", description: "Title and Slug are required.", variant: "destructive" });
            return;
        }

        setIsSaving(true);
        try {
            const { id, created_at, ...updateData } = editingBlog;
            const payload = {
                ...updateData,
                updated_at: new Date().toISOString(),
                tags: typeof editingBlog.tags === 'string' ? (editingBlog.tags as string).split(',').map(t => t.trim()) : (editingBlog.tags || [])
            };

            const { error } = id
                ? await supabase.from('blogs').update(payload).eq('id', id)
                : await supabase.from('blogs').insert([payload]);

            if (error) throw error;

            toast({ title: "Success", description: id ? "Transmission updated successfully." : "New transmission sent." });
            setEditingBlog(null);
            refresh(true);
        } catch (err: any) {
            toast({ title: "Error Saving", description: err.message, variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    if (!activeAccount) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                        <User className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-black mb-4 uppercase tracking-tighter">AUTHENTICATION <span className="text-primary">REQUIRED</span></h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">This terminal is restricted. Please connect your administrative wallet to synchronize with the control center.</p>
                    <div className="flex justify-center">
                        <ConnectButton client={client} theme="dark" />
                    </div>
                    <Link href="/">
                        <button className="mt-8 text-xs uppercase tracking-widest text-gray-600 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-3 h-3" /> Abort Mission
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md"
                >
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-orbitron font-black mb-4 uppercase tracking-tighter text-red-500">ACCESS <span className="text-white">DENIED</span></h1>
                    <p className="text-gray-500 mb-4 leading-relaxed">Your unauthorized signature has been logged. Wallet <code className="text-gray-300 bg-white/5 px-2 py-1 rounded">{activeAccount.address.slice(0, 6)}...{activeAccount.address.slice(-4)}</code> does not have administrative clearance.</p>
                    <div className="flex justify-center mb-8">
                        <ConnectButton client={client} theme="dark" />
                    </div>
                    <Link href="/">
                        <button className="text-xs uppercase tracking-widest text-gray-600 hover:text-white transition-colors flex items-center gap-2 mx-auto">
                            <ArrowLeft className="w-3 h-3" /> Return to Base
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const toggleStatus = async (blog: BlogPost) => {
        const newStatus = blog.status === 'published' ? 'draft' : 'published';
        const { error } = await supabase
            .from('blogs')
            .update({ status: newStatus })
            .eq('id', blog.id);

        if (!error) {
            toast({ title: "Status Updated", description: `${blog.title} is now a ${newStatus}.` });
            refresh(true);
        }
    };

    const toggleFeatured = async (blog: BlogPost) => {
        const { error } = await supabase
            .from('blogs')
            .update({ is_featured: !blog.is_featured })
            .eq('id', blog.id);

        if (!error) {
            toast({ title: "Featured Updated", description: `Featured status toggled for ${blog.title}.` });
            refresh(true);
        }
    };

    const deleteBlog = async (id: string) => {
        if (!confirm("Are you sure you want to delete this log?")) return;
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (!error) {
            toast({ title: "Log Deleted", description: "The transmission has been purged." });
            refresh(true);
        }
    };

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

                        <button
                            onClick={() => setEditingBlog({ title: '', slug: '', excerpt: '', content: '', status: 'draft', tags: [], image_url: '' })}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
                        >
                            <Plus className="w-4 h-4" /> Create New Log
                        </button>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <StatCard label="Total Logs" value={blogs.length} />
                        <StatCard label="Published" value={blogs.filter(b => b.status === 'published').length} color="text-green-500" />
                        <StatCard label="Featured" value={blogs.filter(b => b.is_featured).length} color="text-yellow-500" />
                    </div>

                    {/* Logs Table */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">Transmission</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">Status</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500">Featured</th>
                                        <th className="p-4 text-xs uppercase tracking-widest font-bold text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="p-12 text-center text-gray-500 animate-pulse">Scanning database...</td>
                                        </tr>
                                    ) : blogs.map((blog) => (
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
                                                    <button
                                                        onClick={() => setEditingBlog(blog)}
                                                        className="p-2 text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBlog(blog.id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Master Template Form (Modal) */}
                <AnimatePresence>
                    {editingBlog && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setEditingBlog(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-orbitron font-black uppercase tracking-widest text-primary">
                                        {editingBlog.id ? 'Edit Log' : 'New Transmission'}
                                    </h2>
                                    <button onClick={() => setEditingBlog(null)} className="p-2 text-gray-500 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    {/* Left Side: Basic Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Title</label>
                                            <input
                                                type="text"
                                                value={editingBlog.title}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditingBlog(prev => prev ? { ...prev, title: val } : null);
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                placeholder="The Future of Foundries"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Slug</label>
                                            <input
                                                type="text"
                                                value={editingBlog.slug}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditingBlog(prev => prev ? { ...prev, slug: val } : null);
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-primary outline-none transition-all"
                                                placeholder="future-of-foundries"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Image URL</label>
                                            <input
                                                type="text"
                                                value={editingBlog.image_url || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditingBlog(prev => prev ? { ...prev, image_url: val } : null);
                                                    setImageError(false);
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Tags (Comma separated)</label>
                                            <input
                                                type="text"
                                                value={Array.isArray(editingBlog.tags) ? editingBlog.tags.join(', ') : (editingBlog.tags || '')}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditingBlog(prev => prev ? { ...prev, tags: val as any } : null);
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all"
                                                placeholder="tech, startups, web3"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side: Excerpt & Preview */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Excerpt</label>
                                            <textarea
                                                rows={3}
                                                value={editingBlog.excerpt}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setEditingBlog(prev => prev ? { ...prev, excerpt: val } : null);
                                                }}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-primary outline-none transition-all resize-none"
                                                placeholder="A brief summary for cards and search results..."
                                            />
                                        </div>
                                        <div className="h-full">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest">Image Preview</label>
                                                {editingBlog.image_url && imageError && (
                                                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider animate-pulse">Invalid Link</span>
                                                )}
                                            </div>
                                            <div className="aspect-video rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center relative">
                                                {editingBlog.image_url && !imageError ? (
                                                    <img
                                                        key={editingBlog.image_url}
                                                        src={editingBlog.image_url}
                                                        className="w-full h-full object-cover transition-opacity duration-300"
                                                        alt="Preview"
                                                        onError={() => setImageError(true)}
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="text-gray-600 font-mono text-xs">
                                                            {editingBlog.image_url ? 'IMAGE FAILED TO LOAD' : 'NO IMAGE'}
                                                        </div>
                                                        {editingBlog.image_url && (
                                                            <p className="text-[9px] text-gray-500 max-w-[150px] text-center">
                                                                Tip: Use a direct link (e.g. ends in .jpg, .png)
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Content (Markdown Template) */}
                                <div className="mb-12">
                                    <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2">Content (Markdown Optimized)</label>
                                    <textarea
                                        rows={12}
                                        value={editingBlog.content}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setEditingBlog(prev => prev ? { ...prev, content: val } : null);
                                        }}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white text-lg leading-relaxed focus:border-primary outline-none transition-all font-serif"
                                        placeholder="## Start your transmission here..."
                                    />
                                    <p className="text-[10px] text-gray-600 mt-2 italic">Tip: Use the structure from MASTER_BLOG_TEMPLATE.md for best results.</p>
                                </div>

                                <div className="flex items-center justify-end gap-4">
                                    <button
                                        onClick={() => setEditingBlog(null)}
                                        className="px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs text-gray-500 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
                                    >
                                        {isSaving ? (
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {editingBlog.id ? 'Update Transmission' : 'Send Transmission'}
                                    </button>
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
