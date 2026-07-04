import { TemplateConfig } from "./types";
import { templateRegistry } from "./registry";

export { templateRegistry };
export type { TemplateConfig };
export type { SectionId, SectionConfig, SectionEntry, TemplateStyles } from "./types";

export function getTemplate(id: string): TemplateConfig {
  const found = templateRegistry.find((t) => t.id === id);
  if (!found) {
    return templateRegistry[0];
  }
  return found;
}

export function getAllTemplates(): TemplateConfig[] {
  return templateRegistry;
}

export function getTemplatesByTier(tier: "free" | "premium"): TemplateConfig[] {
  return templateRegistry.filter((t) =>
    tier === "premium" ? t.premium : !t.premium
  );
}
