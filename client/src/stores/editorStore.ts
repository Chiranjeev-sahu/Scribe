/**
 * ═══════════════════════════════════════════════════════════════
 *  EDITOR STORE — Design Notes & Tips
 * ═══════════════════════════════════════════════════════════════
 *
 *  PURPOSE:
 *    Manages the state of a SINGLE draft being actively edited
 *    on the WritePage. Title, content, cover image, category,
 *    and the auto-save lifecycle.
 *
 *  DESIGN TIPS:
 *
 *  1. This is NOT a list store. It tracks ONE document at a time.
 *     When the user navigates to /write/:id, loadDraft() populates it.
 *     When they leave, resetEditor() clears everything.
 *
 *  2. The `isDirty` flag is your auto-save trigger.
 *     Every setter (setTitle, setContent, etc.) should flip isDirty = true.
 *     A debounced useEffect in WritePage watches isDirty and calls saveDraft().
 *     After saveDraft succeeds, isDirty = false. Simple cycle.
 *
 *  3. Don't saveDraft() inside the store's setters.
 *     The store should just track state. The COMPONENT (WritePage) decides
 *     WHEN to save using a debounced effect. Separation of concerns:
 *       - Store = "what is the current state?"
 *       - Component = "when should side effects fire?"
 *
 *  4. Optimistic vs. pessimistic saves:
 *     Auto-save should be "fire and forget" — update the UI immediately,
 *     send the PATCH in the background. If it fails, show a toast but
 *     don't roll back. The user's local state is always ahead of the server.
 *
 *  5. resetEditor() is CRITICAL.
 *     If you forget to call it when navigating away, the old draft's data
 *     will bleed into the next draft the user opens. Call it in a cleanup
 *     function: useEffect(() => { loadDraft(id); return () => resetEditor(); }, [id])
 *
 *  6. DO NOT persist this store.
 *     Draft data lives on the server. If the user refreshes, loadDraft()
 *     fetches it fresh. Persisting TipTap JSON to localStorage is fragile
 *     and can cause desync bugs.
 *
 * ═══════════════════════════════════════════════════════════════
 */
import { create } from "zustand";

// ── Types ──────────────────────────────────────────────────────

type Category = "Technology" | "People" | "Culture" | "Lifestyle";

// TipTap's JSON format — keep this generic
type JSONContent = Record<string, unknown>;

interface EditorState {
  postId: string | null;
  title: string;
  content: JSONContent | null;
  coverImage: string | null;
  category: Category;
  summary: string;
  status: "draft" | "published";

  // Save lifecycle
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  saveError: string | null;

  // Publish lifecycle
  isPublishing: boolean;
  publishError: string | null;

  // Initial load
  isLoading: boolean;
  loadError: string | null;
}

interface EditorActions {
  loadDraft: (id: string) => Promise<void>;
  setTitle: (title: string) => void;
  setContent: (content: JSONContent) => void;
  setCoverImage: (url: string | null) => void;
  setCategory: (category: Category) => void;
  setSummary: (summary: string) => void;
  saveDraft: () => Promise<void>;
  publish: () => Promise<boolean>;
  resetEditor: () => void;
}

// ── Initial State (extracted so resetEditor can reuse it) ─────

const initialState: EditorState = {
  postId: null,
  title: "",
  content: null,
  coverImage: null,
  category: "Technology",
  summary: "",
  status: "draft",

  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  saveError: null,

  isPublishing: false,
  publishError: null,

  isLoading: false,
  loadError: null,
};

// ── Store ──────────────────────────────────────────────────────

