import { type Post } from "@/data/data";
import { formatDate } from "@/lib/utils/utils";

type PostCardProps = {
  post: Post;
};
export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="divide-chart-2 flex flex-col divide-y overflow-hidden">
      <div className="overflow-hidden pb-6">
        <img
          src={post.coverImage}
          alt={`Cover image for ${post.title}`}
          className="aspect-3/2 h-2/3 w-full rounded-sm object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-between gap-1 pb-7">
        <div className="flex w-full items-center justify-between pt-2 pb-4 font-sans">
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

        <div className="flex flex-col justify-baseline gap-2 text-start">
          <h2 className="font-sentient text-md overflow-clip">{post.title}</h2>
          <p className="font-sentient overflow-clip text-[13px] font-normal text-gray-400">
            {post.summary}
          </p>
        </div>
      </div>
    </article>
  );
};
