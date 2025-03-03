"use client";
import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

const FeedbackForm = ({ handleSubmit }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ file, preview });
    clearData();
  };

  const clearData = () => {
    setFile(null);
    setPreview(null);
}

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Enter Feedback</h2>
      <form onSubmit={onFormSubmit}>
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-900">
              Screenshot of Feedback
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
              {!file && 
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/gif"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              }
              {file && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Selected: {file.name}</p>
                {preview && (
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="mt-2 max-w-full rounded-md shadow-sm" 
                  />
                )}
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <button 
            type="button" 
            className="text-sm font-semibold text-gray-900"
            onClick={clearData}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
