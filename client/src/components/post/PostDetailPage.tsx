import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";

import AutoScroll from "embla-carousel-auto-scroll";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { PostCard } from "@/components/post/PostCard";
import { ReadOnlyEditor } from "@/components/post/ReadOnlyEditor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "@/lib/utils/utils";
import { useAuthStore } from "@/stores/authStore";
import { useBookmarkStore } from "@/stores/bookmarkStore";
import { usePostsStore } from "@/stores/postsStore";

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentPost,
    posts: allPosts,
    loading,
    error,
    fetchPostById,
    fetchPosts,
  } = usePostsStore();

  const loggedInUser = useAuthStore((state) => state.userData);
  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  const isOwnPost =
    loggedInUser?._id === currentPost?.author?._id ||
    loggedInUser?._id === currentPost?.author;

  const plugin = useRef(
    AutoScroll({
      speed: 0.5,
      startDelay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
  }, [id, fetchPostById]);

  useEffect(() => {
    if (currentPost?.category) {
      fetchPosts(1, currentPost.category, 6);
    }
  }, [currentPost?.category, fetchPosts]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading && !currentPost) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="font-sentient text-3xl">Post not found</h2>
        <Link to="/" className="text-emrald-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p._id !== currentPost._id);

  return (
    <main className="flex min-h-screen w-full flex-1 flex-col items-center justify-start gap-6 px-12 pt-8">
      <header className="mt-8 flex w-full max-w-3xl flex-col gap-8 border-t border-gray-200 py-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            {currentPost.category}
          </span>

          <div className="flex items-center gap-4">
            <time
              dateTime={currentPost.updatedAt}
              className="text-xs font-semibold tracking-widest text-gray-500 uppercase"
            >
              {formatDate(currentPost.updatedAt, "uppercase")}
            </time>
            {loggedInUser && !isOwnPost && (
              <button
                onClick={() => toggleBookmark(currentPost._id)}
                className={`transition-colors ${isBookmarked(currentPost._id) ? "text-emerald-600" : "text-gray-400 hover:text-gray-900"}`}
                title="Save Post"
              >
                <Bookmark
                  className="h-5 w-5"
                  fill={isBookmarked(currentPost._id) ? "currentColor" : "none"}
                />
              </button>
            )}
          </div>
        </div>

        <h1 className="font-sentient text-6xl leading-tight font-normal tracking-tight text-gray-900">
          {currentPost.title}
        </h1>

        {currentPost.summary && (
          <p className="font-sentient text-xl leading-relaxed text-gray-500 italic">
            {currentPost.summary}
          </p>
        )}
      </header>

      {currentPost.coverImage && (
        <img
          src={currentPost.coverImage}
          alt={`Cover image for ${currentPost.title}`}
          className="h-[600px] w-full max-w-6xl rounded-lg object-cover shadow-sm"
        />
      )}

      {/* Tiptap Content Area */}
      <article className="w-full max-w-3xl py-12">
        <ReadOnlyEditor content={currentPost.content} />
      </article>

      {/* Related Posts Carousel Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 flex w-screen flex-col gap-6 border-t border-gray-100 bg-gray-50/50 px-12 py-24">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-sentient mb-12 text-4xl font-normal tracking-tight text-gray-900">
              More Stories in {currentPost.category}
            </h2>

            <div className="mask-r-from-95% mask-l-from-95%">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {relatedPosts.map((relatedPost) => (
                    <CarouselItem
                      key={relatedPost._id}
                      className="pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <Link to={`/post/${relatedPost._id}`}>
                        <PostCard post={relatedPost} />
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
