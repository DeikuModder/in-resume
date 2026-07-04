import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SectionSortableProps {
  id: string;
  children: React.ReactNode;
}

const SectionSortable = ({ id, children }: SectionSortableProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        className="hideOnPrint absolute left-[-24px] top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing px-1 py-2 opacity-0 hover:opacity-40 transition-opacity group-hover:opacity-40 select-none"
        aria-label="Drag to reorder section"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="11" cy="4" r="1.5" />
          <circle cx="5" cy="8" r="1.5" />
          <circle cx="11" cy="8" r="1.5" />
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="11" cy="12" r="1.5" />
        </svg>
      </div>
      <div className="group relative">{children}</div>
    </div>
  );
};

export default SectionSortable;
