import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import BottomSection from "./components/BottomSection";
import StyleDropdown, { StyleOption } from "./components/StyleDropdown";
import CustomLogo from "./components/CustomLogo";
// @ts-ignore
import QRCodeStyling from "qr-code-styling";

declare function require(path: string): any;

// SVG previews for each style
const stylePreviews: Record<string, React.ReactNode> = {
  square: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" />
    </svg>
  ),
  dot: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" fill="currentColor" />
    </svg>
  ),
  "extra-rounded": (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="6" fill="currentColor" />
    </svg>
  ),
  circle: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
    </svg>
  ),
  rounded: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor" />
    </svg>
  ),
  classy: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="4" fill="currentColor" />
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  "classy-rounded": (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="6" fill="currentColor" />
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  dots: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <g fill="currentColor">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <circle cx="8" cy="16" r="3" />
        <circle cx="16" cy="16" r="3" />
      </g>
    </svg>
  ),
};

// Supported options for qr-code-styling
const cornerOptions: StyleOption[] = [
  { value: "square", label: "Square Corners", preview: stylePreviews.square },
  { value: "dot", label: "Dot Corners", preview: stylePreviews.dot },
  {
    value: "rounded",
    label: "Rounded Corners",
    preview: stylePreviews.rounded,
  },
  {
    value: "extra-rounded",
    label: "Squircle Corners",
    preview: stylePreviews["extra-rounded"],
  },
  // { value: "circle", label: "Circle Corners", preview: stylePreviews.circle },

  { value: "classy", label: "Classy Corners", preview: stylePreviews.classy },
  {
    value: "classy-rounded",
    label: "Classy Rounded Corners",
    preview: stylePreviews["classy-rounded"],
  },
];
const centerOptions: StyleOption[] = [
  { value: "square", label: "Square Center", preview: stylePreviews.square },
  { value: "dot", label: "Dot Center", preview: stylePreviews.dot },
];
const cellOptions: StyleOption[] = [
  { value: "square", label: "Square Cells", preview: stylePreviews.square },
  { value: "dots", label: "Dots Cells", preview: stylePreviews.dots },
  { value: "rounded", label: "Rounded Cells", preview: stylePreviews.rounded },
  {
    value: "extra-rounded",
    label: "Squircle Cells",
    preview: stylePreviews["extra-rounded"],
  },
  { value: "classy", label: "Classy Cells", preview: stylePreviews.classy },
  {
    value: "classy-rounded",
    label: "Classy Rounded Cells",
    preview: stylePreviews["classy-rounded"],
  },
  // { value: "circle", label: "Circle Cells", preview: stylePreviews.circle },
];

