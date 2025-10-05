"use client";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  className?: string;
}

export default function ImageUpload({ 
  value = [], 
  onChange, 
  maxFiles = 10,
  className = "" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        
        const data = await response.json();
        return data.url;
      });
      
      const newUrls = await Promise.all(uploadPromises);
      onChange([...value, ...newUrls]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  }, [value, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: maxFiles - value.length,
    disabled: uploading || value.length >= maxFiles
  });

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {value.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragActive || dragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
            }
            ${uploading ? 'cursor-not-allowed opacity-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="text-4xl">
              {uploading ? '⏳' : '📸'}
            </div>
            
            <div>
              <div className="font-semibold text-primary-600 mb-2">
                {uploading ? 'Uploading...' : 'Upload Product Images'}
              </div>
              <div className="text-sm text-neutral-600">
                Drag & drop images here, or click to select files
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Supports: JPG, PNG, GIF, WebP (Max {maxFiles} images)
              </div>
            </div>
            
            {!uploading && (
              <button
                type="button"
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Choose Files
              </button>
            )}
          </div>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
                <img
                  src={url}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-danger-500 hover:bg-danger-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs font-bold">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image Count */}
      {value.length > 0 && (
        <div className="text-sm text-neutral-600">
          {value.length} of {maxFiles} images uploaded
        </div>
      )}
    </div>
  );
}
