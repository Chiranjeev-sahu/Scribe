import { useParams } from "react-router";

import { PostList } from "@/components/post/PostList";
import { mockPosts, type Post } from "@/data/data";

export const CategoryPage = () => {
  const { categoryType } = useParams<{ categoryType: string }>();
  const posts: Post[] =
    categoryType === "articles"
      ? mockPosts
      : mockPosts.filter((post) => post.category === categoryType);

  let displayText: string;
  switch (categoryType) {
    case "articles":
      displayText = "All articles";
      break;
    case "culture":
      displayText = "Culture";
      break;
    case "people":
      displayText = "People";
      break;
    case "lifestyle":
      displayText = "Lifestyle";
      break;
    case "technology":
      displayText = "Technology";
      break;
    default:
      displayText = "404 Not Found";
  }

  return (
    <main className="m-5 h-full w-full px-24">
      <div className="my-8 flex max-h-24 items-center justify-start">
        <h1 className="font-sentient text-4xl font-normal">{displayText}</h1>
      </div>
      <div className="flex min-h-screen flex-1">
        <PostList posts={posts} />
      </div>
    </main>
  );
};
