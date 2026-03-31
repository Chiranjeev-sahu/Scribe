import { useEffect, useState } from "react";
import { useParams } from "react-router";

import client from "@/api/client";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { PostList } from "@/components/post/PostList";
import { WriteButton } from "@/components/post/WriteButton";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
import { useAuthStore } from "@/stores/authStore";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { useDraftsStore } from "@/stores/draftsStore";


interface ProfileData {
  user: {
    _id: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  posts: any[];
}

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const loggedInUser = useAuthStore((state) => state.userData);
  const { drafts, fetchDrafts, loading: draftsLoading } = useDraftsStore();
  const {
    bookmarkedPosts,
    fetchBookmarks,
    loading: bookmarksLoading,
  } = useBookmarkStore();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "published" | "drafts" | "bookmarks"
  >("published");

  const isOwnProfile = loggedInUser?.username === username;

  const handleTabChange = (tab: "published" | "drafts" | "bookmarks") => {
    setActiveTab(tab);
    if (tab === "drafts" && drafts.length === 0) fetchDrafts();
    if (tab === "bookmarks" && bookmarkedPosts.length === 0) fetchBookmarks();
  };

  type TabType = "published" | "drafts" | "bookmarks";
  const tabs: { id: TabType; label: string }[] = [
    { id: "published", label: "Published" },
    ...(isOwnProfile
      ? [
          { id: "drafts" as TabType, label: "Drafts" },
          { id: "bookmarks" as TabType, label: "Bookmarks" },
        ]
      : []),
  ];

  useEffect(() => {
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
    <main className="relative mx-auto flex w-full flex-col overflow-x-hidden py-10">
      <div className="absolute top-4 right-8 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full items-start justify-center gap-8 px-4 lg:px-10">
        <section className="mb-4 flex w-full max-w-7xl min-w-0 items-start justify-between pt-2">

          <ProfileHeader user={profileData.user} />

          {isOwnProfile && (
            <div className="flex shrink-0 gap-2">
              <WriteButton />
              <EditProfileDialog
                userData={profileData.user}
                onSuccess={(newData) =>
                  setProfileData((prev) =>
                    prev
                      ? { ...prev, user: { ...prev.user, ...newData } }
                      : prev
                  )
                }
              />
              <LogoutButton />
            </div>
          )}
        </section>
      </div>
      <div className="mx-auto flex w-full items-start justify-center gap-8 px-4 lg:px-10">
        <section className="relative flex w-full max-w-7xl min-w-0 flex-col">
          <div className="absolute top-[-120px] left-[-16px] z-50 h-64 w-0.5 bg-linear-to-b from-transparent via-emerald-900 to-transparent"></div>
          <div className="absolute top-0 left-[-128px] z-50 h-0.5 w-64 bg-linear-to-r from-transparent via-emerald-900 to-transparent"></div>

          {isOwnProfile && (
            <ProfileTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}

          <div className="min-h-[500px] py-6">
            {activeTab === "published" && (
              <div className="flex flex-col gap-4">
                {profileData.posts.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No published posts yet.
                  </p>
                ) : (
                  <PostList
                    posts={profileData.posts}
                    layout="stack"
                    linkPrefix="/post"
                  />
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
                  <PostList posts={drafts} layout="stack" linkPrefix="/write" />
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
                  <PostList
                    posts={bookmarkedPosts}
                    layout="stack"
                    linkPrefix="/post"
                  />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
