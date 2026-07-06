import { useEffect, useRef, KeyboardEvent, ClipboardEvent } from "react";

type EditableTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  tag?: EditableTag;
  className?: string;
  /** Prevent Enter key (default: true — single line) */
  singleLine?: boolean;
}

const EditableText = ({
  value,
  onChange,
  placeholder = "Click to edit…",
  tag = "span",
  className = "",
  singleLine = true,
}: EditableTextProps) => {
  const ref = useRef<HTMLElement>(null);

  // Sync external value changes to DOM only when this element is not focused
  useEffect(() => {
    if (!ref.current) return;
    if (document.activeElement === ref.current) return;
    if (ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  const handleBlur = () => {
    const text = ref.current?.textContent?.trim() ?? "";
    onChange(text);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (singleLine && e.key === "Enter") {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    document.execCommand("insertText", false, text);
  };

  const Tag = tag as any; // dynamic tag

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={`editable-text ${className}`}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
    />
  );
};

export default EditableText;
