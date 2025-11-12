import * as React from "react";

interface CustomLogoProps {
  logoImage: string;
  onLogoChange: (image: string) => void;
  onLogoRemove: () => void;
}

export default function CustomLogo({
  logoImage,
  onLogoChange,
  onLogoRemove,
}: CustomLogoProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle logo file selection
  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          onLogoChange(result);
        }
      };
      reader.onerror = () => {
        alert("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="style-dropdown-wrapper">
      <div className="logo-controls-row">
        <label className="style-dropdown-external-label">Logo</label>
        <div className="logo-buttons-group">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoFileSelect}
            className="logo-file-input"
            id="logo-file-input"
          />
          <label htmlFor="logo-file-input" className="logo-upload-button">
            {logoImage ? "Change Logo" : "Add Logo"}
          </label>
          {logoImage && (
            <button
              className="logo-remove-button"
              onClick={removeLogo}
              type="button"
              title="Remove logo"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      {logoImage && (
        <div className="logo-preview-container">
          <img src={logoImage} alt="Logo preview" className="logo-preview" />
        </div>
      )}
    </div>
  );
}
