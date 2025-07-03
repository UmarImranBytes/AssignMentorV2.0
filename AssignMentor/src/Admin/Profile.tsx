import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">{t('profile.title')}</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            {t('profile.form.fullName')}
          </label>
          <input 
            type="text" 
            className="w-full border rounded px-3 py-2 mt-1" 
            placeholder={t('profile.form.fullNamePlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {t('profile.form.email')}
          </label>
          <input 
            type="email" 
            className="w-full border rounded px-3 py-2 mt-1" 
            placeholder={t('profile.form.emailPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            {t('profile.form.password')}
          </label>
          <input 
            type="password" 
            className="w-full border rounded px-3 py-2 mt-1" 
            placeholder={t('profile.form.passwordPlaceholder')}
          />
        </div>
        <button 
          type="submit" 
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {t('profile.saveChanges')}
        </button>
      </form>
    </div>
  );
};

export default Profile;