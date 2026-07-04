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
import useCVInfo from "@/hooks/useCVInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TwoColumnProps {
  sidebar: SectionEntry[];
  main: SectionEntry[];
  sidebarWidth: string;
  sidebarBg?: string;
  sidebarTextColor?: string;
  orderedSidebarIds: string[];
  orderedMainIds: string[];
  onReorderSidebar: (newOrder: string[]) => void;
  onReorderMain: (newOrder: string[]) => void;
}

const SectionList = ({
  sections,
  orderedIds,
  onReorder,
}: {
  sections: SectionEntry[];
  orderedIds: string[];
  onReorder: (newOrder: string[]) => void;
}) => {
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

const TwoColumn = ({
  sidebar,
  main,
  sidebarWidth,
  sidebarBg = "",
  sidebarTextColor = "",
  orderedSidebarIds,
  orderedMainIds,
  onReorderSidebar,
  onReorderMain,
}: TwoColumnProps) => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleDeleteImage = () => {
    setCvInfo({ ...cvInfo, pictureUrl: "" });
  };

  return (
    <div className="w-full flex min-h-[100dvh]">
      <div
        className={`${sidebarBg} ${sidebarTextColor} p-12`}
        style={{ width: sidebarWidth }}
      >
        {cvInfo?.pictureUrl && (
          <figure className="w-[200px] mb-4">
            <img
              src={cvInfo.pictureUrl}
              alt="Profile"
              className="aspect-square w-full object-cover rounded-full"
            />
            <button
              onClick={handleDeleteImage}
              className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </figure>
        )}
        <div className="border-b-2 border-neutral-500 border-dashed mb-4">
          <SectionList
            sections={sidebar}
            orderedIds={orderedSidebarIds}
            onReorder={onReorderSidebar}
          />
        </div>
      </div>
      <div style={{ width: `calc(100% - ${sidebarWidth})` }} className="pt-12">
        <div className="bg-neutral-100 p-4">
          <SectionList
            sections={main.slice(0, 1)}
            orderedIds={orderedMainIds.slice(0, 1)}
            onReorder={(newOrder) =>
              onReorderMain([...newOrder, ...orderedMainIds.slice(1)])
            }
          />
        </div>
        <div className="p-12">
          <SectionList
            sections={main.slice(1)}
            orderedIds={orderedMainIds.slice(1)}
            onReorder={(newOrder) =>
              onReorderMain([orderedMainIds[0], ...newOrder])
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TwoColumn;
