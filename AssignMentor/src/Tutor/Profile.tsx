import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    name: t("profile1.default.name"),
    email: t("profile1.default.email"),
    phone: t("profile1.default.phone"),
    role: t("profile1.roles.student"),
    enrollmentDate: t("profile1.default.enrollmentDate"),
    bio: t("profile1.default.bio"),
    profilePic: "/default-profile.png",
  });

  const [preview, setPreview] = useState(profile.profilePic);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        toast.success(t("profile.messages.picUpdated"), { theme: "colored" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success(t("profile.messages.saveSuccess"), { theme: "colored" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast.info(t("profile.messages.changesCancelled"), { theme: "colored" });
  };

  const formFields = [
    { label: t("profile.labels.name"), name: "name", type: "text" },
    { label: t("profile.labels.email"), name: "email", type: "email" },
    { label: t("profile.labels.phone"), name: "phone", type: "text" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text mb-8">
          {t("profile.title")}
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-orange-500 shadow-lg">
            <img src={preview} alt={t("profile.alt.profilePic")} className="w-full h-full object-cover" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 flex items-center justify-center text-xl rounded-full shadow-md transition"
              title={t("profile.buttons.changePic")}
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
            {formFields.map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={profile[name as keyof typeof profile] as string}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border focus:ring-2 focus:ring-orange-500 transition duration-200"
                />
              </div>
            ))}

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                {t("profile.labels.role")}
              </label>
              <input
                type="text"
                value={profile.role}
                readOnly
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                {t("profile.labels.enrollmentDate")}
              </label>
              <input
                type="text"
                value={profile.enrollmentDate}
                readOnly
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                {t("profile.labels.bio")}
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border focus:ring-2 focus:ring-orange-500 transition duration-200 resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                >
                  {t("profile.buttons.edit")}
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                  >
                    {t("profile.buttons.save")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition shadow-md"
                  >
                    {t("profile.buttons.cancel")}
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