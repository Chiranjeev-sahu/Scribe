import { useEffect, useRef, useState } from "react";

import { Camera, Loader2, Pen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleImageUpload as uploadToCloudinary } from "@/lib/tiptap-utils";
import { useAuthStore } from "@/stores/authStore";

interface EditProfileDialogProps {
  userData: {
    username: string;
    avatar?: string;
    bio?: string;
  };
  onSuccess: (data: { bio: string; avatar: string }) => void;
}

export const EditProfileDialog = ({
  userData,
  onSuccess,
}: EditProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editBio, setEditBio] = useState(userData.bio || "");
  const [editAvatar, setEditAvatar] = useState(userData.avatar || "");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfile = useAuthStore((state) => state.updateProfile);

  useEffect(() => {
    setEditBio(userData.bio || "");
    setEditAvatar(userData.avatar || "");
  }, [userData]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingAvatar(true);
      try {
        const url = await uploadToCloudinary(file);
        setEditAvatar(url);
      } catch (error) {
        console.error("Failed to upload avatar", error);
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const success = await updateProfile({ bio: editBio, avatar: editAvatar });
    if (success) {
      onSuccess({ bio: editBio, avatar: editAvatar });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="text-muted-foreground hover:bg-accent border-border rounded-md border p-2 transition-colors hover:text-foreground"
          title="Edit Profile"
        >
          <Pen className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar className="h-full w-full">
                <AvatarImage src={editAvatar} className="object-cover" />
                <AvatarFallback className="text-2xl uppercase">
                  {userData.username?.[0]}
                </AvatarFallback>
              </Avatar>

              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {isUploadingAvatar ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarUpload}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Click to change avatar
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="font-sentient border-border focus:border-primary focus:ring-primary min-h-[100px] w-full resize-none rounded-md border p-3 text-sm focus:outline-none focus:ring-1"
              placeholder="Tell us about yourself..."
            />
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={isUploadingAvatar}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-2 text-sm transition-colors disabled:opacity-50"
            >
              Save changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