function App() {
  // Set default values to valid options
  const [inputString, setInputString] = React.useState("");
  const [qrColor, setQrColor] = React.useState("#000000");
  const [cornerColor, setCornerColor] = React.useState("#000000");
  const [centerColor, setCenterColor] = React.useState("#000000");
  const [cellColor, setCellColor] = React.useState("#000000");
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [cornerStyle, setCornerStyle] = React.useState("square"); // cornersSquareOptions
  const [centerStyle, setCenterStyle] = React.useState("square"); // cornersDotOptions
  const [cellStyle, setCellStyle] = React.useState("square"); // dotsOptions
  const [logoImage, setLogoImage] = React.useState<string>(""); // Base64 image string for logo

  const previewRef = React.useRef<any>(null);

  // --- QR code preview: mount-once and update-only pattern ---
  React.useEffect(() => {
    if (!previewRef.current) {
      previewRef.current = new QRCodeStyling({
        width: 160,
        height: 160,
        data: inputString || "https://abhijitchirde.com ",
        image: logoImage,
        dotsOptions: {
          color: cellColor,
          type:
            cellOptions.find((opt) => opt.value === cellStyle)?.value ||
            "square",
        },
        cornersSquareOptions: {
          color: cornerColor,
          type:
            cornerOptions.find((opt) => opt.value === cornerStyle)?.value ||
            "square",
        },
        cornersDotOptions: {
          color: centerColor,
          type:
            centerOptions.find((opt) => opt.value === centerStyle)?.value ||
            "square",
        },
        backgroundOptions: {
          color: bgColor,
        },
      });
      const previewArea = document.getElementById("qr-preview-area");
      if (previewArea) {
        previewArea.innerHTML = "";
        previewRef.current.append(previewArea);
      }
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (previewRef.current) {
      previewRef.current.update({
        data: inputString || "https://abhijitchirde.com ",
        image: logoImage,
        dotsOptions: {
          color: cellColor,
          type:
            cellOptions.find((opt) => opt.value === cellStyle)?.value ||
            "square",
        },
        cornersSquareOptions: {
          color: cornerColor,
          type:
            cornerOptions.find((opt) => opt.value === cornerStyle)?.value ||
            "square",
        },
        cornersDotOptions: {
          color: centerColor,
          type:
            centerOptions.find((opt) => opt.value === centerStyle)?.value ||
            "square",
        },
        backgroundOptions: {
          color: bgColor,
        },
      });
    }
  }, [
    inputString,
    cornerColor,
    centerColor,
    cellColor,
    bgColor,
    cornerStyle,
    centerStyle,
    cellStyle,
    logoImage,
  ]);

  // Add as PNG: create a new QRCodeStyling instance and send to Figma canvas
  const addAsPNG = async () => {
    const validCorner = cornerOptions.find((opt) => opt.value === cornerStyle)
      ? cornerStyle
      : "square";
    const validCenter = centerOptions.find((opt) => opt.value === centerStyle)
      ? centerStyle
      : "square";
    const validCell = cellOptions.find((opt) => opt.value === cellStyle)
      ? cellStyle
      : "square";
    const qrCode = new QRCodeStyling({
      width: 280,
      height: 280,
      data: inputString || "https://abhijitchirde.com ",
      image: logoImage,
      dotsOptions: {
        color: cellColor,
        type: validCell,
      },
      cornersSquareOptions: {
        color: cornerColor,
        type: validCorner,
      },
      cornersDotOptions: {
        color: centerColor,
        type: validCenter,
      },
      backgroundOptions: {
        color: bgColor,
      },
    });
    const blob = await qrCode.getRawData("png");
    const arrayBuffer = await blob.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);
    parent.postMessage(
      {
        pluginMessage: { type: "png", data: { array: Array.from(uint8) } },
      },
      "*"
    );
  };

  // Add as SVG: create a new QRCodeStyling instance and send to Figma canvas
  const addAsSVG = async () => {
    const validCorner = cornerOptions.find((opt) => opt.value === cornerStyle)
      ? cornerStyle
      : "square";
    const validCenter = centerOptions.find((opt) => opt.value === centerStyle)
      ? centerStyle
      : "square";
    const validCell = cellOptions.find((opt) => opt.value === cellStyle)
      ? cellStyle
      : "square";
    const qrCode = new QRCodeStyling({
      width: 180,
      height: 180,
      data: inputString || "https://abhijitchirde.com ",
      image: logoImage,
      dotsOptions: {
        color: cellColor,
        type: validCell,
      },
      cornersSquareOptions: {
        color: cornerColor,
        type: validCorner,
      },
      cornersDotOptions: {
        color: centerColor,
        type: validCenter,
      },
      backgroundOptions: {
        color: bgColor,
      },
    });
    const blob = await qrCode.getRawData("svg");
    const svgString = await blob.text();
    parent.postMessage(
      {
        pluginMessage: { type: "svg", data: { svgString } },
      },
      "*"
    );
  };

  const qrColorInputHandler = (e) => {
    const newColor = e.target.value;
    setQrColor(newColor);
    setCornerColor(newColor);
    setCenterColor(newColor);
    setCellColor(newColor);
  };
  const cornerColorInputHandler = (e) => setCornerColor(e.target.value);
  const centerColorInputHandler = (e) => setCenterColor(e.target.value);
  const cellColorInputHandler = (e) => setCellColor(e.target.value);
  const bgColorInputHandler = (e) => setBgColor(e.target.value);
  const inputChangeHandler = (e) => setInputString(e.target.value);
  const clearHandler = () => setInputString("");

  const handleLogoChange = (image: string) => {
    setLogoImage(image);
  };

  const handleLogoRemove = () => {
    setLogoImage("");
  };

  const resetStylesHandler = () => {
    setQrColor("#000000");
    setCornerColor("#000000");
    setCenterColor("#000000");
    setCellColor("#000000");
    setBgColor("#ffffff");
    setCornerStyle("square");
    setCenterStyle("square");
    setCellStyle("square");
    setLogoImage("");
  };

  return (
    <main>
      {/* Input string section */}
      <div className="content-div">
        {inputString && (
          <div className="label-button">
            <button
              className="button-clear"
              onClick={clearHandler}
              type="button"
              title="Clear"
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
          </div>
        )}
        <textarea
          className="input-string"
          name="inputString"
          rows={2}
          id="inputString"
          value={inputString}
          onInput={inputChangeHandler}
          placeholder="Enter your text here..."
        />
      </div>

      {/* Display QR code on plugin window */}

      <div id="qr-preview-area" />

      <div className="reset-styles-container">
        <button
          className="reset-styles-link"
          onClick={resetStylesHandler}
          type="button"
        >
          Reset styles
        </button>
      </div>

      {/* Logo selection section */}
      <div className="style-select-stack">
        <CustomLogo
          logoImage={logoImage}
          onLogoChange={handleLogoChange}
          onLogoRemove={handleLogoRemove}
        />
      </div>

      {/* Style selection section */}
      <div className="style-select-stack">
        <div className="color-picker-div-row">
          <label className="style-dropdown-external-label">Global</label>
          <div className="color-picker-div">
            <input
              type="color"
              className="input-picker"
              name="qr-color"
              id="qr-color"
              value={qrColor}
              onInput={qrColorInputHandler}
            />
            <input
              type="color"
              className="input-picker"
              name="bg-color"
              id="bg-color"
              value={bgColor}
              onInput={bgColorInputHandler}
            />
          </div>
        </div>

        <div className="style-dropdown-wrapper">
          <label className="style-dropdown-external-label">Corners</label>
          <div className="style-dropdown-row">
            <StyleDropdown
              options={cornerOptions}
              value={cornerStyle}
              onChange={setCornerStyle}
              className="style-dropdown"
            />
            <div className="style-dropdown-gap"></div>
            <input
              type="color"
              className="input-picker inline-color-picker"
              name="corner-color"
              id="corner-color"
              value={cornerColor}
              onInput={cornerColorInputHandler}
            />
          </div>
        </div>
        <div className="style-dropdown-wrapper">
          <label className="style-dropdown-external-label">Center</label>
          <div className="style-dropdown-row">
            <StyleDropdown
              options={centerOptions}
              value={centerStyle}
              onChange={setCenterStyle}
              className="style-dropdown"
            />
            <div className="style-dropdown-gap"></div>
            <input
              type="color"
              className="input-picker inline-color-picker"
              name="center-color"
              id="center-color"
              value={centerColor}
              onInput={centerColorInputHandler}
            />
          </div>
        </div>
        <div className="style-dropdown-wrapper">
          <label className="style-dropdown-external-label">Cells</label>
          <div className="style-dropdown-row">
            <StyleDropdown
              options={cellOptions}
              value={cellStyle}
              onChange={setCellStyle}
              className="style-dropdown"
            />
            <div className="style-dropdown-gap"></div>
            <input
              type="color"
              className="input-picker inline-color-picker"
              name="cell-color"
              id="cell-color"
              value={cellColor}
              onInput={cellColorInputHandler}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="content-div buttons-container">
        <div className="buttons-div">
          <button
            className="button-pri"
            disabled={inputString === ""}
            onClick={addAsPNG}
          >
            Add as PNG
          </button>
          <button
            className="button-pri"
            disabled={inputString === "" || logoImage !== ""}
            onClick={addAsSVG}
          >
            Add as SVG
          </button>
        </div>
      </div>
      {/* Credit section  */}
      <BottomSection />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
