import { Link } from "react-router";

import { type PostSummary } from "@/stores/postsStore";

import { PostCard } from "./PostCard";

type PostListProps = {
  posts: PostSummary[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid flex-1 grid-cols-3 gap-5">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} key={`${post._id}`}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
};
