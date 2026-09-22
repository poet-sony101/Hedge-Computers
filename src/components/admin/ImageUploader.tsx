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
  Grid,
  X,
  Smartphone,
  Laptop,
} from "lucide-react";
import { DeviceCategory } from "@/types/phone";

interface ImageUploaderProps {
  primaryImage: string;
  galleryImages?: string[];
  category?: DeviceCategory;
  onPrimaryChange: (url: string) => void;
  onGalleryChange?: (urls: string[]) => void;
}

// Preset verified catalog pictures
const STOCK_LIBRARY = [
  { name: "Apple MacBook / Laptop Silhouette", url: "/images/placeholder-laptop.svg", cat: "laptop" },
  { name: "Apple Smartphone Silhouette", url: "/images/placeholder-phone.svg", cat: "phone" },
  { name: "iPhone 15 Pro Max (Natural Titanium)", url: "/phones/iphone15promax.jpg", cat: "phone" },
  { name: "Samsung Galaxy S25 Ultra (Titanium Gray)", url: "/phones/s25ultra.jpg", cat: "phone" },
  { name: "Google Pixel 9 Pro (Obsidian)", url: "/phones/pixel9pro.jpg", cat: "phone" },
  { name: "Smartwatch / Audio (Titanium Gray)", url: "/images/placeholder-gadget.svg", cat: "gadget" },
  { name: "Power & Charger (Space Gray)", url: "/images/placeholder-accessory.svg", cat: "accessory" },
];

/**
 * Convert any File or Blob directly to a Base64 Data URL
 */
function fileToDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Automatically compress and optimize images client-side before upload
 * Resizes 12MP-48MP smartphone photos down to max 1600px and converts to high quality JPEG/WebP.
 */
async function compressImageFile(file: File): Promise<File> {
  if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
    return file;
  }

  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            let { width, height } = img;
            const maxDimension = 1600;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              resolve(file);
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  resolve(file);
                  return;
                }
                const safeName = (file.name || "photo").replace(/\.[^/.]+$/, "") + ".jpg";
                try {
                  const compressedFile = new File([blob], safeName, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } catch {
                  // If browser doesn't support new File(), return original
                  resolve(file);
                }
              },
              "image/jpeg",
              0.88
            );
          } catch {
            resolve(file);
          }
        };
        img.onerror = () => resolve(file);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    } catch {
      resolve(file);
    }
  });
}

