import { Link } from "react-router";

import { PostCard } from "@/components/post/PostCard";
import { mockPosts } from "@/data/data";

export const Homepage = () => {
  const featuredPosts = mockPosts.slice(0, 2);
  const recentPosts = mockPosts.slice(2, 7); // Posts 2-7

  return (
    <main className="min-h-screen px-24 py-12">
      <div className="mb-16">
        <h1 className="font-sentient max-w-3xl py-3 text-5xl tracking-tighter">
          Welcome to Scribe, we write about technology, people and culture.
        </h1>
        <div className="bg-foreground mt-12 h-0.5 w-full" />
      </div>

      <div className="flex gap-9">
        <section className="mt-5 mb-16 w-1/2">
          <h2 className="font-sentient mb-8 text-3xl">Featured Article</h2>
          <div className="grid flex-1 grid-cols-1 gap-5">
            {featuredPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={`${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-5 mb-16 flex w-1/2 flex-col">
          <h2 className="font-sentient mb-8 text-3xl">Recent Posts</h2>
          <div className="grid min-h-screen grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <Link to={`/post/${post.id}`} key={`${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
