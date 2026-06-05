import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostCard } from "@/components/post/PostCard";

const defaultPost = {
  _id: "1",
  title: "Test Blog Post",
  summary: "This is a summary of the blog post",
  category: "Technology",
  coverImage: "https://example.com/image.jpg",
  author: { _id: "u1", username: "author1" },
  updatedAt: "2024-01-15T00:00:00Z",
};

describe("PostCard", () => {
  it("renders the post title", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });

  it("renders the post summary", () => {
    render(<PostCard post={defaultPost} />);
    expect(
      screen.getByText("This is a summary of the blog post")
    ).toBeInTheDocument();
  });

  it("renders the category", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("renders the date in uppercase format", () => {
    render(<PostCard post={defaultPost} />);
    expect(screen.getByText("JAN 15, 2024")).toBeInTheDocument();
  });

  it("uses a fallback cover image when none is provided", () => {
    const postWithoutCover = { ...defaultPost, coverImage: undefined };
    render(<PostCard post={postWithoutCover} />);
    const img = screen.getByAltText("Cover image for Test Blog Post");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("images.unsplash.com");
  });

  it("renders horizontal variant without author requirement", () => {
    const { author, ...postWithoutAuthor } = defaultPost;
    render(<PostCard variant="horizontal" post={postWithoutAuthor} />);
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });
});
