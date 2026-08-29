import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Camera, Loader2, Check } from "lucide-react";
import supabase  from "../.././/utils/supabase"; 
import type { User } from "@supabase/supabase-js";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
}

interface ProfilePanelProps {
  open: boolean;
  onClose: () => void;
}

const emptyProfile: ProfileData = {
  full_name: "",
  email: "",
  phone: "",
  avatar_url: null,
};

export default function ProfilePanel({ open, onClose }: ProfilePanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile whenever the panel opens
  useEffect(() => {
    if (!open) return;

    const loadProfile = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setError("You need to be logged in.");
        setLoading(false);
        return;
      }

      setUser(authUser);

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("full_name, email, phone, avatar_url")
        .eq("id", authUser.id)
        .single();

      if (fetchError) {
        // fall back to auth metadata if no profiles row exists yet
        setProfile({
          full_name: (authUser.user_metadata?.full_name as string) ?? "",
          email: authUser.email ?? "",
          phone: "",
          avatar_url: (authUser.user_metadata?.avatar_url as string) ?? null,
        });
      } else {
        setProfile({
          full_name: data.full_name ?? "",
          email: data.email ?? authUser.email ?? "",
          phone: data.phone ?? "",
          avatar_url: data.avatar_url,
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, [open]);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

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

    // cache-bust so the new image shows immediately
    const freshUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;

    setProfile((prev) => ({ ...prev, avatar_url: freshUrl }));
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    });

    if (upsertError) {
      setError("Save failed: " + upsertError.message);
      setSaving(false);
      return;
    }

    // keep auth metadata in sync so the navbar initials/avatar update too
    await supabase.auth.updateUser({
      data: { full_name: profile.full_name, avatar_url: profile.avatar_url },
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials =
    profile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || profile.email?.[0]?.toUpperCase() || "U";

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-panel-title"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 id="profile-panel-title" className="text-lg font-bold text-slate-900">
              My Profile
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : (
              <>
                {/* Avatar */}
                <div className="mb-8 flex flex-col items-center">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-2xl font-semibold text-white ring-4 ring-slate-50">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        initials
                      )}
                    </div>
                    <button
                      onClick={handleAvatarClick}
                      disabled={uploading}
                      aria-label="Change photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ring-2 ring-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Camera className="h-4 w-4" />
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
                  <p className="mt-3 text-sm text-slate-400">
                    Click the camera icon to update your photo
                  </p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, full_name: e.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Contact support to change your email
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!loading && (
            <div className="border-t border-slate-200 px-6 py-4">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}