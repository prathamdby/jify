"use client";

import { useState, useCallback, useEffect } from "react";
import { DownloadIcon, Loader2Icon, Upload } from "lucide-react";
import Image from "next/image";
import JSZip from "jszip";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/info-tooltip";

export function Converter() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [resizeOption, setResizeOption] = useState("original");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fitOption, setFitOption] = useState("max");
  const [quality, setQuality] = useState(75);
  const [strip, setStrip] = useState(false);
  const [autoOrient, setAutoOrient] = useState(false);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(
      (f) => f.type === "image/jpeg" || f.type === "image/jpg",
    );
    if (validFiles.length > 0) {
      setImages(validFiles);
      setResults([]);
      setLoading(false);
    } else {
      toast.error("Please select valid JPG/JPEG files");
    }
  }, []);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        handleFiles(files);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handleFiles]);

  const handleConvert = async () => {
    setLoading(true);
    const toastId = toast.loading("Converting images...");
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("resizeOption", resizeOption);
    formData.append("height", height.toString());
    formData.append("width", width.toString());
    formData.append("fitOption", fitOption);
    formData.append("quality", quality.toString());
    formData.append("strip", strip.toString());
    formData.append("autoOrient", autoOrient.toString());

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to convert images", { id: toastId });
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.length === 0) {
        toast.error("Failed to convert images", { id: toastId });
        setLoading(false);
        return;
      }

      setResults(
        data.map((base64: string) => `data:image/png;base64,${base64}`),
      );
      setLoading(false);
      toast.success("Images converted successfully", { id: toastId });
    } catch {
      toast.error("Failed to convert images", { id: toastId });
      setLoading(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-image-${index + 1}.png`;
    a.click();
    a.remove();
  };

  const downloadAllImages = async () => {
    try {
      const zip = new JSZip();
      results.forEach((url: string, index: number) => {
        const base64Data = url.split(",")[1];
        zip.file(`converted-image-${index + 1}.png`, base64Data, {
          base64: true,
        });
      });
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted-images.zip`;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to download images");
    }
  };

  const resetConverter = () => {
    setImages([]);
    setResults([]);
    setLoading(false);
  };

  return (
    <section id="converter" className="px-4 py-8 border-t border-neutral-100">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl mb-4">Converter</h2>

        <div
          className={`border-2 border-dashed rounded p-8 text-center mb-6 transition-colors ${
            isDragging
              ? "border-blue-600 bg-blue-50"
              : images.length > 0
                ? "border-neutral-300 bg-neutral-50"
                : "border-neutral-200 bg-neutral-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {images.length === 0 ? (
            <div className="space-y-3">
              <Upload className="size-6 mx-auto text-neutral-400" />
              <p className="text-sm text-neutral-600">
                Drop, upload, or paste JPG images
              </p>
              <label className="inline-block rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-700 cursor-pointer">
                Browse files
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg"
                  onChange={handleImagesChange}
                  className="sr-only"
                  disabled={loading}
                />
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-neutral-800">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </p>
              <button
                onClick={resetConverter}
                className="text-sm text-neutral-500 hover:text-neutral-800 underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm text-neutral-600">Resize</Label>
                <InfoTooltip>
                  Keep original dimensions or set custom width/height for output
                  images.
                </InfoTooltip>
              </div>
              <Select
                defaultValue="original"
                onValueChange={(value) => setResizeOption(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="original">Original</SelectItem>
                    <SelectItem value="resize">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <Label className="text-sm text-neutral-600">Fit</Label>
                <InfoTooltip>
                  Max: fit within bounds, preserve aspect. Crop: fill bounds,
                  trim excess. Scale: stretch to exact size.
                </InfoTooltip>
              </div>
              <Select
                defaultValue="max"
                onValueChange={(value) => setFitOption(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="max">Max</SelectItem>
                    <SelectItem value="crop">Crop</SelectItem>
                    <SelectItem value="scale">Scale</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {resizeOption === "resize" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-neutral-600">Width</Label>
                <Input
                  type="number"
                  placeholder="px"
                  min={1}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-neutral-600">Height</Label>
                <Input
                  type="number"
                  placeholder="px"
                  min={1}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Label className="text-sm text-neutral-600">
                Quality: {quality}
              </Label>
              <InfoTooltip>
                PNG compression quality (1-100). Lower values = smaller files
                but less quality.
              </InfoTooltip>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-200 rounded appearance-none cursor-pointer accent-neutral-900"
            />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={strip}
                onCheckedChange={(checked) => setStrip(Boolean(checked))}
              />
              <span className="text-neutral-600">Strip metadata</span>
              <InfoTooltip>
                Remove EXIF data, color profiles, and comments to reduce file
                size.
              </InfoTooltip>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={autoOrient}
                onCheckedChange={(checked) => setAutoOrient(Boolean(checked))}
              />
              <span className="text-neutral-600">Auto orient</span>
              <InfoTooltip>
                Fix rotated images using EXIF orientation data.
              </InfoTooltip>
            </label>
          </div>
        </div>

        <button
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={images.length === 0 || loading}
          onClick={handleConvert}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2Icon className="size-4 animate-spin" />
              Converting...
            </span>
          ) : (
            "Convert to PNG"
          )}
        </button>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">
                {results.length} converted
              </span>
              <button
                onClick={downloadAllImages}
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white hover:bg-neutral-700"
              >
                <span className="flex items-center gap-2">
                  <DownloadIcon className="size-3" />
                  Download all
                </span>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {results.map((url, index) => (
                <button
                  key={index}
                  onClick={() => downloadImage(url, index)}
                  className="group relative bg-neutral-50 border border-neutral-200 rounded overflow-hidden aspect-square"
                >
                  <Image
                    src={url}
                    alt={`Converted ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <DownloadIcon className="size-4 text-white" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
