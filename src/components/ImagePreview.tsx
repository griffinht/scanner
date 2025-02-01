"use client";
import Image from "next/image";

interface ImagePreviewProps {
  imageUrl: string;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <div className="aspect-[3/4] relative w-full mb-4">
      <Image
        src={imageUrl}
        alt="Scanned receipt"
        fill
        className="object-contain"
      />
    </div>
  );
}