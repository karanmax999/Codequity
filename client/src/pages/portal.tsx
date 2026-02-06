import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useActiveAccount } from "thirdweb/react";
import { Loader2, Save, Plus, Trash, Check, Upload, Image as ImageIcon, Video, Eye, Edit3, X } from "lucide-react";
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

    // Settings
    const allSettings = useQuery(api.settings.getSettings);
    const updateSetting = useMutation(api.settings.updateSetting);

    const [activeTab, setActiveTab] = useState<"mission" | "events" | "blogs" | "partners" | "projects" | "settings">("mission");
    const [editingWeek, setEditingWeek] = useState<any>(null);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [editingPartner, setEditingPartner] = useState<any>(null);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [blogEditorMode, setBlogEditorMode] = useState<"edit" | "preview">("edit");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [savingBlog, setSavingBlog] = useState(false);
    const [localSettings, setLocalSettings] = useState<Record<string, any>>({});
    const [isSavingSettings, setIsSavingSettings] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingFavicon, setUploadingFavicon] = useState(false);

    // Sync local settings when data arrives
    useEffect(() => {
        if (allSettings) {
            const settingsMap: Record<string, any> = {};
            allSettings.forEach((s: any) => {
                settingsMap[s.key] = s.value;
            });
            setLocalSettings(settingsMap);
        }
    }, [allSettings]);

    // File upload mutations
    const generateUploadUrl = useMutation(api.files.generateUploadUrlWithWallet);
    const getFileUrl = useMutation(api.files.getFileUrl);

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
        setSavingBlog(true);
        try {
            if (editingBlog._id) {
                await updateBlog({ ...editingBlog, adminAddress: address, id: editingBlog._id });
            } else {
                await createBlog({ ...editingBlog, adminAddress: address });
            }
            toast({ title: "Success", description: "Blog saved successfully" });
            setEditingBlog(null);
            setBlogEditorMode("edit");
        } catch (error) {
            toast({ title: "Error", description: "Failed to save blog", variant: "destructive" });
        } finally {
            setSavingBlog(false);
        }
    };

    const handleTitleChange = (title: string) => {
        const updates: any = { title };
        if (!editingBlog._id && (!editingBlog.slug || editingBlog.slug === editingBlog.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, ""))) {
            updates.slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
        }
        setEditingBlog({ ...editingBlog, ...updates });
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

    // File upload handlers
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !address) return;

        setUploadingImage(true);
        try {
            const uploadUrl = await generateUploadUrl({ adminAddress: address });
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const url = await getFileUrl({ storageId });

            setEditingBlog({ ...editingBlog, image_url: url });
            toast({ title: "Success", description: "Image uploaded successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !address) return;

        setUploadingVideo(true);
        try {
            const uploadUrl = await generateUploadUrl({ adminAddress: address });
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const url = await getFileUrl({ storageId });

            setEditingBlog({ ...editingBlog, video_url: url, video_storage_id: storageId });
            toast({ title: "Success", description: "Video uploaded successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to upload video", variant: "destructive" });
        } finally {
            setUploadingVideo(false);
        }
    };

    // Settings Handlers
    const updateLocalSetting = (key: string, value: any) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const saveAllSettings = async () => {
        if (!address) return;
        setIsSavingSettings(true);
        try {
            // Save each modified setting
            const promises = Object.entries(localSettings).map(([key, value]) =>
                updateSetting({ key, value, adminAddress: address })
            );
            await Promise.all(promises);
            toast({ title: "Success", description: "Settings updated successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to update settings", variant: "destructive" });
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !address) return;

        setUploadingLogo(true);
        try {
            const uploadUrl = await generateUploadUrl({ adminAddress: address });
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const url = await getFileUrl({ storageId });

            updateLocalSetting("site_logo", url);
            toast({ title: "Success", description: "Logo uploaded successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to upload logo", variant: "destructive" });
        } finally {
            setUploadingLogo(false);
        }
    };

    const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !address) return;

        setUploadingFavicon(true);
        try {
            const uploadUrl = await generateUploadUrl({ adminAddress: address });
            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();
            const url = await getFileUrl({ storageId });

            updateLocalSetting("site_favicon", url);
            toast({ title: "Success", description: "Favicon uploaded successfully" });
        } catch (error) {
            toast({ title: "Error", description: "Failed to upload favicon", variant: "destructive" });
        } finally {
            setUploadingFavicon(false);
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
                                <div className="space-y-4">
                                    {/* Tab Navigation */}
                                    <div className="flex gap-2 border-b border-white/10 pb-2">
                                        <button
                                            type="button"
                                            onClick={() => setBlogEditorMode("edit")}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${blogEditorMode === "edit" ? "bg-purple-500/20 text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setBlogEditorMode("preview")}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${blogEditorMode === "preview" ? "bg-purple-500/20 text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
                                        >
                                            <Eye className="w-4 h-4" />
                                            Preview
                                        </button>
                                    </div>

                                    {/* Edit Mode */}
                                    {blogEditorMode === "edit" && (
                                        <form onSubmit={handleBlogSave} className="space-y-6">
                                            {/* Basic Info Section */}
                                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                                <h3 className="text-lg font-semibold text-purple-400 mb-4">Basic Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Title *</label>
                                                        <input
                                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            placeholder="Enter blog title"
                                                            value={editingBlog.title || ""}
                                                            onChange={(e) => handleTitleChange(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Slug (URL) *</label>
                                                        <input
                                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            placeholder="blog-url-slug"
                                                            value={editingBlog.slug || ""}
                                                            onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Author Name *</label>
                                                        <input
                                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            placeholder="John Doe"
                                                            value={editingBlog.author_name || ""}
                                                            onChange={(e) => setEditingBlog({ ...editingBlog, author_name: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Status</label>
                                                        <select
                                                            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            value={editingBlog.status || "draft"}
                                                            onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value })}
                                                        >
                                                            <option value="draft">Draft</option>
                                                            <option value="published">Published</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Excerpt</label>
                                                    <textarea
                                                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                        placeholder="Brief summary of the blog post..."
                                                        rows={2}
                                                        value={editingBlog.excerpt || ""}
                                                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">{(editingBlog.excerpt || "").length} characters</p>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                                    <input
                                                        type="checkbox"
                                                        id="featured"
                                                        checked={editingBlog.is_featured || false}
                                                        onChange={(e) => setEditingBlog({ ...editingBlog, is_featured: e.target.checked })}
                                                        className="w-4 h-4"
                                                    />
                                                    <label htmlFor="featured" className="text-sm text-purple-300 cursor-pointer">★ Feature this blog post</label>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                                <h3 className="text-lg font-semibold text-purple-400 mb-4">Content</h3>
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Blog Content (Markdown)</label>
                                                    <textarea
                                                        className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none transition-colors"
                                                        placeholder="# Your blog content here&#10;&#10;Write your content in **Markdown** format..."
                                                        rows={12}
                                                        value={editingBlog.content || ""}
                                                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">{(editingBlog.content || "").split(/\s+/).filter(Boolean).length} words</p>
                                                </div>
                                            </div>

                                            {/* Media Section */}
                                            <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                                <h3 className="text-lg font-semibold text-purple-400 mb-4">Media</h3>

                                                {/* Image Upload */}
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Featured Image</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                            id="image-upload"
                                                        />
                                                        <label
                                                            htmlFor="image-upload"
                                                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg cursor-pointer transition-colors"
                                                        >
                                                            {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                            Upload Image
                                                        </label>
                                                        <span className="text-gray-500 text-sm self-center">or</span>
                                                        <input
                                                            className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            placeholder="Paste image URL"
                                                            value={editingBlog.image_url || ""}
                                                            onChange={(e) => setEditingBlog({ ...editingBlog, image_url: e.target.value })}
                                                        />
                                                    </div>
                                                    {editingBlog.image_url && (
                                                        <div className="mt-3 relative">
                                                            <img src={editingBlog.image_url} alt="Preview" className="w-full max-w-md h-48 object-cover rounded-lg border border-white/10" />
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingBlog({ ...editingBlog, image_url: "" })}
                                                                className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Video Upload */}
                                                <div>
                                                    <label className="block text-sm text-gray-400 mb-2">Video (Optional)</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={handleVideoUpload}
                                                            className="hidden"
                                                            id="video-upload"
                                                        />
                                                        <label
                                                            htmlFor="video-upload"
                                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg cursor-pointer transition-colors"
                                                        >
                                                            {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                            Upload Video
                                                        </label>
                                                        <span className="text-gray-500 text-sm self-center">or</span>
                                                        <input
                                                            className="flex-1 bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                                                            placeholder="Paste video URL"
                                                            value={editingBlog.video_url || ""}
                                                            onChange={(e) => setEditingBlog({ ...editingBlog, video_url: e.target.value })}
                                                        />
                                                    </div>
                                                    {editingBlog.video_url && (
                                                        <div className="mt-3 relative">
                                                            <video src={editingBlog.video_url} controls className="w-full max-w-md h-48 rounded-lg border border-white/10" />
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingBlog({ ...editingBlog, video_url: "", video_storage_id: "" })}
                                                                className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 justify-end">
                                                <MetalButton type="button" variant="default" onClick={() => { setEditingBlog(null); setBlogEditorMode("edit"); }}>
                                                    Cancel
                                                </MetalButton>
                                                <MetalButton type="submit" variant="primary" className="flex items-center gap-2" disabled={savingBlog}>
                                                    {savingBlog ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                    {savingBlog ? "Saving..." : (editingBlog._id ? "Update Blog" : "Create Blog")}
                                                </MetalButton>
                                            </div>
                                        </form>
                                    )}

                                    {/* Preview Mode */}
                                    {blogEditorMode === "preview" && (
                                        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                            <div className="max-w-4xl mx-auto">
                                                {editingBlog.image_url && (
                                                    <img src={editingBlog.image_url} alt={editingBlog.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                                                )}
                                                <h1 className="text-4xl font-bold font-orbitron mb-4">{editingBlog.title || "Untitled Blog Post"}</h1>
                                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                                    <span>By {editingBlog.author_name || "Unknown Author"}</span>
                                                    <span>•</span>
                                                    <span className={editingBlog.status === "published" ? "text-green-400" : "text-yellow-400"}>
                                                        {editingBlog.status || "draft"}
                                                    </span>
                                                    {editingBlog.is_featured && <span className="text-purple-400">★ Featured</span>}
                                                </div>
                                                {editingBlog.excerpt && (
                                                    <p className="text-lg text-gray-300 mb-6 italic">{editingBlog.excerpt}</p>
                                                )}
                                                <div className="prose prose-invert max-w-none">
                                                    <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                                                        {editingBlog.content || "No content yet. Switch to Edit mode to add content."}
                                                    </pre>
                                                </div>
                                                {editingBlog.video_url && (
                                                    <div className="mt-6">
                                                        <video src={editingBlog.video_url} controls className="w-full rounded-lg" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-3 justify-end mt-6">
                                                <MetalButton variant="default" onClick={() => setBlogEditorMode("edit")}>
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Back to Edit
                                                </MetalButton>
                                                <MetalButton variant="primary" onClick={handleBlogSave} disabled={savingBlog}>
                                                    {savingBlog ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                                    {savingBlog ? "Saving..." : (editingBlog._id ? "Update Blog" : "Create Blog")}
                                                </MetalButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-orbitron font-bold text-white">Global Settings</h2>
                                <MetalButton
                                    variant="primary"
                                    onClick={saveAllSettings}
                                    disabled={isSavingSettings}
                                    className="flex items-center gap-2"
                                >
                                    {isSavingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isSavingSettings ? "Saving..." : "Save All Changes"}
                                </MetalButton>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* General Settings */}
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        🌐 General Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Site Name</label>
                                            <Input
                                                value={localSettings.site_name || ""}
                                                onChange={(e) => updateLocalSetting("site_name", e.target.value)}
                                                placeholder="CodeQuity"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Site Tagline</label>
                                            <Input
                                                value={localSettings.site_tagline || ""}
                                                onChange={(e) => updateLocalSetting("site_tagline", e.target.value)}
                                                placeholder="The Web3 Builder Guild"
                                            />
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="banner-toggle" className="text-purple-300">Announcement Banner</Label>
                                                <Switch
                                                    id="banner-toggle"
                                                    checked={localSettings.show_banner || false}
                                                    onCheckedChange={(checked) => updateLocalSetting("show_banner", checked)}
                                                />
                                            </div>
                                            {localSettings.show_banner && (
                                                <Textarea
                                                    value={localSettings.banner_message || ""}
                                                    onChange={(e) => updateLocalSetting("banner_message", e.target.value)}
                                                    placeholder="Cohort 3 Applications are now open! Apply now →"
                                                    rows={2}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Branding Settings */}
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        🎨 Branding
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Site Logo</label>
                                            <div className="flex gap-2">
                                                <input type="file" id="logo-upload" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                                <label
                                                    htmlFor="logo-upload"
                                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg cursor-pointer transition-colors text-sm"
                                                >
                                                    {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                    Upload
                                                </label>
                                                <Input
                                                    className="flex-1"
                                                    value={localSettings.site_logo || ""}
                                                    onChange={(e) => updateLocalSetting("site_logo", e.target.value)}
                                                    placeholder="Logo URL"
                                                />
                                            </div>
                                            {localSettings.site_logo && (
                                                <div className="mt-2 p-2 bg-black/40 rounded-lg border border-white/10 flex justify-center">
                                                    <img src={localSettings.site_logo} alt="Logo Preview" className="h-10 object-contain" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Favicon</label>
                                            <div className="flex gap-2">
                                                <input type="file" id="favicon-upload" className="hidden" accept="image/x-icon,image/png" onChange={handleFaviconUpload} />
                                                <label
                                                    htmlFor="favicon-upload"
                                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg cursor-pointer transition-colors text-sm"
                                                >
                                                    {uploadingFavicon ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                    Upload
                                                </label>
                                                <Input
                                                    className="flex-1"
                                                    value={localSettings.site_favicon || ""}
                                                    onChange={(e) => updateLocalSetting("site_favicon", e.target.value)}
                                                    placeholder="Favicon URL"
                                                />
                                            </div>
                                            {localSettings.site_favicon && (
                                                <div className="mt-2 p-2 bg-black/40 rounded-lg border border-white/10 flex justify-center">
                                                    <img src={localSettings.site_favicon} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        🔗 Social Links
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Discord Invitation URL</label>
                                            <Input
                                                value={localSettings.social_discord || ""}
                                                onChange={(e) => updateLocalSetting("social_discord", e.target.value)}
                                                placeholder="https://discord.gg/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Twitter / X URL</label>
                                            <Input
                                                value={localSettings.social_twitter || ""}
                                                onChange={(e) => updateLocalSetting("social_twitter", e.target.value)}
                                                placeholder="https://x.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
                                            <Input
                                                value={localSettings.social_github || ""}
                                                onChange={(e) => updateLocalSetting("social_github", e.target.value)}
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Telegram URL</label>
                                            <Input
                                                value={localSettings.social_telegram || ""}
                                                onChange={(e) => updateLocalSetting("social_telegram", e.target.value)}
                                                placeholder="https://t.me/..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* SEO Settings */}
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
                                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                                        🔍 SEO & Analytics
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Global Meta Description</label>
                                            <Textarea
                                                value={localSettings.meta_description || ""}
                                                onChange={(e) => updateLocalSetting("meta_description", e.target.value)}
                                                placeholder="The premier guild for Web3 builders..."
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Google Analytics ID</label>
                                            <Input
                                                value={localSettings.ga_id || ""}
                                                onChange={(e) => updateLocalSetting("ga_id", e.target.value)}
                                                placeholder="G-XXXXXXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <MetalButton
                                    variant="primary"
                                    onClick={saveAllSettings}
                                    disabled={isSavingSettings}
                                    className="w-full md:w-auto flex items-center justify-center gap-2 h-12 px-8"
                                >
                                    {isSavingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isSavingSettings ? "Saving Settings..." : "Save All Configuration"}
                                </MetalButton>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
}
