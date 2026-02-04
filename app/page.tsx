"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DownloadIcon, Loader2Icon, Repeat2 } from "lucide-react";
import Image from "next/image";
import JSZip from "jszip";
import { toast } from "sonner";

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
      setResults([]);
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    setLoading(true);
    const toastId = toast.loading("Converting images...");
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("image", image);
    });
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
    } catch (error) {
      toast.error("Failed to convert images", { id: toastId });
      setLoading(false);
      return;
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
    } catch (error) {
      toast.error("Failed to download images");
      return;
    }
  };

  return (
    <main className="container mx-auto p-9 flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Jify</CardTitle>
          <CardDescription>
            Convert your JPEG/JPG images to PNG images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  required
                  accept="image/jpeg,image/jpg"
                  onChange={handleImagesChange}
                  disabled={loading}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={images.length === 0 || loading}
            onClick={handleConvert}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2Icon className="size-4 animate-spin" />
                <span>Converting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Repeat2 className="size-4" />
                <span>Convert</span>
              </div>
            )}
          </Button>

          {results.length > 0 && (
            <div className="grid gap-4 pt-4">
              <div className="grid grid-cols-2 gap-2">
                {results.map((url, index) => (
                  <div key={index}>
                    <Image
                      src={url}
                      alt="Converted image"
                      width={400}
                      height={400}
                      className="size-40 object-cover rounded-tl-md rounded-tr-md"
                    />
                    <Button
                      variant="outline"
                      className="w-full rounded-tl-none rounded-tr-none"
                      onClick={() => downloadImage(url, index)}
                    >
                      <DownloadIcon className="size-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={downloadAllImages}
                disabled={loading}
              >
                <div className="flex items-center justify-center gap-2">
                  <DownloadIcon className="size-4" />
                  <span>Download All</span>
                </div>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
