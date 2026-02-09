import { useRef } from "react";
import { Link, useParams } from "react-router";

import AutoScroll from "embla-carousel-auto-scroll";

import { PostCard } from "@/components/post/PostCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { mockPosts } from "@/data/data";
import { formatDate } from "@/lib/utils/utils";

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find((post) => post.id === Number(id));

  const plugin = useRef(
    AutoScroll({
      speed: 0.5,
      startDelay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts = mockPosts.filter(
    (p) => p.category === post.category && p.id !== post.id
  );

  return (
    <main className="flex min-h-screen w-full flex-1 flex-col items-center justify-start gap-6 px-12 pt-8">
      <header className="flex w-full max-w-2xl flex-col gap-8 border-t border-gray-200 py-2">
        <div className="flex w-full items-center justify-between">
          <span className="text-xs tracking-wider text-gray-600 uppercase">
            {post.category}
          </span>

          <time
            dateTime={post.date}
            className="text-xs tracking-wider text-gray-600 uppercase"
          >
            {formatDate(post.date, "uppercase")}
          </time>
        </div>

        <h1 className="font-sentient text-5xl leading-tight font-normal tracking-tight text-gray-900">
          {post.title}
        </h1>

        <p className="font-sentient text-base leading-relaxed text-gray-500">
          {post.summary}
        </p>
      </header>

      <img
        src={post.coverImage}
        alt={`Cover image for ${post.title}`}
        className="h-[786px] w-full max-w-7xl rounded-sm object-cover"
      />

      <article className="flex w-full max-w-2xl flex-col gap-8 py-8">
        <p className="font-sentient text-lg leading-relaxed text-gray-700">
          {post.content.introduction}
        </p>
        {post.content.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h2 className="font-sentient text-2xl font-semibold text-gray-900">
              {section.heading}
            </h2>
            <p className="font-sentient text-base leading-relaxed text-gray-600">
              {section.body}
            </p>
          </div>
        ))}
      </article>

      {/* Related Posts Carousel Section */}
      {relatedPosts.length > 0 && (
        <section className="flex w-screen flex-col gap-6 bg-gray-50 px-12 py-16">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="font-sentient mb-8 text-3xl font-semibold text-gray-900">
              More in {post.category}
            </h2>

            <div className="mask-r-from-90% mask-l-from-90%">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {relatedPosts.map((relatedPost) => (
                    <CarouselItem
                      key={relatedPost.id}
                      className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                    >
                      <Link to={`/post/${relatedPost.id}`}>
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