export const useEditorStore = create<EditorState & EditorActions>()(
  (set, get) => ({
    ...initialState,

    // ── Actions ──

    loadDraft: async (id) => {
      //  * TODO: Implement loadDraft
      //  *
      //  * 1. Call resetEditor() first to clear any previous draft state
      //  * 2. Set isLoading = true, postId = id
      //  * 3. Make a GET request to `/posts/${id}`
      //  *    - This fetches the full draft data from the server
      //  * 4. On SUCCESS:
      //  *    - Destructure: { title, content, coverImage, category, summary, status }
      //  *    - Set all fields from the response
      //  *    - Set isLoading = false, isDirty = false
      //  * 5. On FAILURE:
      //  *    - Set loadError with the error message, isLoading = false
      //  *
      //  * THINK ABOUT:
      //  *  - What if the user doesn't own this draft? The backend returns 403.
      //  *    How should the UI handle that? (Redirect? Error message?)
      //  *  - What if the post is published, not a draft? Should you still
      //  *    allow editing?
    },

    setTitle: (title) => {
      /**
       * TODO: Implement setTitle
       *
       * 1. set({ title, isDirty: true })
       *
       * That's it. The WritePage's debounced useEffect will handle saving.
       */
    },

    setContent: (content) => {
      /**
       * TODO: Implement setContent
       *
       * 1. set({ content, isDirty: true })
       *
       * This is called by TipTap's onUpdate callback.
       * The content is TipTap's JSON serialization of the document.
       */
    },

    setCoverImage: (url) => {
      /**
       * TODO: Implement setCoverImage
       *
       * 1. set({ coverImage: url, isDirty: true })
       *
       * The URL comes from your Cloudinary upload. The WritePage handles
       * the upload itself, then passes the URL here.
       */
    },

    setCategory: (category) => {
      /**
       * TODO: Implement setCategory
       *
       * 1. set({ category, isDirty: true })
       */
    },

    setSummary: (summary) => {
      /**
       * TODO: Implement setSummary
       *
       * 1. set({ summary })
       * 2. Note: Don't set isDirty here — summary is set right before
       *    publishing, not during the auto-save cycle.
       *
       * THINK ABOUT:
       *  - Or SHOULD you auto-save the summary too? What if the user
       *    fills it in and then their browser crashes before they publish?
       */
    },

    saveDraft: async () => {
      /**
       * TODO: Implement saveDraft (the auto-save workhorse)
       *
       * 1. Guard clause: if !isDirty or !postId or isSaving, return early
       * 2. Set isSaving = true, saveError = null
       * 3. Build the payload object with only the fields you want to send:
       *    { title, content, coverImage, category }
       *    - Get these from get() (current state)
       * 4. Make a PATCH request to `/posts/${postId}` with the payload
       * 5. On SUCCESS:
       *    - Set isSaving = false, isDirty = false, lastSavedAt = new Date()
       * 6. On FAILURE:
       *    - Set isSaving = false, saveError = error message
       *    - DO NOT set isDirty = false (the data still needs saving!)
       *
       * THINK ABOUT:
       *  - Should you send ALL fields every time, or only the ones that changed?
       *    Sending all is simpler. Tracking changes per-field is more efficient.
       *    For a blog editor, sending all is fine — the payload is small.
       *  - What if saveDraft fires while a previous save is still in-flight?
       *    That's why the guard checks `isSaving`.
       */
    },

    publish: async () => {
      /**
       * TODO: Implement publish
       *
       * 1. Guard clause: if !postId, return false
       * 2. Set isPublishing = true, publishError = null
       * 3. Build the publish payload:
       *    { title, summary, category, coverImage, content }
       *    - Get these from get()
       * 4. Validate locally before sending:
       *    - title must not be empty or "Untitled"
       *    - content must not be null or empty
       *    - category must be set
       *    If validation fails, set publishError and return false
       * 5. Make a PATCH request to `/posts/${postId}/publish` with the payload
       * 6. On SUCCESS:
       *    - Set isPublishing = false, status = "published"
       *    - Return true (so WritePage can navigate to the published post)
       * 7. On FAILURE:
       *    - Set isPublishing = false, publishError = error message
       *    - Return false
       *
       * THINK ABOUT:
       *  - Should you saveDraft() before publishing? What if there are
       *    unsaved changes?
       *  - After publishing, should you resetEditor()? Or let the
       *    navigation trigger the cleanup?
       */
      return false; // placeholder
    },

    resetEditor: () => {
      /**
       * TODO: Implement resetEditor
       *
       * 1. set(initialState)
       *
       * That's it! The `initialState` object above has all the defaults.
       * This is why we extracted it — so reset is a one-liner.
       *
       * WHEN TO CALL:
       *  - In the WritePage cleanup: useEffect return function
       *  - At the start of loadDraft (before loading new data)
       *  - When the user logs out (from authStore's logout action)
       */
    },
  })
);
