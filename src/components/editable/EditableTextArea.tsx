import { useEffect, useRef, ClipboardEvent } from "react";

interface EditableTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const EditableTextArea = ({
  value,
  onChange,
  placeholder = "Click to edit…",
  className = "",
}: EditableTextAreaProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Sync external value changes to DOM only when not focused
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

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    document.execCommand("insertText", false, text);
  };

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={`editable-text whitespace-pre-wrap ${className}`}
      style={{ display: "block" }}
      onBlur={handleBlur}
      onPaste={handlePaste}
    />
  );
};

export default EditableTextArea;