export default function ImageUploader({
  primaryImage,
  galleryImages = [],
  onPrimaryChange,
  onGalleryChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("Uploading photo...");
  const [dragActive, setDragActive] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [manualUrl, setManualUrl] = useState("");

  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Upload a file to /api/admin/upload with automatic Data URL fallback
  const uploadOrFallbackFile = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name || "device-photo.jpg");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          return data.url;
        }
      }
    } catch (e) {
      console.warn("Server upload request failed, using instant local data URL fallback:", e);
    }

    // Bulletproof Fallback: Convert to Base64 Data URL so user is NEVER blocked
    return await fileToDataUrl(file);
  };

  // Handle Primary Picture Select
  const handlePrimaryFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgressText("Processing photo from gallery...");

    try {
      const optimized = await compressImageFile(file);
      const url = await uploadOrFallbackFile(optimized);
      onPrimaryChange(url);
    } catch (err) {
      console.error("Failed to process photo:", err);
      // Even in the worst case, try direct read
      try {
        const directUrl = await fileToDataUrl(file);
        onPrimaryChange(directUrl);
      } catch {}
    } finally {
      setUploading(false);
      if (primaryFileInputRef.current) {
        primaryFileInputRef.current.value = "";
      }
    }
  };

  // Handle Gallery Picture Select (multiple photos safely handled)
  const handleGalleryFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !onGalleryChange) return;

    setUploading(true);
    setUploadProgressText(`Processing ${files.length} gallery photo(s)...`);

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      setUploadProgressText(`Processing photo ${i + 1} of ${files.length}...`);
      try {
        const optimized = await compressImageFile(files[i]);
        const url = await uploadOrFallbackFile(optimized);
        if (url) {
          uploadedUrls.push(url);
        }
      } catch {
        try {
          const directUrl = await fileToDataUrl(files[i]);
          uploadedUrls.push(directUrl);
        } catch {}
      }
    }

    if (uploadedUrls.length > 0) {
      onGalleryChange([...galleryImages, ...uploadedUrls]);
    }

    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
    setUploading(false);
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
      setUploading(true);
      setUploadProgressText("Processing dropped image...");
      try {
        const optimized = await compressImageFile(e.dataTransfer.files[0]);
        const url = await uploadOrFallbackFile(optimized);
        if (url) {
          onPrimaryChange(url);
        }
      } catch {
        try {
          const directUrl = await fileToDataUrl(e.dataTransfer.files[0]);
          onPrimaryChange(directUrl);
        } catch {}
      }
      setUploading(false);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Main Product Picture *
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onPrimaryChange("/images/placeholder-phone.svg")}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                primaryImage === "/images/placeholder-phone.svg"
                  ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                  : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#1d1d1f] dark:text-white hover:border-[#1d1d1f]/40 dark:hover:border-white/40"
              }`}
              title="Use Apple Smartphone silhouette graphic"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Phone Silhouette</span>
            </button>
            <button
              type="button"
              onClick={() => onPrimaryChange("/images/placeholder-laptop.svg")}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                primaryImage === "/images/placeholder-laptop.svg"
                  ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                  : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#1d1d1f] dark:text-white hover:border-[#1d1d1f]/40 dark:hover:border-white/40"
              }`}
              title="Use Apple MacBook/Laptop silhouette graphic"
            >
              <Laptop className="h-3.5 w-3.5" />
              <span>Laptop Silhouette</span>
            </button>
            <button
              type="button"
              onClick={() => setShowStockModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white px-2 py-1.5 hover:underline"
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Catalog Gallery</span>
            </button>
          </div>
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
                unoptimized={
                  primaryImage.startsWith("http") ||
                  primaryImage.startsWith("data:") ||
                  primaryImage.endsWith(".svg")
                }
              />
              <span className="absolute top-2 left-2 rounded-full bg-[#1d1d1f] dark:bg-white px-2.5 py-0.5 text-[10px] font-bold text-white dark:text-black shadow-sm">
                Primary
              </span>
            </div>

            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Picture attached & ready to publish</span>
              </div>
              <p className="text-xs text-[#86868b] font-mono break-all line-clamp-2">
                {primaryImage.startsWith("data:") ? "Image attached (base64 photo)" : primaryImage}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => primaryFileInputRef.current?.click()}
                  disabled={uploading}
                  className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${uploading ? "animate-spin" : ""}`} />
                  <span>Upload Different Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPrimaryChange("/images/placeholder-phone.svg")}
                  className={`apple-button-secondary text-xs inline-flex items-center gap-1.5 ${
                    primaryImage === "/images/placeholder-phone.svg" ? "ring-2 ring-[#1d1d1f] dark:ring-white font-semibold" : ""
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Phone Silhouette</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPrimaryChange("/images/placeholder-laptop.svg")}
                  className={`apple-button-secondary text-xs inline-flex items-center gap-1.5 ${
                    primaryImage === "/images/placeholder-laptop.svg" ? "ring-2 ring-[#1d1d1f] dark:ring-white font-semibold" : ""
                  }`}
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>Laptop Silhouette</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowStockModal(true)}
                  className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span>Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => onPrimaryChange("")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition"
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
              {uploading ? uploadProgressText : "Click to select a photo from your gallery or drag & drop"}
            </h4>
            <p className="mt-1 text-xs text-[#86868b]">
              iPhone/Android photo gallery, JPG, PNG, WebP, or HEIC
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={uploading}
                className="apple-button-primary text-xs inline-flex items-center gap-1.5"
              >
                <ImagePlus className="h-3.5 w-3.5" />
                <span>Upload from Gallery / Files</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrimaryChange("/images/placeholder-phone.svg");
                }}
                className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Phone Silhouette</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrimaryChange("/images/placeholder-laptop.svg");
                }}
                className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>Laptop Silhouette</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStockModal(true);
                }}
                className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Catalog Gallery</span>
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
                Add multiple side angles, back view, or retail packaging.
              </p>
            </div>

            <button
              type="button"
              onClick={() => galleryFileInputRef.current?.click()}
              disabled={uploading}
              className="apple-button-secondary text-xs inline-flex items-center gap-1.5"
            >
              <ImagePlus className="h-3.5 w-3.5" />
              <span>+ Add Angle Photo</span>
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
                    unoptimized={
                      imgUrl.startsWith("http") ||
                      imgUrl.startsWith("data:") ||
                      imgUrl.endsWith(".svg")
                    }
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
              placeholder="https://... or /uploads/... or /phones/iphone15promax.jpg"
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

      {/* Choose from Catalog Gallery Modal */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl apple-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
              <div>
                <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                  Available Tech Picture Library
                </h3>
                <p className="text-xs text-[#86868b]">
                  Select an authentic device photo or official vector silhouette.
                </p>
              </div>
              <button
                onClick={() => setShowStockModal(false)}
                className="text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white p-1 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {STOCK_LIBRARY.map((item) => (
                <button
                  key={item.url}
                  type="button"
                  onClick={() => {
                    onPrimaryChange(item.url);
                    setShowStockModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#1d1d1f] dark:hover:border-white bg-black/[0.02] dark:bg-white/[0.03] transition text-center group"
                >
                  <div className="relative h-24 w-24 flex items-center justify-center">
                    <Image
                      src={item.url}
                      alt={item.name}
                      width={90}
                      height={90}
                      className="max-h-20 w-auto object-contain transition-transform group-hover:scale-105"
                      unoptimized={item.url.endsWith(".svg")}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#1d1d1f] dark:text-white line-clamp-2">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowStockModal(false)}
                className="apple-button-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
