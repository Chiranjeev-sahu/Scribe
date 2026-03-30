import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: {
    username: string;
    avatar?: string;
    bio?: string;
  };
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-20 w-20 text-2xl">
        <AvatarImage
          src={user.avatar || undefined}
          alt={user.username}
        />
        <AvatarFallback>
          {user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 className="font-sentient text-2xl font-medium">
          {user.username}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {user.bio || "No bio added."}
        </p>
      </div>
    </div>
  );
};
