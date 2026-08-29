import { useEffect, useRef, useState } from "react";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Camera,
  ShieldCheck,
  Sparkles,
  Mail,
  AlarmClock,
  MessageSquare,
  Loader2,
} from "lucide-react";
import supabase from "../../../utils/supabase";
import TopNav from "../Navs/topNav";
import Sidebar from "../Navs/sideNav";

// ── Types ────────────────────────────────────────────────────────────────
type TabId = "profile" | "security" | "notifications" | "subscriptions";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  bio: string;
  avatar_url: string | null;
}

interface NotificationSettings {
  courseUpdates: boolean;
  quizReminders: boolean;
  communityMentions: boolean;
}

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Account & Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
];

const emptyProfile: ProfileData = {
  full_name: "",
  email: "",
  phone: "",
  bio: "",
  avatar_url: null,
};

// ── Small reusable toggle switch ────────────────────────────────────────
function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    courseUpdates: true,
    quizReminders: false,
    communityMentions: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("full_name, email, phone, bio, avatar_url")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        setProfile({
          full_name: (user.user_metadata?.full_name as string) ?? "",
          email: user.email ?? "",
          phone: "",
          bio: "",
          avatar_url: (user.user_metadata?.avatar_url as string) ?? null,
        });
      } else {
        setProfile({
          full_name: data.full_name ?? "",
          email: data.email ?? user.email ?? "",
          phone: data.phone ?? "",
          bio: data.bio ?? "",
          avatar_url: data.avatar_url,
        });
      }
      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 800 * 1024) {
      setError("Image must be under 800K.");
      return;
    }

    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    setProfile((prev) => ({
      ...prev,
      avatar_url: `${publicUrlData.publicUrl}?t=${Date.now()}`,
    }));
    setUploading(false);
  };

  const handleRemovePhoto = () => {
    setProfile((prev) => ({ ...prev, avatar_url: null }));
  };

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    setError(null);

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      setError("Save failed: " + upsertError.message);
      setSaving(false);
      return;
    }

    await supabase.auth.updateUser({
      data: { full_name: profile.full_name, avatar_url: profile.avatar_url },
    });

    setSaving(false);
  };

  return (
    <>
      <TopNav />
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <div className="min-h-screen flex-1 bg-white px-6 py-10 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <h1 className="text-3xl font-extrabold text-slate-900">Student Settings</h1>
            <p className="mt-1.5 text-slate-500">
              Manage your academic profile, security preferences, and subscription
              details.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
              {/* Sidebar tabs */}
              <nav className="flex flex-col gap-2">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === id
                        ? "border-blue-200 bg-blue-50 text-blue-600"
                        : "border-transparent text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {label}
                  </button>
                ))}
              </nav>

              {/* Main content */}
              <div className="flex flex-col gap-8">
                {activeTab === "profile" && (
                  <>
                    {/* Profile Information card */}
                    <section className="rounded-2xl border border-slate-200">
                      <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
                        <h2 className="text-lg font-bold text-slate-900">
                          Profile Information
                        </h2>
                        <p className="mt-0.5 text-xs font-semibold tracking-wide text-slate-400">
                          PUBLIC VISIBILITY SETTINGS
                        </p>
                      </div>

                      {loading ? (
                        <div className="flex items-center justify-center py-16">
                          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                        </div>
                      ) : (
                        <div className="px-6 py-6">
                          {/* Photo */}
                          <div className="flex flex-wrap items-center gap-5">
                            <div className="relative h-20 w-20 shrink-0">
                              <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
                                {profile.avatar_url ? (
                                  <img
                                    src={profile.avatar_url}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                                    {profile.full_name?.[0]?.toUpperCase() ?? "?"}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                aria-label="Change photo"
                                className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md ring-2 ring-white hover:bg-blue-700 disabled:opacity-60"
                              >
                                {uploading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Camera className="h-3.5 w-3.5" />
                                )}
                              </button>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Profile Photo
                              </p>
                              <p className="mt-0.5 text-sm text-slate-400">
                                JPG, GIF or PNG. Max size of 800K
                              </p>
                              <div className="mt-2.5 flex gap-2">
                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className="rounded-lg bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                                >
                                  Upload New
                                </button>
                                <button
                                  onClick={handleRemovePhoto}
                                  className="rounded-lg bg-red-50 px-3.5 py-1.5 text-sm font-semibold text-red-500 hover:bg-red-100"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Name + Email */}
                          <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-400">
                                FULL NAME
                              </label>
                              <input
                                type="text"
                                value={profile.full_name}
                                onChange={(e) =>
                                  setProfile((prev) => ({
                                    ...prev,
                                    full_name: e.target.value,
                                  }))
                                }
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                              />
                            </div>
                            <div>
                              <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-400">
                                EMAIL ADDRESS
                              </label>
                              <input
                                type="email"
                                value={profile.email}
                                onChange={(e) =>
                                  setProfile((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                              />
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="mt-5">
                            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-400">
                              PHONE
                            </label>
                            <input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) =>
                                setProfile((prev) => ({ ...prev, phone: e.target.value }))
                              }
                              placeholder="+1 (555) 000-0000"
                              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          {/* Bio */}
                          <div className="mt-5">
                            <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-400">
                              SHORT BIO
                            </label>
                            <textarea
                              value={profile.bio}
                              onChange={(e) =>
                                setProfile((prev) => ({ ...prev, bio: e.target.value }))
                              }
                              rows={3}
                              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          {error && (
                            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                              {error}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-end border-t border-slate-100 bg-slate-50/60 px-6 py-4">
                        <button
                          onClick={handleSave}
                          disabled={saving || loading}
                          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </section>

                    {/* Security + Subscription cards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 p-6">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                          <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                          Account Security
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          Your account security is currently high. Two-factor
                          authentication is active.
                        </p>
                        <button
                          onClick={() => setActiveTab("security")}
                          className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50"
                        >
                          Manage Security
                        </button>
                      </div>

                      <div className="relative rounded-2xl border border-slate-200 p-6">
                        <span className="absolute right-6 top-6 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                          PREMIUM
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                          Scholar Plus
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          Next billing cycle: Dec 12, 2023. You have 4 active courses.
                        </p>
                        <button
                          onClick={() => setActiveTab("subscriptions")}
                          className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-50"
                        >
                          View Billing History
                        </button>
                      </div>
                    </div>

                    {/* Notification Alerts */}
                    <section className="rounded-2xl border border-slate-200">
                      <div className="border-b border-slate-100 bg-slate-50/60 px-6 py-4">
                        <h2 className="text-lg font-bold text-slate-900">
                          Notification Alerts
                        </h2>
                        <p className="mt-0.5 text-xs font-semibold tracking-wide text-slate-400">
                          CONTROL HOW WE CONTACT YOU
                        </p>
                      </div>

                      <div className="divide-y divide-slate-100">
                        <div className="flex items-center justify-between gap-4 px-6 py-5">
                          <div className="flex items-start gap-3">
                            <Mail className="mt-0.5 h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Course Updates
                              </p>
                              <p className="mt-0.5 text-sm text-slate-500">
                                Receive emails when instructors post new materials
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.courseUpdates}
                            onChange={(val) =>
                              setNotifications((prev) => ({
                                ...prev,
                                courseUpdates: val,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4 px-6 py-5">
                          <div className="flex items-start gap-3">
                            <AlarmClock className="mt-0.5 h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Quiz Reminders
                              </p>
                              <p className="mt-0.5 text-sm text-slate-500">
                                Push notifications 24 hours before deadlines
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.quizReminders}
                            onChange={(val) =>
                              setNotifications((prev) => ({
                                ...prev,
                                quizReminders: val,
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4 px-6 py-5">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="mt-0.5 h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                Community Mentions
                              </p>
                              <p className="mt-0.5 text-sm text-slate-500">
                                Get notified when someone replies to your forum posts
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.communityMentions}
                            onChange={(val) =>
                              setNotifications((prev) => ({
                                ...prev,
                                communityMentions: val,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="rounded-2xl border border-red-100 bg-red-50/60 px-6 py-8 text-center">
                      <h2 className="text-lg font-bold text-red-700">Danger Zone</h2>
                      <p className="mx-auto mt-1.5 max-w-md text-sm text-red-700/70">
                        Permanently delete your account and all associated course
                        progress. This action cannot be undone.
                      </p>
                      <button className="mt-5 rounded-xl border border-red-300 bg-white px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50">
                        Delete Account
                      </button>
                    </section>
                  </>
                )}

                {activeTab !== "profile" && (
                  <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400">
                    {tabs.find((t) => t.id === activeTab)?.label} settings coming soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}