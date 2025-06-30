import React, { useState } from 'react';

const SubmitAssignment: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      // handle file upload logic
      alert(`Submitting: ${file.name}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Submit Assignment</h1>
      <input type="file" onChange={handleFileChange} className="my-2" />
      <button onClick={handleSubmit} className="bg-orange-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
};

export default SubmitAssignment;
