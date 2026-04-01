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

  const recentPosts = posts.slice(3);
  const featuredPosts = posts.slice(0, 3);

  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24">
      <div className="mb-16">
        <h1 className="font-sentient max-w-3xl py-3 text-3xl tracking-tighter md:text-5xl">
          Welcome to Scribe, we write about technology, people and culture.
        </h1>
        <div className="bg-foreground mt-8 h-0.5 w-full md:mt-12" />
      </div>

      {loading && posts.length === 0 ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div className="flex w-full items-center justify-center py-24">
          <h2 className="font-sentient text-muted-foreground text-3xl">
            No posts yet. Start writing!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-9 lg:flex-row">
          <section className="mt-5 mb-16 w-full self-start lg:sticky lg:top-24 lg:w-1/2">
            <h2 className="font-sentient mb-8 text-2xl md:text-3xl">
              Featured Article
            </h2>
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
          <div className="bg-accent-foreground h-0.25 w-full md:hidden"></div>
          <section className="mt-5 mb-16 flex w-full flex-col lg:w-1/2">
            <h2 className="font-sentient mb-8 text-2xl md:text-3xl">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 content-start gap-4 md:grid-cols-2">
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

      {pagination && pagination.currentPage < pagination.totalPages && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="border-border hover:bg-accent rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more posts"}
          </button>
        </div>
      )}
    </main>
  );
};
