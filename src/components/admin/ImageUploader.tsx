"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  ImagePlus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
  Eye,
} from "lucide-react";

interface ImageUploaderProps {
  primaryImage: string;
  galleryImages?: string[];
  onPrimaryChange: (url: string) => void;
  onGalleryChange?: (urls: string[]) => void;
}

export default function ImageUploader({
  primaryImage,
  galleryImages = [],
  onPrimaryChange,
  onGalleryChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Upload a file to /api/admin/upload
  const uploadFile = async (file: File): Promise<string | null> => {
    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Failed to upload image.");
        return null;
      }

      return data.url;
    } catch {
      setUploadError("Network error occurred during image upload.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle Primary Picture Select
  const handlePrimaryFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      onPrimaryChange(url);
    }
    // reset input
    if (primaryFileInputRef.current) {
      primaryFileInputRef.current.value = "";
    }
  };

  // Handle Gallery Picture Select
  const handleGalleryFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i]);
      if (url && onGalleryChange) {
        onGalleryChange([...galleryImages, url]);
      }
    }

    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
  };

  // Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const url = await uploadFile(e.dataTransfer.files[0]);
      if (url) {
        onPrimaryChange(url);
      }
    }
  };

  // Remove a gallery image
  const removeGalleryImage = (indexToRemove: number) => {
    if (!onGalleryChange) return;
    onGalleryChange(galleryImages.filter((_, idx) => idx !== indexToRemove));
  };

  // Apply Manual URL
  const handleApplyManualUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    onPrimaryChange(manualUrl.trim());
    setManualUrl("");
  };

  return (
    <div className="space-y-5">
      {/* Upload Error Alert */}
      {uploadError && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={primaryFileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePrimaryFile}
        className="hidden"
      />
      <input
        ref={galleryFileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleGalleryFiles}
        className="hidden"
      />

      {/* Primary Picture Section */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
          Main Product Picture *
        </label>

        {primaryImage ? (
          /* Image Preview Box */
          <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-44 w-44 shrink-0 rounded-2xl border border-white/10 bg-zinc-950 p-2 overflow-hidden flex items-center justify-center">
              <Image
                src={primaryImage}
                alt="Product preview"
                width={160}
                height={160}
                className="max-h-40 w-auto object-contain"
                unoptimized={primaryImage.startsWith("http")}
              />
              <span className="absolute top-2 left-2 rounded-md bg-blue-600/90 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                Primary
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Picture ready & attached</span>
              </div>
              <p className="text-xs text-zinc-400 font-mono break-all line-clamp-2">
                {primaryImage}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => primaryFileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${uploading ? "animate-spin" : ""}`} />
                  <span>Replace Picture</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPrimaryChange("")}
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-950/20 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/30 transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Dropzone */
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => primaryFileInputRef.current?.click()}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/15 bg-zinc-900/40 hover:border-blue-500/50 hover:bg-zinc-900/60"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-blue-400 border border-white/10 mb-4 shadow-lg shadow-black/40">
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              ) : (
                <UploadCloud className="h-6 w-6" />
              )}
            </div>

            <h4 className="text-sm font-bold text-white">
              {uploading ? "Uploading picture..." : "Click to choose a picture or drag & drop"}
            </h4>
            <p className="mt-1 text-xs text-zinc-400">
              PNG, JPG, JPEG, or WebP from your phone or computer (up to 10MB)
            </p>

            <button
              type="button"
              disabled={uploading}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-900/30 hover:bg-blue-500 transition"
            >
              <ImagePlus className="h-3.5 w-3.5" />
              <span>Browse Device</span>
            </button>
          </div>
        )}
      </div>

      {/* Optional Gallery Additional Pictures */}
      {onGalleryChange && (
        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Additional Gallery Pictures (Optional)
              </span>
              <p className="text-[11px] text-zinc-500">
                Add side angles, back view, or retail packaging.
              </p>
            </div>

            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
            >
              <ImagePlus className="h-3.5 w-3.5 text-blue-400" />
              <span>+ Add Angle</span>
            </button>
          </div>

          {galleryImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group h-20 w-20 rounded-xl border border-white/10 bg-zinc-900 overflow-hidden flex items-center justify-center p-1"
                >
                  <Image
                    src={imgUrl}
                    alt={`Angle ${idx + 1}`}
                    width={70}
                    height={70}
                    className="max-h-16 w-auto object-contain"
                    unoptimized={imgUrl.startsWith("http")}
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove angle"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fallback Option: Enter Manual Web URL */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowUrlFallback(!showUrlFallback)}
          className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 transition"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showUrlFallback ? "Hide URL input" : "Or paste image URL instead"}</span>
        </button>

        {showUrlFallback && (
          <div className="mt-2.5 flex items-center gap-2">
            <input
              type="text"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or /uploads/..."
              className="flex-1 rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-blue-500 font-mono"
            />
            <button
              type="button"
              onClick={handleApplyManualUrl}
              className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-700 transition"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
