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

    const [activeTab, setActiveTab] = useState<"mission" | "events" | "settings">("mission");
    const [editingWeek, setEditingWeek] = useState<any>(null);
    const [editingEvent, setEditingEvent] = useState<any>(null);

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

    if (isAdmin === false) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Helmet><title>Unauthorized | CodeQuity</title></Helmet>
                <Navigation />
                <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
                        <p className="text-gray-400">Your wallet {address.slice(0, 6)}...{address.slice(-4)} is not authorized.</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (isAdmin === undefined) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-purple-500" /></div>;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Helmet><title>Admin Portal | CodeQuity</title></Helmet>
            <Navigation />

            <div className="flex-1 container mx-auto px-4 py-24">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Admin Portal
                    </h1>
                    <div className="flex gap-2">
                        <MetalButton onClick={() => setActiveTab("mission")} variant={activeTab === "mission" ? "primary" : "default"}>Mission Control</MetalButton>
                        <MetalButton onClick={() => setActiveTab("events")} variant={activeTab === "events" ? "primary" : "default"}>Events</MetalButton>
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
                                                <span className={`text-xs px-2 py-0.5 rounded ${week.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{week.status}</span>
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
