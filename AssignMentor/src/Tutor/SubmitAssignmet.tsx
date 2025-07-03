import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUpload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmitAssignment: React.FC = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Basic validation with i18n
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error(t('submitAssignment.errors.fileTooLarge'));
        return;
      }
      
      setFile(selectedFile);
      toast.success(t('submitAssignment.fileSelected', { fileName: selectedFile.name }));
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error(t('submitAssignment.errors.noFileSelected'));
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      toast.success(t('submitAssignment.submissionSuccess', { fileName: file.name }));
      setFile(null);
    } catch (error) {
      toast.error(t('submitAssignment.errors.submissionFailed'));
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-orange-600 mb-4">
        {t('submitAssignment.title')}
      </h1>
      
      <div className="mb-4">
        <label className="flex flex-col items-center px-4 py-6 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed cursor-pointer">
          <FaUpload className="text-2xl mb-2 text-orange-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {file ? file.name : t('submitAssignment.fileInputLabel')}
          </span>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
            disabled={isSubmitting}
            aria-label={t('submitAssignment.fileInputAriaLabel')}
          />
        </label>
      </div>

      {uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-orange-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="sr-only">
              {t('submitAssignment.uploadProgress', { progress: uploadProgress })}
            </span>
          </div>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting || !file}
        className={`w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition
          ${(isSubmitting || !file) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin" />
            {t('submitAssignment.uploading')}
          </>
        ) : (
          t('submitAssignment.submitButton')
        )}
      </button>
    </div>
  );
};

export default SubmitAssignment;