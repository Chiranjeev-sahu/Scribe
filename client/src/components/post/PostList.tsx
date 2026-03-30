import { Link } from "react-router";

import { PostCard } from "./PostCard";

type PostListProps = {
  posts: any[]; // Accept any posts (Drafts or Published)
  layout?: "grid" | "stack";
  linkPrefix?: string;
};

export const PostList = ({
  posts,
  layout = "grid",
  linkPrefix = "/post",
}: PostListProps) => {
  return (
    <div
      className={
        layout === "grid"
          ? "grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          : "flex flex-col gap-4"
      }
    >
      {posts.map((post) => (
        <Link
          to={`${linkPrefix}/${post._id}`}
          key={`${post._id}`}
          className="transition-opacity hover:opacity-90"
        >
          <PostCard
            variant={layout === "grid" ? "default" : "horizontal"}
            post={post}
          />
        </Link>
      ))}
    </div>
  );
};
