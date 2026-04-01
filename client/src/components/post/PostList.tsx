import { Link } from "react-router";

import { DeletePostDialog } from "./DeletePostDialog";
import { PostCard } from "./PostCard";

type PostListProps = {
  posts: any[];
  layout?: "grid" | "stack";
  linkPrefix?: string;
  onDelete?: (postId: string) => void;
};

export const PostList = ({
  posts,
  layout = "grid",
  linkPrefix = "/post",
  onDelete,
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
        <div key={post._id} className="group relative">
          <Link
            to={`${linkPrefix}/${post._id}`}
            className="block transition-opacity hover:opacity-90"
          >
            <PostCard
              variant={layout === "grid" ? "default" : "horizontal"}
              post={post}
            />
          </Link>
          {onDelete && (
            <div className="absolute bottom-2 left-2 opacity-0 transition-opacity group-hover:opacity-100">
              <DeletePostDialog
                postId={post._id}
                postTitle={post.title}
                onSuccess={() => onDelete(post._id)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
