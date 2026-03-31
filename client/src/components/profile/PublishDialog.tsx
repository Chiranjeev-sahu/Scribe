import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleImageUpload as uploadToCloudinary } from "@/lib/tiptap-utils";
import { useEditorStore } from "@/stores/editorStore";

import { PostCard } from "../post/PostCard";

interface PublishDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const PublishDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: PublishDialogProps) => {
  const {
    postId,
    title,
    coverImage,
    category,
    summary,
    setTitle,
    isPublishing,
    setCoverImage,
    setSummary,
  } = useEditorStore();

  const [localSummary, setLocalSummary] = useState(summary || "");
  const [localCoverImage, setLocalCoverImage] = useState(coverImage || null);
  const [localTitle, setLocalTitle] = useState(title);

  useEffect(() => {
    if (isOpen) {
      setLocalTitle(title);
      setLocalSummary(summary || "");
      setLocalCoverImage(coverImage || null);
    }
  }, [isOpen, title, summary, coverImage]);

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        setLocalCoverImage(url);
      } catch (error) {
        console.error("Failed to upload cover", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-5xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Ready to Publish?</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-muted-foreground text-sm font-medium"
              >
                Story Title
              </label>
              <input
                id="title"
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="font-sentient placeholder:text-muted-foreground/50 border-none bg-transparent p-0 text-2xl font-bold outline-none focus:ring-0 focus:outline-none"
                placeholder="Story Title"
              />
            </div>


            <div className="flex flex-col gap-2">
              <label
                htmlFor="summary"
                className="text-muted-foreground text-sm font-medium"
              >
                Preview Summary
              </label>
              <textarea
                id="summary"
                value={localSummary}
                className="placeholder:text-muted-foreground/50 h-32 resize-none rounded-md border border-gray-200 bg-transparent p-3 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none"
                placeholder="Write a brief summary..."
                onChange={(e) => setLocalSummary(e.target.value)}
              />
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="outline"
              className="mt-2"
            >
              {isUploading
                ? "Uploading..."
                : localCoverImage
                  ? "Change Cover Image"
                  : "Upload Cover Image"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleCoverUpload}
            />
          </div>

          <div className="bg-muted/50 flex items-center justify-center rounded-md border">
            <PostCard
              post={{
                _id: postId || "preview-id",
                title: localTitle,
                summary: localSummary,
                coverImage: localCoverImage || undefined,
                category: category,
                updatedAt: new Date().toISOString(),
                author: { _id: "dasf", username: "lmao", avatar: "" },
              }}
              variant="default"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setTitle(localTitle);
              setSummary(localSummary);
              setCoverImage(localCoverImage);
              onConfirm();
            }}
            disabled={isUploading || isPublishing}
          >
            Finalize Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
