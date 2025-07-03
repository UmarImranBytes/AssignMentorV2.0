import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const userId = localStorage.getItem("userId"); // Make sure this exists
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    createdAt: "",
    bio: "",
    profilePic: "",
  });

  const [preview, setPreview] = useState("/default-profile.png");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:5000/api/profile/${userId}`)
      .then(res => {
        setProfile(res.data);
        if (res.data.profilePic) setPreview(res.data.profilePic);
      })
      .catch(() => {
        toast.error("Failed to load profile", { theme: "colored" });
      });
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setProfile((prev) => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/profile/${userId}`, profile);
      toast.success("Profile updated successfully!", { theme: "colored" });
      setIsEditing(false);
    } catch (err) {
      toast.error("Update failed", { theme: "colored" });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info("Changes cancelled.", { theme: "colored" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text mb-8">
          Student Profile
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 flex items-center justify-center text-xl rounded-full shadow-md transition"
              title="Change Profile Picture"
            >
              +
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="w-full flex-1 space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border focus:ring-2 focus:ring-orange-500 transition duration-200"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Role</label>
              <input
                type="text"
                value={profile.role}
                readOnly
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Enrollment Date</label>
              <input
                type="text"
                value={new Date(profile.createdAt).toLocaleDateString()}
                readOnly
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border focus:ring-2 focus:ring-orange-500 transition duration-200 resize-y"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
