import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function UserProfile({ userId }) {
  const [profile, setProfile] = useState({ display_name: "" });
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", userId)
        .single();

      if (data) {
        setProfile(data);
        setNewName(data.display_name);
      } else {
        // fallback from Auth
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setProfile({ display_name: user.user_metadata?.full_name || user.email });
          setNewName(user.user_metadata?.full_name || user.email);
        }
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: userId, display_name: newName });

    if (error) return console.error("Profile update error:", error.message);

    setProfile({ display_name: newName });
    setEditing(false);
  };

  return (
    <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Avatar as edit button */}
      <div
        className="avatar"
        style={{ fontSize: "24px", cursor: "pointer" }}
        onClick={() => setEditing(true)}
        title="Click to edit your name"
      >
        👤
      </div>

      {!editing ? (
        <span>Hi, {profile.display_name || "User"}!</span>
      ) : (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
