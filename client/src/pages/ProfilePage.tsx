import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { SquarePen } from "lucide-react";

import client from "@/api/client";
import { PostCard } from "@/components/post/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { useDraftsStore } from "@/stores/draftsStore";

// Define the types we expect from the backend
interface ProfileData {
  user: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  posts: any[]; // We will type this properly later when we build the post cards!
}

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const loggedInUser = useAuthStore((state) => state.userData);

  // Bring in the global stores for drafts and bookmarks
  const { drafts, fetchDrafts, loading: draftsLoading } = useDraftsStore();
  const {
    bookmarkedPosts,
    fetchBookmarks,
    loading: bookmarksLoading,
  } = useBookmarkStore();

  // Local state for the page
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "published" | "drafts" | "bookmarks"
  >("published");

  // Check if the user is looking at their own profile
  const isOwnProfile = loggedInUser?.username === username;

  // Handle tab switching and fetching missing data
  const handleTabChange = (tab: "published" | "drafts" | "bookmarks") => {
    setActiveTab(tab);
    if (tab === "drafts" && drafts.length === 0) fetchDrafts();
    if (tab === "bookmarks" && bookmarkedPosts.length === 0) fetchBookmarks();
  };

  // Build the list of available tabs dynamically
  type TabType = "published" | "drafts" | "bookmarks";
  const tabs: { id: TabType; label: string }[] = [
    { id: "published", label: "Published" },
    // Use the spread operator to conditionally add elements to an array!
    ...(isOwnProfile
      ? [
          { id: "drafts" as TabType, label: "Drafts" },
          { id: "bookmarks" as TabType, label: "Bookmarks" },
        ]
      : []),
  ];

  useEffect(() => {
    // If there is no username in the URL, don't try to fetch
    if (!username) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await client.get(`/user/profile/${username}`);
        setProfileData(response.data.data);
      } catch (err) {
        setError("Profile not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="border-chart-2 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">404</h1>
        <p className="text-gray-500">{error || "User not found"}</p>
      </div>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-4 py-10">
      {/* Top Header Section */}
      <section className="mb-8 flex w-full items-start justify-between rounded-lg border p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarImage
              src={profileData.user.avatar || undefined}
              alt={profileData.user.username}
            />
            <AvatarFallback>
              {profileData.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="font-sentient text-2xl font-medium">
              {profileData.user.username}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {profileData.user.bio || "No bio added."}
            </p>
          </div>
        </div>
        {/* Only show the edit button if it's THEIR profile */}
        {isOwnProfile && (
          <button
            className="rounded-md border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            title="Edit Profile"
          >
            <SquarePen className="h-4 w-4" />
          </button>
        )}
      </section>

      {/* Tabs and Post List Section */}
      <section className="rounded-lg border">
        <nav className="border-b">
          <ul className="flex divide-x">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 cursor-pointer px-6 py-3 text-center text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-chart-2 bg-gray-100" // Active tab style
                    : "text-gray-500 hover:bg-gray-50" // Inactive tab style
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-h-[800px] overflow-y-auto p-2">
          {activeTab === "published" && (
            <div className="flex flex-col gap-4">
              {profileData.posts.length === 0 ? (
                <p className="text-sm text-gray-500">No published posts yet.</p>
              ) : (
                profileData.posts.map((post) => <PostCard post={post} />)
              )}
            </div>
          )}

          {activeTab === "drafts" && (
            <div className="flex flex-col gap-4">
              {draftsLoading ? (
                <p className="text-sm text-gray-500">Loading drafts...</p>
              ) : drafts.length === 0 ? (
                <p className="text-sm text-gray-500">No drafts found.</p>
              ) : (
                drafts.map((draft) => (
                  <div key={draft._id} className="rounded-md border p-4">
                    <h3 className="font-semibold">{draft.title}</h3>
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(draft.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "bookmarks" && (
            <div className="flex flex-col gap-4">
              {bookmarksLoading ? (
                <p className="text-sm text-gray-500">Loading bookmarks...</p>
              ) : bookmarkedPosts.length === 0 ? (
                <p className="text-sm text-gray-500">No bookmarked posts.</p>
              ) : (
                bookmarkedPosts.map((post) => <PostCard post={post} />)
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
