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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const [resizeOption, setResizeOption] = useState("original");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fitOption, setFitOption] = useState("max");
  const [quality, setQuality] = useState(100);
  const [strip, setStrip] = useState(false);
  const [autoOrient, setAutoOrient] = useState(false);

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

              <div className="flex flex-col gap-2">
                <Label htmlFor="resizeOption">Resize Output Images</Label>
                <Select
                  defaultValue="original"
                  onValueChange={(value) => setResizeOption(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Resize Option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="original">
                        Keep Original Size
                      </SelectItem>
                      <SelectItem value="resize">
                        Enter Height x Width (px)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {resizeOption === "resize" && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter Height"
                    required
                    min={1}
                    onChange={(e) => setHeight(Number(e.target.value))}
                  />
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="Enter Width"
                    required
                    min={1}
                    onChange={(e) => setWidth(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="resizeOption">Fit</Label>
                <Select
                  defaultValue="max"
                  onValueChange={(value) => setFitOption(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Resize Option" />
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="resizeOption">Quality</Label>
                <Input
                  id="quality"
                  type="number"
                  placeholder="Enter Quality"
                  required
                  min={1}
                  max={100}
                  defaultValue={75}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Label htmlFor="strip">Strip</Label>
                  <Checkbox
                    id="strip"
                    checked={strip}
                    onCheckedChange={(checked) => setStrip(Boolean(checked))}
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <Label htmlFor="autoOrient">Auto Orient</Label>
                  <Checkbox
                    id="autoOrient"
                    checked={autoOrient}
                    onCheckedChange={(checked) =>
                      setAutoOrient(Boolean(checked))
                    }
                  />
                </div>
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
