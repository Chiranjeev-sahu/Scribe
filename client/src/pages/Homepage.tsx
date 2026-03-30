import { useEffect } from "react";
import { Link } from "react-router";

import { toast } from "sonner";

import { PostCard } from "@/components/post/PostCard";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/stores/postsStore";

export const Homepage = () => {
  const { posts, loading, error, pagination, fetchPosts, loadMore } =
    usePostsStore();

  useEffect(() => {
    fetchPosts(1, undefined, 10);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const recentPosts = posts.slice(2);
  const featuredPosts = posts.slice(0, 2);

  return (
    <main className="min-h-screen px-24 py-12">
      <div className="mb-16">
        <h1 className="font-sentient max-w-3xl py-3 text-5xl tracking-tighter">
          Welcome to Scribe, we write about technology, people and culture.
        </h1>
        <div className="bg-foreground mt-12 h-0.5 w-full" />
      </div>

      {loading && posts.length === 0 ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div className="flex w-full items-center justify-center py-24">
          {/* TODO: Remove this generic fallback later and replace with a nicer empty state if needed */}
          <h2 className="font-sentient text-3xl text-gray-500">
            No posts yet. Start writing!
          </h2>
        </div>
      ) : (
        <div className="flex items-start gap-9">
          <section className="sticky top-24 mt-5 mb-16 w-1/2 self-start">
            <h2 className="font-sentient mb-8 text-3xl">Featured Article</h2>
            <div className="grid flex-1 grid-cols-1 gap-5">
              {featuredPosts.map((post) => (
                <Link
                  to={`/post/${post._id}`}
                  key={`${post._id}`}
                  className="transition-opacity hover:opacity-90"
                >
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-5 mb-16 flex w-1/2 flex-col">
            <h2 className="font-sentient mb-8 text-3xl">Recent Posts</h2>
            <div className="grid grid-cols-2 content-start gap-4">
              {recentPosts.map((post) => (
                <Link
                  to={`/post/${post._id}`}
                  key={`${post._id}`}
                  className="transition-opacity hover:opacity-90"
                >
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
      {/* Load More Button */}
      {pagination && pagination.currentPage < pagination.totalPages && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more posts"}
          </button>
        </div>
      )}
    </main>
  );
};
