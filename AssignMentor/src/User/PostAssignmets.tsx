import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssignmentForm() {
  const MAX_FILE_SIZE_MB = 100;
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    files: [] as File[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => fileInputRef.current?.click();

  const removeFile = (index: number) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  const totalFileSizeMB = (files: File[]) =>
    files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalSize = totalFileSizeMB([...formData.files, ...selectedFiles]);

    const validFiles = selectedFiles.filter((file) =>
      ALLOWED_TYPES.includes(file.type)
    );

    const hasInvalid = selectedFiles.length !== validFiles.length;
    if (hasInvalid) {
      toast.error("❌ One or more files have invalid type.");
      return;
    }

    if (formData.files.length + validFiles.length > 8) {
      toast.error("❌ You can upload a maximum of 8 files.");
      return;
    }

    if (totalSize > MAX_FILE_SIZE_MB) {
      toast.error("❌ Total file size exceeds 100 MB.");
      return;
    }

    setFormData({ ...formData, files: [...formData.files, ...validFiles] });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.files.length === 0) {
      toast.error("❌ Please upload at least one file.");
      return;
    }

    const now = new Date();
    const selectedDeadline = new Date(formData.deadline);
    if (selectedDeadline <= now) {
      toast.error("❌ Deadline must be in the future.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in.");

      formDataToSend.append("userId", userId);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("deadline", formData.deadline);
      formDataToSend.append("price", formData.budget);

      formData.files.forEach((file) =>
        formDataToSend.append("files", file)
      );

      const res = await fetch("http://localhost:5000/api/assignments", {
        method: "POST",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Failed to submit assignment");

      toast.success("🎉 Assignment submitted successfully!");

      setFormData({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        files: [],
      });
    } catch (error) {
      toast.error(
        `❌ ${
          error instanceof Error ? error.message : "Submission failed"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <ToastContainer position="top-right" autoClose={4000} />
      <div className="w-full max-w-4xl bg-white p-10 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Post Your Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Upload Supporting Files{" "}
              <span className="text-red-500">*</span> (Max 8, up to 100MB)
            </label>
            <div className="flex gap-4 items-start">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
              >
                Choose Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="files"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                multiple
                className="hidden"
              />
            </div>
            {formData.files.length > 0 && (
              <div className="mt-3 border rounded-md p-3 space-y-2 bg-gray-50">
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-700 truncate max-w-xs">
                      {file.name}
                    </span>
                    <div className="flex gap-2">
                      <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">Price</label>
              <input
                type="text"
                name="budget"
                pattern="\d*"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">
                Deadline
              </label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition font-semibold flex justify-center items-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
}
