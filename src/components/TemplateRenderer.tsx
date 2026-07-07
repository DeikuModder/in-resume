import useCVInfo from "@/hooks/useCVInfo";
import { getTemplate } from "@/templates/index";
import SingleColumn from "./layouts/SingleColumn";
import TwoColumn from "./layouts/TwoColumn";

interface TemplateRendererProps {
  templateId: string;
  sectionOrder: string[];
  sidebarOrder: string[];
  accentColor: string;
  onReorderMain: (newOrder: string[]) => void;
  onReorderSidebar: (newOrder: string[]) => void;
}

const TemplateRenderer = ({
  templateId,
  sectionOrder,
  sidebarOrder,
  accentColor,
  onReorderMain,
  onReorderSidebar,
}: TemplateRendererProps) => {
  useCVInfo(); // ensure context is available
  const config = getTemplate(templateId);

  const wrapperStyle = {
    "--accent": accentColor,
  } as React.CSSProperties;

  if (config.layout === "two-column") {
    return (
      <div
        data-resume-ready
        className={`${config.styles.pageWidth} ${config.styles.font}`}
        style={wrapperStyle}
      >
        <TwoColumn
          sidebar={config.sidebar ?? []}
          main={config.main}
          sidebarWidth={config.sidebarWidth ?? "35%"}
          sidebarBg={config.sidebarBg}
          sidebarTextColor={config.sidebarTextColor}
          orderedSidebarIds={sidebarOrder}
          orderedMainIds={sectionOrder}
          onReorderSidebar={onReorderSidebar}
          onReorderMain={onReorderMain}
        />
      </div>
    );
  }

  return (
    <div
      data-resume-ready
      className={`${config.styles.pageWidth} ${config.styles.spacing} ${config.styles.font}`}
      style={wrapperStyle}
    >
      <SingleColumn
        sections={config.main}
        orderedIds={sectionOrder}
        onReorder={onReorderMain}
      />
    </div>
  );
};

export default TemplateRenderer;
