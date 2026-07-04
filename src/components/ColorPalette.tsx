const ACCENT_COLORS = [
  { label: "Navy", value: "#1e3a5f" },
  { label: "Teal", value: "#0d9488" },
  { label: "Burgundy", value: "#881337" },
  { label: "Forest", value: "#166534" },
  { label: "Charcoal", value: "#374151" },
  { label: "Purple", value: "#6d28d9" },
  { label: "Coral", value: "#dc2626" },
  { label: "Slate", value: "#475569" },
];

interface ColorPaletteProps {
  accentColor: string;
  onSelect: (color: string) => void;
}

const ColorPalette = ({ accentColor, onSelect }: ColorPaletteProps) => {
  return (
    <div className="p-4">
      <p className="text-sm text-neutral-400 mb-2">Accent Color</p>
      <div className="flex flex-wrap gap-2">
        {ACCENT_COLORS.map(({ label, value }) => (
          <button
            key={value}
            title={label}
            onClick={() => onSelect(value)}
            className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              backgroundColor: value,
              borderColor: accentColor === value ? "#fff" : "transparent",
              outline: accentColor === value ? `2px solid ${value}` : "none",
            }}
            aria-label={`Select ${label} accent color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
