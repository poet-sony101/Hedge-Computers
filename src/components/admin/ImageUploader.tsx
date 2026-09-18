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
  Sparkles,
} from "lucide-react";
import { DeviceCategory } from "@/types/phone";

interface ImageUploaderProps {
  primaryImage: string;
  galleryImages?: string[];
  category?: DeviceCategory;
  onPrimaryChange: (url: string) => void;
  onGalleryChange?: (urls: string[]) => void;
}

export default function ImageUploader({
  primaryImage,
  galleryImages = [],
  category = "phone",
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

  // Determine fallback placeholder based on device category
  const defaultPlaceholder =
    category === "laptop"
      ? "/images/placeholder-laptop.svg"
      : category === "gadget"
      ? "/images/placeholder-gadget.svg"
      : category === "accessory"
      ? "/images/placeholder-accessory.svg"
      : "/images/placeholder-phone.svg";

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
        <div className="flex items-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-600 dark:text-rose-400">
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
        <div className="flex items-center justify-between mb-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Main Product Picture *
          </label>
          {!primaryImage && (
            <button
              type="button"
              onClick={() => onPrimaryChange(defaultPlaceholder)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1d1d1f] dark:text-white hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#86868b]" />
              <span>Use Default Silhouette</span>
            </button>
          )}
        </div>

        {primaryImage ? (
          /* Image Preview Box */
          <div className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-5 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative h-44 w-44 shrink-0 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 p-2 overflow-hidden flex items-center justify-center shadow-sm">
              <Image
                src={primaryImage}
                alt="Product preview"
                width={160}
                height={160}
                className="max-h-40 w-auto object-contain"
                unoptimized={primaryImage.startsWith("http") || primaryImage.endsWith(".svg")}
              />
              <span className="absolute top-2 left-2 rounded-full bg-[#1d1d1f] dark:bg-white px-2 py-0.5 text-[10px] font-bold text-white dark:text-black shadow-sm">
                Primary
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Picture ready & attached</span>
              </div>
              <p className="text-xs text-[#86868b] font-mono break-all line-clamp-2">
                {primaryImage}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => primaryFileInputRef.current?.click()}
                  disabled={uploading}
                  className="apple-button-secondary text-xs"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${uploading ? "animate-spin" : ""}`} />
                  <span>Replace Picture</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPrimaryChange("")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition"
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
                ? "border-[#1d1d1f] dark:border-white bg-black/5 dark:bg-white/5"
                : "border-black/15 dark:border-white/15 bg-black/[0.01] dark:bg-white/[0.02] hover:border-[#1d1d1f]/40 dark:hover:border-white/40"
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white border border-black/10 dark:border-white/10 mb-4 shadow-sm">
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <UploadCloud className="h-6 w-6" />
              )}
            </div>

            <h4 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
              {uploading ? "Uploading picture..." : "Click to choose a picture or drag & drop"}
            </h4>
            <p className="mt-1 text-xs text-[#86868b]">
              PNG, JPG, JPEG, SVG, or WebP from your phone or computer (up to 10MB)
            </p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={uploading}
                className="apple-button-primary text-xs"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                <span>Browse Files</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrimaryChange(defaultPlaceholder);
                }}
                className="apple-button-secondary text-xs"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Use Silhouette</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Optional Gallery Additional Pictures */}
      {onGalleryChange && (
        <div className="pt-3 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                Additional Gallery Pictures (Optional)
              </span>
              <p className="text-[11px] text-[#86868b]">
                Add side angles, back view, or retail packaging.
              </p>
            </div>

            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              disabled={uploading}
              className="apple-button-secondary text-xs"
            >
              <ImagePlus className="h-3.5 w-3.5" />
              <span>+ Add Angle</span>
            </button>
          </div>

          {galleryImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {galleryImages.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative group h-20 w-20 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden flex items-center justify-center p-1 shadow-sm"
                >
                  <Image
                    src={imgUrl}
                    alt={`Angle ${idx + 1}`}
                    width={70}
                    height={70}
                    className="max-h-16 w-auto object-contain"
                    unoptimized={imgUrl.startsWith("http") || imgUrl.endsWith(".svg")}
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
          className="inline-flex items-center gap-1.5 text-[11px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
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
              placeholder="https://... or /uploads/... or /images/placeholder-phone.svg"
              className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white font-mono transition"
            />
            <button
              type="button"
              onClick={handleApplyManualUrl}
              className="apple-button-secondary text-xs"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
