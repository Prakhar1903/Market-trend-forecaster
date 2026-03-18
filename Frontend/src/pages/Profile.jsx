import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile } from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    joinedDate: "",
    stats: { forecasts: 0, accuracy: "0%", lastLogin: "" }
  });
  const [formData, setFormData] = useState({ name: "", username: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setFormData({ name: data.name, username: data.username });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-inter">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card overflow-hidden relative">
            {/* Header Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-primary/20 to-secondary/20" />

            <div className="relative pt-16 pb-10 px-8 flex flex-col items-center">
              {/* Profile Picture */}
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden shadow-2xl relative z-10 transition-transform group-hover:scale-105 duration-300">
                  <span className="text-4xl font-bold text-primary">{profile.name.charAt(0)}</span>
                </div>
                <button className="absolute bottom-1 right-1 z-20 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              {/* User Identity */}
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                <p className="text-slate-400">@{profile.username}</p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 w-full mb-10 border-y border-white/5 py-6">
                <div className="text-center border-r border-white/5">
                  <p className="text-2xl font-bold text-primary">{profile.stats.forecasts}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Forecasts</p>
                </div>
                <div className="text-center border-r border-white/5">
                  <p className="text-2xl font-bold text-secondary">{profile.stats.accuracy}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-slate-300 truncate">{profile.stats.lastLogin}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Last Login</p>
                </div>
              </div>

              {/* Profile Details Form */}
              <div className="w-full space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={isEditing ? formData.name : profile.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400">Username</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={isEditing ? formData.username : profile.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={profile.email}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 opacity-40 cursor-not-allowed outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400">Account Created</label>
                    <input
                      type="text"
                      disabled
                      value={profile.joinedDate}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 opacity-40 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                {/* Account Actions */}
                <div className="pt-8 space-y-4">
                  <div className="flex gap-4">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-primary flex-1 py-4"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="btn-primary flex-1 py-4 shadow-lg shadow-primary/20"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({ name: profile.name, username: profile.username });
                          }}
                          className="btn-secondary flex-1 py-4"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors flex bg-transparent border-none cursor-pointer">
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-red-400 hover:text-red-300 font-semibold transition-colors flex ml-auto bg-transparent border-none cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
