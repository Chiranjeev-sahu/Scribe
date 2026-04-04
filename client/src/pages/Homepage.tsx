import { useEffect } from "react";
import { Link } from "react-router";

import { motion } from "motion/react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto min-h-screen w-full px-6 py-12 md:px-12 lg:px-24"
    >
      <div className="mb-16">
        <motion.h1
          variants={itemVariants}
          className="font-sentient max-w-3xl py-3 text-3xl tracking-tighter md:text-5xl"
        >
          Welcome to Scribe, we write about technology, people and culture.
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          style={{ originX: 0 }}
          className="bg-foreground mt-8 h-0.5 w-full md:mt-12"
        />
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex w-full items-center justify-center py-24">
          <h2 className="font-sentient text-muted-foreground text-3xl">
            No posts yet. Start writing!
          </h2>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          className="flex flex-col items-start gap-9 lg:flex-row"
        >
          <motion.section
            variants={itemVariants}
            className="mt-5 mb-16 w-full self-start lg:sticky lg:top-24 lg:w-1/2"
          >
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
          </motion.section>
          <div className="bg-accent-foreground h-0.25 w-full md:hidden"></div>
          <motion.section
            variants={itemVariants}
            className="mt-5 mb-16 flex w-full flex-col lg:w-1/2"
          >
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
          </motion.section>
        </motion.div>
      )}

      {pagination && pagination.currentPage < pagination.totalPages && (
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={loadMore}
            disabled={loading}
            className="border-border hover:bg-accent rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more posts"}
          </button>
        </motion.div>
      )}
    </motion.main>
  );
};
