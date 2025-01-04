// src/app/admin/upload/page.tsx
"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminUpload() {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Product Images</h1>

      <CldUploadWidget
        uploadPreset="your_upload_preset" // You'll need to create this in Cloudinary
        onUpload={(result: any) => {
          if (result.info) {
            setUploadedUrls((prev) => [...prev, result.info.secure_url]);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {/* Display uploaded image URLs */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Uploaded Images:</h2>
        <ul className="space-y-2">
          {uploadedUrls.map((url, index) => (
            <li key={index} className="break-all">
              {url}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
