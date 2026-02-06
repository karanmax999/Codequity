import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useActiveAccount } from "thirdweb/react";
import { Loader2, Save, Plus, Trash, Check } from "lucide-react";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import PopupBanner from "@/components/ui/popup-banner";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

export default function Portal() {
    const account = useActiveAccount();
    const address = account?.address || "";
    const isAdmin = useQuery(api.auth.checkIsAdmin, { address });

    // Mission Control Weeks
    const weeks = useQuery(api.mission.getWeeks);
    const updateWeek = useMutation(api.mission.updateWeek);

    // Events
    const events = useQuery(api.mission.getEvents, { activeOnly: false });
    const updateEvent = useMutation(api.mission.updateEvent);
    const deleteEvent = useMutation(api.mission.deleteEvent);

    // Blogs
    const blogs = useQuery(api.blogs.listAll);
    const createBlog = useMutation(api.blogs.createWithWallet);
    const updateBlog = useMutation(api.blogs.updateWithWallet);
    const deleteBlog = useMutation(api.blogs.removeWithWallet);

    // Partners
    const partners = useQuery(api.partners.list);
    const createPartner = useMutation(api.partners.createWithWallet);
    const updatePartner = useMutation(api.partners.updateWithWallet);
    const deletePartner = useMutation(api.partners.removeWithWallet);

    // Projects
    const projects = useQuery(api.projects.list);
    const createProject = useMutation(api.projects.createWithWallet);
    const updateProject = useMutation(api.projects.updateWithWallet);
    const deleteProject = useMutation(api.projects.removeWithWallet);

    const [activeTab, setActiveTab] = useState<"mission" | "events" | "blogs" | "partners" | "projects" | "settings">("mission");
    const [editingWeek, setEditingWeek] = useState<any>(null);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [editingPartner, setEditingPartner] = useState<any>(null);
    const [editingProject, setEditingProject] = useState<any>(null);

    // Handlers for Mission Control
    const handleWeekSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingWeek || !address) return;
        try {
            await updateWeek({
                ...editingWeek,
                adminAddress: address,
                week: Number(editingWeek.week),
            });
            toast({ title: "Success", description: "Week updated successfully" });
            setEditingWeek(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update week", variant: "destructive" });
        }
    };

    // Handlers for Events
    const handleEventSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingEvent || !address) return;
        try {
            await updateEvent({
                ...editingEvent,
                adminAddress: address,
                id: editingEvent._id, // might be undefined if new
            });
            toast({ title: "Success", description: "Event saved successfully" });
            setEditingEvent(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to save event", variant: "destructive" });
        }
    };

    const handleEventDelete = async (id: any) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteEvent({ id, adminAddress: address });
            toast({ title: "Deleted", description: "Event removed" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete event", variant: "destructive" });
        }
    }

    // Handlers for Blogs
    const handleBlogSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBlog || !address) return;
        try {
            if (editingBlog._id) {
                await updateBlog({ ...editingBlog, adminAddress: address, id: editingBlog._id });
            } else {
                await createBlog({ ...editingBlog, adminAddress: address });
            }
            toast({ title: "Success", description: "Blog saved successfully" });
            setEditingBlog(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to save blog", variant: "destructive" });
        }
    };

    const handleBlogDelete = async (id: any) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteBlog({ id, adminAddress: address });
            toast({ title: "Deleted", description: "Blog removed" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
        }
    };

    // Handlers for Partners
    const handlePartnerSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPartner || !address) return;
        try {
            if (editingPartner._id) {
                await updatePartner({ ...editingPartner, adminAddress: address, id: editingPartner._id });
            } else {
                await createPartner({ ...editingPartner, adminAddress: address });
            }
            toast({ title: "Success", description: "Partner saved successfully" });
            setEditingPartner(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to save partner", variant: "destructive" });
        }
    };

    const handlePartnerDelete = async (id: any) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deletePartner({ id, adminAddress: address });
            toast({ title: "Deleted", description: "Partner removed" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete partner", variant: "destructive" });
        }
    };

    // Handlers for Projects
    const handleProjectSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProject || !address) return;
        try {
            if (editingProject._id) {
                await updateProject({ ...editingProject, adminAddress: address, id: editingProject._id });
            } else {
                await createProject({ ...editingProject, adminAddress: address });
            }
            toast({ title: "Success", description: "Project saved successfully" });
            setEditingProject(null);
        } catch (error) {
            toast({ title: "Error", description: "Failed to save project", variant: "destructive" });
        }
    };

    const handleProjectDelete = async (id: any) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteProject({ id, adminAddress: address });
            toast({ title: "Deleted", description: "Project removed" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
        }
    };



    if (!address) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Helmet><title>Portal Access | CodeQuity</title></Helmet>
                <PopupBanner />
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-20">
                    <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
                        <h1 className="text-3xl font-bold font-orbitron mb-6 text-white">Portal Access</h1>
                        <p className="text-muted-foreground mb-8">Connect your wallet to access the admin dashboard.</p>
                        {/* Navigation component usually handles connect, but we need it here or instruct user */}
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200">
                            Please use the "Connect Wallet" button in the top navigation bar.
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (isAdmin === undefined) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <Navigation />
                <Loader2 className="animate-spin text-purple-500 w-12 h-12 mb-4" />
                <p className="font-orbitron animate-pulse">Verifying Admin Status...</p>
                <p className="text-xs text-gray-500 mt-2">Wallet: {address}</p>
            </div>
        );
    }

    if (isAdmin === false) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Helmet><title>Unauthorized | CodeQuity</title></Helmet>
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-20">
                    <div className="text-center p-8 bg-red-500/5 border border-red-500/20 rounded-2xl backdrop-blur-xl max-w-lg">
                        <h1 className="text-3xl font-bold text-red-500 mb-4 font-orbitron">UNAUTHORIZED</h1>
                        <p className="text-gray-400 mb-6">Your wallet is not authorized to access the Admin Portal.</p>

                        <div className="bg-black/40 p-4 rounded-lg border border-white/10 mb-6 font-mono text-sm break-all">
                            <p className="text-gray-500 mb-1 text-xs uppercase tracking-widest text-left">Connected Address:</p>
                            <p className="text-red-400">{address}</p>
                        </div>

                        <p className="text-sm text-gray-500">
                            If this is your admin wallet, please ensure it is added to the <code>ADMIN_WALLETS</code>
                            environment variable in your deployment settings.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Helmet><title>Admin Portal | CodeQuity</title></Helmet>
            <Navigation />

            <div className="flex-1 container mx-auto px-4 py-24">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Admin Portal
                    </h1>
                    <div className="flex gap-2 flex-wrap">
                        <MetalButton onClick={() => setActiveTab("mission")} variant={activeTab === "mission" ? "primary" : "default"}>Mission Control</MetalButton>
                        <MetalButton onClick={() => setActiveTab("events")} variant={activeTab === "events" ? "primary" : "default"}>Events</MetalButton>
                        <MetalButton onClick={() => setActiveTab("blogs")} variant={activeTab === "blogs" ? "primary" : "default"}>Blogs</MetalButton>
                        <MetalButton onClick={() => setActiveTab("partners")} variant={activeTab === "partners" ? "primary" : "default"}>Partners</MetalButton>
                        <MetalButton onClick={() => setActiveTab("projects")} variant={activeTab === "projects" ? "primary" : "default"}>Projects</MetalButton>
                        <MetalButton onClick={() => setActiveTab("settings")} variant={activeTab === "settings" ? "primary" : "default"}>Settings</MetalButton>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[600px]">

                    {/* MISSION CONTROL EDITOR */}
                    {activeTab === "mission" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Mission Weeks</h2>
                                <MetalButton onClick={() => setEditingWeek({ week: (weeks?.length || 0) + 1, socials: {}, resources: [] })}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Week
                                </MetalButton>
                            </div>

                            {editingWeek ? (
                                <form onSubmit={handleWeekSave} className="space-y-4 max-w-2xl bg-black/40 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-xl font-bold mb-4">Edit Week {editingWeek.week}</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Week Number</Label>
                                            <Input type="number" value={editingWeek.week} onChange={e => setEditingWeek({ ...editingWeek, week: e.target.value })} required />
                                        </div>
                                        <div>
                                            <Label>Status</Label>
                                            <Select value={editingWeek.status} onValueChange={val => setEditingWeek({ ...editingWeek, status: val })}>
                                                <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="locked">Locked</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Ecosystem</Label>
                                        <Input value={editingWeek.ecosystem} onChange={e => setEditingWeek({ ...editingWeek, ecosystem: e.target.value })} required />
                                    </div>
                                    <div>
                                        <Label>Category</Label>
                                        <Input value={editingWeek.category} onChange={e => setEditingWeek({ ...editingWeek, category: e.target.value })} />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea value={editingWeek.description} onChange={e => setEditingWeek({ ...editingWeek, description: e.target.value })} />
                                    </div>
                                    <div>
                                        <Label>Initialize Link (URL)</Label>
                                        <Input value={editingWeek.initialize_url || ''} onChange={e => setEditingWeek({ ...editingWeek, initialize_url: e.target.value })} placeholder="https://..." />
                                    </div>

                                    <div className="flex gap-2 justify-end mt-4">
                                        <MetalButton variant="default" onClick={() => setEditingWeek(null)} type="button">Cancel</MetalButton>
                                        <MetalButton variant="primary" type="submit"><Save className="w-4 h-4 mr-2" /> Save Week</MetalButton>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {weeks?.map((week) => (
                                        <div key={week._id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all" onClick={() => setEditingWeek(week)}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-mono text-purple-400">Week {week.week}</span>
                                                <div className="flex gap-2">
                                                    {week.initialize_url && <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">LINKED</span>}
                                                    <span className={`text-xs px-2 py-0.5 rounded ${week.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{week.status}</span>
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{week.ecosystem}</h3>
                                            <p className="text-sm text-gray-400 truncate">{week.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* EVENTS MANAGER */}
                    {activeTab === "events" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Event Manager</h2>
                                <MetalButton onClick={() => setEditingEvent({ is_active: true })}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Event
                                </MetalButton>
                            </div>

                            {editingEvent ? (
                                <form onSubmit={handleEventSave} className="space-y-4 max-w-2xl bg-black/40 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-xl font-bold mb-4">{editingEvent._id ? 'Edit Event' : 'New Event'}</h3>
                                    <div>
                                        <Label>Title</Label>
                                        <Input value={editingEvent.title || ''} onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Start Date</Label>
                                            <Input type="datetime-local" value={editingEvent.start_date || ''} onChange={e => setEditingEvent({ ...editingEvent, start_date: e.target.value })} required />
                                        </div>
                                        <div>
                                            <Label>Type</Label>
                                            <Input value={editingEvent.type || ''} onChange={e => setEditingEvent({ ...editingEvent, type: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Link (Optional)</Label>
                                        <Input value={editingEvent.link || ''} onChange={e => setEditingEvent({ ...editingEvent, link: e.target.value })} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label>Active?</Label>
                                        <Switch checked={editingEvent.is_active} onCheckedChange={(checked) => setEditingEvent({ ...editingEvent, is_active: checked })} />
                                    </div>

                                    <div className="flex gap-2 justify-end mt-4">
                                        <MetalButton variant="default" onClick={() => setEditingEvent(null)} type="button">Cancel</MetalButton>
                                        <MetalButton variant="primary" type="submit"><Save className="w-4 h-4 mr-2" /> Save Event</MetalButton>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2">
                                    {events?.map((ev) => (
                                        <div key={ev._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div>
                                                <h3 className="font-bold">{ev.title}</h3>
                                                <div className="text-sm text-gray-400 flex gap-2">
                                                    <span>{ev.start_date}</span>
                                                    <span className="text-purple-400">{ev.type}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <MetalButton className="h-8 text-xs px-3" variant="default" onClick={() => setEditingEvent(ev)}>Edit</MetalButton>
                                                <MetalButton className="h-8 text-xs px-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border-red-500/30" onClick={() => handleEventDelete(ev._id)}><Trash className="w-4 h-4" /></MetalButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* BLOGS MANAGER */}
                    {activeTab === "blogs" && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-orbitron font-bold">Blog Posts</h2>
                                <MetalButton variant="primary" onClick={() => setEditingBlog({ title: "", slug: "", author_name: "", status: "draft", is_featured: false })}>+ New Blog</MetalButton>
                            </div>

                            {editingBlog ? (
                                <form onSubmit={handleBlogSave} className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Title" value={editingBlog.title || ""} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} required />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Slug (URL)" value={editingBlog.slug || ""} onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })} required />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Author Name" value={editingBlog.author_name || ""} onChange={(e) => setEditingBlog({ ...editingBlog, author_name: e.target.value })} required />
                                    <textarea className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Excerpt" rows={2} value={editingBlog.excerpt || ""} onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })} />
                                    <textarea className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Content (Markdown)" rows={6} value={editingBlog.content || ""} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Image URL" value={editingBlog.image_url || ""} onChange={(e) => setEditingBlog({ ...editingBlog, image_url: e.target.value })} />
                                    <select className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" value={editingBlog.status || "draft"} onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value })}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={editingBlog.is_featured || false} onChange={(e) => setEditingBlog({ ...editingBlog, is_featured: e.target.checked })} />
                                        Featured
                                    </label>
                                    <div className="flex gap-2">
                                        <MetalButton type="submit" variant="primary">Save</MetalButton>
                                        <MetalButton type="button" variant="default" onClick={() => setEditingBlog(null)}>Cancel</MetalButton>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2">
                                    {blogs?.map((blog) => (
                                        <div key={blog._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div>
                                                <h3 className="font-bold">{blog.title}</h3>
                                                <div className="text-sm text-gray-400 flex gap-2">
                                                    <span className={blog.status === "published" ? "text-green-400" : "text-yellow-400"}>{blog.status}</span>
                                                    {blog.is_featured && <span className="text-purple-400">★ Featured</span>}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <MetalButton className="h-8 text-xs px-3" variant="default" onClick={() => setEditingBlog(blog)}>Edit</MetalButton>
                                                <MetalButton className="h-8 text-xs px-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border-red-500/30" onClick={() => handleBlogDelete(blog._id)}><Trash className="w-4 h-4" /></MetalButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PARTNERS MANAGER */}
                    {activeTab === "partners" && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-orbitron font-bold">Partners</h2>
                                <MetalButton variant="primary" onClick={() => setEditingPartner({ name: "", is_active: true })}>+ New Partner</MetalButton>
                            </div>

                            {editingPartner ? (
                                <form onSubmit={handlePartnerSave} className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Partner Name" value={editingPartner.name || ""} onChange={(e) => setEditingPartner({ ...editingPartner, name: e.target.value })} required />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Category" value={editingPartner.category || ""} onChange={(e) => setEditingPartner({ ...editingPartner, category: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Logo URL" value={editingPartner.logo_url || ""} onChange={(e) => setEditingPartner({ ...editingPartner, logo_url: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Website URL" value={editingPartner.website_url || ""} onChange={(e) => setEditingPartner({ ...editingPartner, website_url: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Perk Title" value={editingPartner.perk_title || ""} onChange={(e) => setEditingPartner({ ...editingPartner, perk_title: e.target.value })} />
                                    <textarea className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Perk Description" rows={3} value={editingPartner.perk_description || ""} onChange={(e) => setEditingPartner({ ...editingPartner, perk_description: e.target.value })} />
                                    <label className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" checked={editingPartner.is_active !== false} onChange={(e) => setEditingPartner({ ...editingPartner, is_active: e.target.checked })} />
                                        Active
                                    </label>
                                    <div className="flex gap-2">
                                        <MetalButton type="submit" variant="primary">Save</MetalButton>
                                        <MetalButton type="button" variant="default" onClick={() => setEditingPartner(null)}>Cancel</MetalButton>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2">
                                    {partners?.map((partner) => (
                                        <div key={partner._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div>
                                                <h3 className="font-bold">{partner.name}</h3>
                                                <div className="text-sm text-gray-400 flex gap-2">
                                                    <span>{partner.category}</span>
                                                    <span className={partner.is_active ? "text-green-400" : "text-gray-500"}>{partner.is_active ? "Active" : "Inactive"}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <MetalButton className="h-8 text-xs px-3" variant="default" onClick={() => setEditingPartner(partner)}>Edit</MetalButton>
                                                <MetalButton className="h-8 text-xs px-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border-red-500/30" onClick={() => handlePartnerDelete(partner._id)}><Trash className="w-4 h-4" /></MetalButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROJECTS MANAGER */}
                    {activeTab === "projects" && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-orbitron font-bold">Projects</h2>
                                <MetalButton variant="primary" onClick={() => setEditingProject({ name: "", status: "building" })}>+ New Project</MetalButton>
                            </div>

                            {editingProject ? (
                                <form onSubmit={handleProjectSave} className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Project Name" value={editingProject.name || ""} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} required />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Tagline" value={editingProject.tagline || ""} onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })} />
                                    <textarea className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Description" rows={3} value={editingProject.description || ""} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Image URL" value={editingProject.image_url || ""} onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Website URL" value={editingProject.website_url || ""} onChange={(e) => setEditingProject({ ...editingProject, website_url: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Twitter URL" value={editingProject.twitter_url || ""} onChange={(e) => setEditingProject({ ...editingProject, twitter_url: e.target.value })} />
                                    <input className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" placeholder="Cohort ID" value={editingProject.cohort_id || ""} onChange={(e) => setEditingProject({ ...editingProject, cohort_id: e.target.value })} />
                                    <select className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white" value={editingProject.status || "building"} onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}>
                                        <option value="building">Building</option>
                                        <option value="mainnet">Mainnet</option>
                                        <option value="live">Live</option>
                                    </select>
                                    <div className="flex gap-2">
                                        <MetalButton type="submit" variant="primary">Save</MetalButton>
                                        <MetalButton type="button" variant="default" onClick={() => setEditingProject(null)}>Cancel</MetalButton>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2">
                                    {projects?.map((project) => (
                                        <div key={project._id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                            <div>
                                                <h3 className="font-bold">{project.name}</h3>
                                                <div className="text-sm text-gray-400 flex gap-2">
                                                    <span>{project.tagline}</span>
                                                    <span className="text-purple-400">{project.status}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <MetalButton className="h-8 text-xs px-3" variant="default" onClick={() => setEditingProject(project)}>Edit</MetalButton>
                                                <MetalButton className="h-8 text-xs px-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 border-red-500/30" onClick={() => handleProjectDelete(project._id)}><Trash className="w-4 h-4" /></MetalButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="text-center py-10 text-gray-500">
                            Settings module coming soon. Use Mission Control and Events tabs for now.
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}
