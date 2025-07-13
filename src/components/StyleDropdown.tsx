import * as React from "react";

export interface StyleOption {
  value: string;
  label: string;
  preview: React.ReactNode;
}

interface StyleDropdownProps {
  options: StyleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function StyleDropdown({
  options,
  value,
  onChange,
  className = "",
  style,
}: StyleDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      className={`style-dropdown ${className}`}
      style={{ position: "relative", ...style }}
    >
      <button
        ref={buttonRef}
        className="style-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="style-dropdown-preview">{selected.preview}</span>
        <span className="style-dropdown-label">{selected.label}</span>
        <span className="style-dropdown-arrow">▾</span>
      </button>
      {open && (
        <div
          ref={popoverRef}
          className="style-dropdown-popover"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`style-dropdown-option${
                opt.value === value ? " selected" : ""
              }`}
              role="option"
              aria-selected={opt.value === value}
              tabIndex={0}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              <span className="style-dropdown-preview">{opt.preview}</span>
              <span className="style-dropdown-label">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
