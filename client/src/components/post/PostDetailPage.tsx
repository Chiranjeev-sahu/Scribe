import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";

import AutoScroll from "embla-carousel-auto-scroll";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { DeletePostDialog } from "@/components/post/DeletePostDialog";
import { PostCard } from "@/components/post/PostCard";
import { ReadOnlyEditor } from "@/components/post/ReadOnlyEditor";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
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
  const navigate = useNavigate();
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
      fetchPosts(1, currentPost.category, 10);
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
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <Spinner />
        </div>
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
    <main className="relative flex min-h-screen w-full flex-1 flex-col items-center justify-start gap-6 overflow-x-hidden px-6 pt-8 md:px-8 lg:px-12">
      <div className="absolute top-4 right-6 z-50 flex items-center gap-4 md:top-8 md:right-12">
        {!isOwnPost &&
          currentPost.author &&
          typeof currentPost.author !== "string" && (
            <Link
              to={`/profile/${currentPost.author.username}`}
              className="border-accent hover:bg-accent dark:border-accent flex items-center gap-2 rounded-full border px-3 py-1 transition-colors"
            >
              <img
                src={
                  currentPost.author.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentPost.author.username}`
                }
                alt={currentPost.author.username}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {currentPost.author.username}
              </span>
            </Link>
          )}
        <ThemeToggle />
      </div>

      <header className="border-border mt-8 flex w-full max-w-3xl flex-col gap-8 border-t py-4 dark:border-gray-800">
        <div className="flex w-full items-center justify-between">
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            {currentPost.category}
          </span>

          <div className="flex items-center gap-4">
            <time
              dateTime={currentPost.updatedAt}
              className="text-muted-foreground text-xs font-semibold tracking-widest uppercase"
            >
              {formatDate(currentPost.updatedAt, "uppercase")}
            </time>
            {loggedInUser && !isOwnPost && (
              <button
                onClick={() => toggleBookmark(currentPost._id)}
                className={`transition-colors ${isBookmarked(currentPost._id) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                title="Save Post"
              >
                <Bookmark
                  className="h-5 w-5"
                  fill={isBookmarked(currentPost._id) ? "currentColor" : "none"}
                />
              </button>
            )}
            {isOwnPost && (
              <DeletePostDialog
                postId={currentPost._id}
                postTitle={currentPost.title}
                onSuccess={() => navigate(-1)}
              />
            )}
          </div>
        </div>

        <h1 className="font-sentient text-foreground text-3xl leading-tight font-normal tracking-tight md:text-4xl lg:text-6xl">
          {currentPost.title}
        </h1>

        {currentPost.summary && (
          <p className="font-sentient text-muted-foreground text-xl leading-relaxed italic">
            {currentPost.summary}
          </p>
        )}
      </header>

      {currentPost.coverImage && (
        <img
          src={currentPost.coverImage}
          alt={`Cover image for ${currentPost.title}`}
          className="h-[300px] w-full max-w-6xl rounded-lg object-cover shadow-sm md:h-[450px] lg:h-[600px]"
        />
      )}

      <article className="w-full max-w-3xl py-12">
        <ReadOnlyEditor content={currentPost.content} />
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-accent bg-muted/50 mt-20 flex w-screen flex-col gap-6 border-t px-6 py-12 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="font-sentient text-foreground mb-8 text-2xl font-normal tracking-tight md:mb-12 md:text-4xl">
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
