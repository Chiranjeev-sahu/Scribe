import { useState } from "react";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export function WritePage() {
  const [content, setContent] = useState<any>(null);

  return (
    <div>
      <SimpleEditor onUpdate={setContent} />

      <button onClick={() => console.log(content)}>Save Post</button>
    </div>
  );
}
