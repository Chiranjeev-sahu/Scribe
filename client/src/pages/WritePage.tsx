import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";

export function WritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("technology");
  const [content, setContent] = useState<any>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [title]);

  const handlePublish = async () => {
    if (!title) return;
    setIsPublishing(true);

    // TODO: Connect to backend API
    console.log({
      title,
      coverImage,
      category,
      content,
      status: "published",
    });

    await new Promise((r) => setTimeout(r, 1000));
    setIsPublishing(false);
    navigate("/");
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Top Navigation Bar */}
      <nav className="bg-background/95 sticky top-0 z-50 flex items-center justify-between border-b px-6 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="text-muted-foreground h-5 w-5" />
            </Button>
          </Link>
          <span className="text-muted-foreground text-sm font-medium">
            Drafting in {category}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-secondary-foreground hover:bg-secondary bg-secondary/50 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none"
          >
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="culture">Culture</option>
            <option value="people">People</option>
          </select>

          <Button
            onClick={handlePublish}
            disabled={isPublishing || !title || !content}
          >
            {isPublishing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Publish
          </Button>
        </div>
      </nav>

      <div className="mx-auto mt-10 max-w-3xl px-6">
        <div className="group relative mb-8">
          {!coverImage ? (
            <Button
              variant="outline"
              size="xs"
              className="text-muted-foreground hover:text-foreground gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-3.5 w-3.5" />
              Add cover image
            </Button>
          ) : (
            <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg border">
              <img
                src={coverImage}
                alt="Cover"
                className="h-full max-h-28 w-full object-cover"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-4 right-4 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => {
                  setCoverImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Title Input */}
        <div className="mb-8">
          <textarea
            ref={textareaRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title..."
            rows={1}
            className="font-sentient placeholder:text-muted-foreground/50 w-full resize-none overflow-hidden bg-transparent text-4xl leading-tight font-bold tracking-tight focus:outline-none"
          />
        </div>
      </div>

      {/* The Editor — untouched, original width */}
      <main className="mt-10 w-svw">
        <div className="min-h-[400px]">
          <SimpleEditor onUpdate={setContent} />
        </div>
      </main>
    </div>
  );
}
