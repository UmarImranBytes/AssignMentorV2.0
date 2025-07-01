
const Profile = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input type="text" className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
