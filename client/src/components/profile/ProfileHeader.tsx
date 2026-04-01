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
    <div className="flex items-center gap-4 md:gap-6">
      <Avatar className="h-16 w-16 text-xl md:h-20 md:w-20 md:text-2xl">
        <AvatarImage src={user.avatar || undefined} alt={user.username} />
        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div>
        <h1 className="font-sentient text-2xl font-medium">{user.username}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {user.bio || "No bio added."}
        </p>
      </div>
    </div>
  );
};
