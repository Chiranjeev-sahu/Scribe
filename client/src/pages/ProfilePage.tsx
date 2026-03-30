import { useEffect, useState } from "react";
import { useParams } from "react-router";

import client from "@/api/client";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { PostList } from "@/components/post/PostList";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
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
    <main className="mx-auto flex w-full flex-col overflow-x-hidden py-10">
      {/* ROW 1: HEADER (Aligned with the center column but without sidebars) */}
      <div className="mx-auto flex w-full items-start justify-center gap-8 px-4 lg:px-8">
        <div className="hidden w-[240px] shrink-0 lg:block"></div>

        <section className="mb-4 flex w-full max-w-7xl min-w-0 items-start justify-between pt-2">
          {/* Decorative Intersection Lines */}

          <ProfileHeader user={profileData.user} />

          {isOwnProfile && (
            <div className="flex shrink-0 gap-2">
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

        <div className="hidden w-[280px] shrink-0 lg:block"></div>
      </div>

      {/* ROW 2: SIDEBARS + CONTENT */}
      <div className="mx-auto flex w-full items-start justify-center gap-8 px-4 lg:px-10">
        {/* Left Column: Filter Sidebar */}
        <aside className="hidden w-[240px] shrink-0 flex-col gap-8 [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:sticky lg:top-10 lg:flex lg:h-[calc(100vh-80px)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Filter
            </h3>
            <div className="flex flex-col gap-2">
              <button className="rounded-md bg-gray-900 px-4 py-2 text-left text-sm text-white transition-all">
                All Topics
              </button>
              {["Technology", "Design", "JavaScript"].map((topic) => (
                <button
                  key={topic}
                  className="rounded-md border border-gray-100 px-4 py-2 text-left text-sm text-gray-500 transition-all hover:bg-gray-50"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Sort by
            </h3>
            <div className="flex flex-col gap-2">
              <button className="rounded-md border border-gray-100 px-4 py-2 text-left text-sm text-gray-500 transition-all hover:bg-gray-50">
                Newest first
              </button>
              <button className="rounded-md border border-gray-100 px-4 py-2 text-left text-sm text-gray-500 transition-all hover:bg-gray-50">
                Oldest first
              </button>
            </div>
          </div>
        </aside>

        {/* Central Vertical Stack: Tabs & Posts */}
        <section className="relative flex w-full max-w-7xl min-w-0 flex-col">
          <div className="absolute top-[-120px] left-[-16px] h-64 w-0.5 bg-linear-to-b from-transparent via-emerald-500 to-transparent"></div>
          <div className="absolute top-0 left-[-150px] h-0.5 w-[calc(25%+100px)] bg-linear-to-r from-transparent via-emerald-500 to-transparent"></div>

          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

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

        {/* Right Column: Stats Sidebar */}
        <aside className="hidden w-[280px] shrink-0 flex-col gap-6 [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:sticky lg:top-10 lg:flex lg:h-[calc(100vh-80px)] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="mt-2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-sm font-semibold text-gray-900">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 py-4 transition-all hover:bg-gray-50">
                <span className="font-sentient text-lg font-bold text-emerald-600">
                  {drafts.length}
                </span>
                <span className="text-xs text-gray-500">Drafts</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 py-4 transition-all hover:bg-gray-50">
                <span className="font-sentient text-lg font-bold text-emerald-600">
                  {profileData.posts.length}
                </span>
                <span className="text-xs text-gray-500">Published</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 py-4 transition-all hover:bg-gray-50">
                <span className="font-sentient text-lg font-bold text-emerald-600">
                  {bookmarkedPosts.length}
                </span>
                <span className="text-xs text-gray-500">Bookmarks</span>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-gray-400 italic">
              Tip: Publish a post to grow your audience!
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};
