import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "student" | "tutor" | "admin";
}

const ManageUsers = () => {
  const { t } = useTranslation();
  const dummyUsers: User[] = [
    { id: "1", firstName: "Ali", lastName: "Khan", email: "ali@example.com", role: "student" },
    { id: "2", firstName: "Sara", lastName: "Malik", email: "sara@example.com", role: "tutor" },
    { id: "3", firstName: "Ahmed", lastName: "Butt", email: "ahmed@example.com", role: "admin" },
    { id: "4", firstName: "Noor", lastName: "Zahid", email: "noor@example.com", role: "student" },
    { id: "5", firstName: "Zara", lastName: "Iqbal", email: "zara@example.com", role: "student" },
    { id: "6", firstName: "Bilal", lastName: "Raza", email: "bilal@example.com", role: "tutor" },
  ];

  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<"all" | "student" | "tutor" | "admin">("all");
  const [sortField, setSortField] = useState<"firstName" | "lastName" | "email">("firstName");
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: typeof sortField) => {
    setSortField(field);
  };

  const handleSearch = (user: User) => {
    return (
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredUsers = users
    .filter((u) => filterRole === "all" || u.role === filterRole)
    .filter(handleSearch)
    .sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const openDrawer = (user: User) => {
    setEditUser(user);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditUser(null);
  };

  const handleSave = () => {
    if (!editUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === editUser.id ? editUser : u))
    );
    toast.success(t('users.updateSuccess'));
    closeDrawer();
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success(t('users.deleteSuccess'));
  };

  const toggleAdmin = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, role: u.role === "admin" ? "tutor" : "admin" }
          : u
      )
    );
    toast.info(t('users.roleToggle'));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">
        {t('users.manageUsers')}
      </h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <select
          value={filterRole}
          onChange={(e) =>
            setFilterRole(e.target.value as "all" | "student" | "tutor" | "admin")
          }
          className="border px-3 py-2 rounded"
        >
          <option value="all">{t('users.filter.allRoles')}</option>
          <option value="student">{t('users.filter.students')}</option>
          <option value="tutor">{t('users.filter.tutors')}</option>
          <option value="admin">{t('users.filter.admins')}</option>
        </select>

        <input
          type="text"
          placeholder={t('users.searchPlaceholder')}
          className="border px-3 py-2 rounded w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="w-full border shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("firstName")}>
              {t('users.table.firstName')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("lastName")}>
              {t('users.table.lastName')}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("email")}>
              {t('users.table.email')}
            </th>
            <th className="px-4 py-2">{t('users.table.role')}</th>
            <th className="px-4 py-2">{t('users.table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 capitalize">{t(`users.roles.${user.role}`)}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                  onClick={() => openDrawer(user)}
                >
                  {t('users.actions.edit')}
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  {t('users.actions.delete')}
                </button>
                {user.role !== "student" && (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => toggleAdmin(user.id)}
                  >
                    {user.role === "admin" 
                      ? t('users.actions.revokeAdmin') 
                      : t('users.actions.makeAdmin')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {t('pagination.prev')}
        </button>
        <span className="text-sm text-gray-600">
          {t('pagination.pageInfo', { current: currentPage, total: totalPages })}
        </span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {t('pagination.next')}
        </button>
      </div>

      {/* Side Drawer */}
      <Transition appear show={isDrawerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeDrawer}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-lg overflow-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t('users.editUser')}
              </h2>
              <div className="space-y-3">
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editUser?.firstName || ""}
                  placeholder={t('users.form.firstName')}
                  onChange={(e) =>
                    setEditUser((prev) =>
                      prev ? { ...prev, firstName: e.target.value } : null
                    )
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editUser?.lastName || ""}
                  placeholder={t('users.form.lastName')}
                  onChange={(e) =>
                    setEditUser((prev) =>
                      prev ? { ...prev, lastName: e.target.value } : null
                    )
                  }
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editUser?.email || ""}
                  placeholder={t('users.form.email')}
                  onChange={(e) =>
                    setEditUser((prev) =>
                      prev ? { ...prev, email: e.target.value } : null
                    )
                  }
                />
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={closeDrawer}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  {t('common.save')}
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ManageUsers;