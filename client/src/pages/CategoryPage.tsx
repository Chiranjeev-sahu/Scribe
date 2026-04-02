import { useEffect } from "react";
import { useParams } from "react-router";

import { toast } from "sonner";

import { PostList } from "@/components/post/PostList";
import { Spinner } from "@/components/ui/spinner";
import { usePostsStore } from "@/stores/postsStore";

export const CategoryPage = () => {
  const { categoryType } = useParams<{ categoryType: string }>();
  const { posts, loading, error, pagination, setCategory, loadMore } =
    usePostsStore();

  useEffect(() => {
    const category = categoryType === "articles" ? null : categoryType;
    const formattedCategory = category
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : null;
    setCategory(formattedCategory);
  }, [categoryType, setCategory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const displayText =
    categoryType === "articles"
      ? "All articles"
      : categoryType?.charAt(0).toUpperCase() + (categoryType?.slice(1) || "");

  return (
    <main className="mx-auto min-h-screen w-full px-6 py-12 md:px-12 lg:px-24">
      <div className="mb-16">
        <h1 className="font-sentient py-3 text-3xl tracking-tighter capitalize md:text-5xl">
          {displayText}
        </h1>
        <div className="bg-foreground mt-8 h-0.5 w-full md:mt-12" />
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex w-full items-center justify-center py-24">
          <h2 className="font-sentient text-muted-foreground text-3xl">
            No posts found in this category.
          </h2>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-12">
            <PostList posts={posts} />
          </div>

          {pagination && pagination.currentPage < pagination.totalPages && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={loadMore}
                disabled={loading}
                className="border-border hover:bg-accent rounded-md border px-6 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load more articles"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};
