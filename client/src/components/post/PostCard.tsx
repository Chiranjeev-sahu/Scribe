import { cva } from "class-variance-authority";

import { formatDate } from "@/lib/utils/utils";
import { type PostSummary } from "@/stores/postsStore";

type PostCardProps =
  | {
      variant?: "default";
      post: PostSummary;
    }
  | {
      variant: "horizontal";
      post: Omit<PostSummary, "author">;
    };

const cardContainerVariants = cva(
  "flex overflow-hidden transition-all hover:shadow-sm",
  {
    variants: {
      variant: {
        default: "flex-col divide-y divide-chart-2 h-full",
        horizontal:
          "flex-row-reverse items-start justify-between h-80 gap-6 border rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const PostCard = ({ variant = "default", post }: PostCardProps) => {
  return (
    <article className={cardContainerVariants({ variant })}>
      <div
        className={`overflow-hidden ${variant === "default" ? "aspect-16/13 w-full pb-6" : "h-full w-1/2 shrink-0"}`}
      >
        <img
          src={
            post.coverImage ||
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
          }
          alt={`Cover image for ${post.title}`}
          className="h-full w-full rounded-sm object-cover"
        />
      </div>

      <div
        className={`flex w-full flex-col items-start justify-between gap-1 pb-7 ${variant === "default" ? "px-4" : "flex-1 p-6"}`}
      >
        <div
          className={`flex w-full justify-between py-4 font-sans ${variant === "default" ? "items-center" : "items-start"}`}
        >
          {" "}
          <span className="text-xs tracking-wider text-gray-600 uppercase">
            {post.category}
          </span>
          <time
            dateTime={post.updatedAt}
            className="text-xs tracking-wider text-gray-600 uppercase"
          >
            {formatDate(post.updatedAt, "uppercase")}
          </time>
        </div>

        <div className="flex w-full flex-col justify-baseline gap-2 text-start">
          <h2 className="font-sentient text-md overflow-clip">{post.title}</h2>

          <p
            className={`font-sentient text-[13px] font-normal text-gray-400 ${variant === "horizontal" ? "line-clamp-2" : "overflow-clip"}`}
          >
            {post.summary}
          </p>
        </div>
      </div>
    </article>
  );
};
