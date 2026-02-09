import { Link } from "react-router";

import { type Post } from "@/data/data";

import { PostCard } from "./PostCard";

type PostListProps = {
  posts: Post[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid flex-1 grid-cols-3 gap-5">
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={`${post.id}`}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
};
