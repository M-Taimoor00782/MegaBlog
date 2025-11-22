import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FiEdit2, FiCheck, FiX, FiUpload, FiUser } from "react-icons/fi";
import appwriteService from "../appwrite/config";
import { login } from "../store/authSlice";

export default function Profile() {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    bio: "",
    avatar: "",
    gender: "",
    language: "",
  });
  const [preview, setPreview] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const loadProfile = async () => {
      try {
        const res = await appwriteService.getProfile(user.$id);
        if (res) {
          setFormData({
            username: res.username || user.name || "",
            email: res.email || user.email || "",
            phone: res.phone || "",
            bio: res.bio || "",
            avatar: res.avatar || "",
            gender: res.gender || "",
            language: res.language || "",
          });
          if (res.avatar) setPreview(appwriteService.getFilePreview(res.avatar));
        } else {
          await appwriteService.createProfile({
            userId: user.$id,
            username: user.name,
            email: user.email,
            phone: "",
            bio: "",
            avatar: "",
            gender: "",
            language: "",
          });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const uploaded = await appwriteService.uploadFile(file);
      if (formData.avatar) await appwriteService.deleteFile(formData.avatar);
      setFormData((p) => ({ ...p, avatar: uploaded.$id }));
      setPreview(appwriteService.getFilePreview(uploaded.$id));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await appwriteService.updateProfile(user.$id, formData);
      const updated = await appwriteService.getProfile(user.$id);
      dispatch(login({ ...user, name: updated.username }));
      setEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="h-[70vh] flex justify-center items-center text-gray-600 text-lg">
        Please log in to view your profile.
      </div>
    );

  return (
    <div
      className="min-h-screen flex justify-center items-start px-4 py-12"
      
    >
     <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="relative w-full max-w-3xl rounded-3xl overflow-hidden 
             p-6 sm:p-10 text-white border border-white/20 
             backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
  style={{
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255,255,255,0.2)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
  }}
>
  {/* Subtle reflection at the top */}
  <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl pointer-events-none"></div>




        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/70 pb-6">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-cyan-400 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-white/90 border-2 border-cyan-400">
                  <FiUser size={36} className="text-cyan-500" />
                </div>
              )}
              {editing && (
                <label className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full cursor-pointer text-white">
                  <FiUpload size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-cyan-400">
                {formData.username || user.name}
              </h1>
              <p className="text-gray-300">{formData.email}</p>
              <p className="text-sm text-gray-300 mt-1">
                Joined: {new Date(user.registration).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Full Name" name="username" value={formData.username} onChange={handleChange} disabled={!editing} />
            <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled={!editing} />
            <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} disabled={!editing} options={["Male", "Female", "Other"]} />
            <SelectField label="Language" name="language" value={formData.language} onChange={handleChange} disabled={!editing} options={["English", "Urdu", "Spanish", "French", "Arabic", "German"]} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!editing} placeholder="+92 300 0000000" />
            <TextAreaField label="Bio" name="bio" value={formData.bio} onChange={handleChange} disabled={!editing} placeholder="Tell us about yourself..." />
          </div>

          {/* Buttons */}
          <div className="flex justify-center sm:justify-end gap-4 mt-8 flex-wrap">
            {editing ? (
              <>
                <Button onClick={() => setEditing(false)} icon={<FiX />} text="Cancel" color="gray" />
                <Button onClick={handleSave} icon={<FiCheck />} text={loading ? "Saving..." : "Save"} color="cyan" />
              </>
            ) : (
              <Button onClick={() => setEditing(true)} icon={<FiEdit2 />} text="Edit Profile" color="cyan" />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-300 mb-1">{label}</label>
    <input
      {...props}
      className="w-full bg-white/30 border border-white/20 p-3 rounded-xl shadow-sm
        focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-sm placeholder-gray-300"
    />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div className="sm:col-span-2">
    <label className="block text-sm text-gray-300 mb-1">{label}</label>
    <textarea
      {...props}
      rows="3"
      className="w-full bg-white/30 border border-white/20 p-3 rounded-xl shadow-sm
        focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-sm resize-none placeholder-gray-300"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, disabled }) => (
  <div>
    <label className="block text-sm text-gray-300 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full bg-white/30 border border-white/20 p-3 rounded-xl shadow-sm
        focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-gray-300"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Button = ({ onClick, icon, text, color }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition
    ${color === "gray"
      ? "bg-white/30 hover:bg-white/40 text-gray-300 border border-gray-200"
      : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-md"}
    `}
  >
    {icon}
    {text}
  </button>
);
