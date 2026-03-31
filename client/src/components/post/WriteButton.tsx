import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router";

import { useDraftsStore } from "@/stores/draftsStore";

export const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={async () => {
        const id = await useDraftsStore.getState().createNewDraft();
        if (id) navigate(`/write/${id}`);
        console.log("Create draft clicked!");
      }}
      className="text-foreground group flex items-center gap-2"
    >
      <SquarePen className="h-4 w-4 font-medium transition-transform duration-500 ease-in-out group-hover:scale-110" />
      <span className="text-sm font-medium">Write</span>
    </button>
  );
};
