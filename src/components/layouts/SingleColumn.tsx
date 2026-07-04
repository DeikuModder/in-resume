import { SectionEntry } from "@/templates/types";
import { sectionComponents } from "@/templates/sections";
import SectionSortable from "@/components/SectionSortable";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

interface SingleColumnProps {
  sections: SectionEntry[];
  orderedIds: string[];
  onReorder: (newOrder: string[]) => void;
}

const SingleColumn = ({ sections, orderedIds, onReorder }: SingleColumnProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = orderedIds.indexOf(active.id as string);
      const newIndex = orderedIds.indexOf(over.id as string);
      onReorder(arrayMove(orderedIds, oldIndex, newIndex));
    }
  };

  const orderedSections = orderedIds
    .map((id) => sections.find((s) => s.id === id))
    .filter(Boolean) as SectionEntry[];

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
        {orderedSections.map((entry) => {
          const Component = sectionComponents[entry.id];
          if (!Component) return null;
          return (
            <SectionSortable key={entry.id} id={entry.id}>
              <Component {...entry.props} />
            </SectionSortable>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default SingleColumn;
