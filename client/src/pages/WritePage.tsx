import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { handleImageUpload as uploadToCloudinary } from "@/lib/tiptap-utils";
import { useEditorStore } from "@/stores/editorStore";
import { usePostsStore } from "@/stores/postsStore";

export function WritePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPostById } = usePostsStore();

  const {
    title,
    content,
    coverImage,
    category,
    isLoading,
    loadError,
    isPublishing,
    isDirty,
    setTitle,
    setContent,
    setCoverImage,
    setCategory,
    loadDraft,
    saveDraft,
    publish,
    resetEditor,
  } = useEditorStore();

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (id) loadDraft(id);

    return () => resetEditor();
  }, [id, loadDraft, resetEditor]);

  useEffect(() => {
    if (!isDirty) return;

    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isDirty, title, content, coverImage, category, saveDraft]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [title]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingImage(true);
      try {
        const url = await uploadToCloudinary(file);
        setCoverImage(url);
      } catch (error) {
        console.error("Failed to upload cover image:", error);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handlePublish = async () => {
    const published = await publish();

    if (published) {
      const postId = published._id || id;
      fetchPostById(postId!);
      navigate(`/post/${postId}`, { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-chart-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
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
            onChange={(e) => setCategory(e.target.value as any)}
            className="text-secondary-foreground hover:bg-secondary bg-secondary/50 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none"
          >
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="culture">Culture</option>
            <option value="people">People</option>
          </select>

          <Button
            onClick={handlePublish}
            disabled={
              isPublishing || isUploadingImage || !title.trim() || !content
            }
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
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ImagePlus className="h-3.5 w-3.5" />
              )}
              {isUploadingImage ? "Uploading..." : "Add cover image"}
            </Button>
          ) : (
            <div className="bg-muted relative h-full max-h-[280px] overflow-hidden rounded-sm border">
              <img
                src={coverImage}
                alt="Cover"
                className="h-full w-full object-cover"
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

        <div className="mb-8">
          <textarea
            ref={textareaRef}
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title..."
            rows={1}
            className="font-sentient placeholder:text-muted-foreground/50 w-full resize-none overflow-hidden bg-transparent text-4xl leading-tight font-bold tracking-tight focus:outline-none"
          />
        </div>
      </div>

      <main className="mt-10 w-svw">
        <div className="min-h-[400px]">
          <SimpleEditor
            key={id}
            initialContent={content}
            onUpdate={setContent}
          />
        </div>
      </main>
    </div>
  );
}
