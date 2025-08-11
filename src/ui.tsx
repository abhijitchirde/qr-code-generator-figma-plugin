import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import BottomSection from "./components/BottomSection";
import StyleDropdown, { StyleOption } from "./components/StyleDropdown";
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
  const [colour, setColour] = React.useState("#000000");
  const [bgColor, setBgColor] = React.useState("#ffffff");
  const [cornerStyle, setCornerStyle] = React.useState("square"); // cornersSquareOptions
  const [centerStyle, setCenterStyle] = React.useState("square"); // cornersDotOptions
  const [cellStyle, setCellStyle] = React.useState("square"); // dotsOptions

  const previewRef = React.useRef<any>(null);

  // --- QR code preview: mount-once and update-only pattern ---
  React.useEffect(() => {
    if (!previewRef.current) {
      previewRef.current = new QRCodeStyling({
        width: 160,
        height: 160,
        data: inputString || "https://x.com/abhijitwt ",
        image: "",
        dotsOptions: {
          color: colour,
          type:
            cellOptions.find((opt) => opt.value === cellStyle)?.value ||
            "square",
        },
        cornersSquareOptions: {
          color: colour,
          type:
            cornerOptions.find((opt) => opt.value === cornerStyle)?.value ||
            "square",
        },
        cornersDotOptions: {
          color: colour,
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
        data: inputString || "https://x.com/abhijitwt ",
        dotsOptions: {
          color: colour,
          type:
            cellOptions.find((opt) => opt.value === cellStyle)?.value ||
            "square",
        },
        cornersSquareOptions: {
          color: colour,
          type:
            cornerOptions.find((opt) => opt.value === cornerStyle)?.value ||
            "square",
        },
        cornersDotOptions: {
          color: colour,
          type:
            centerOptions.find((opt) => opt.value === centerStyle)?.value ||
            "square",
        },
        backgroundOptions: {
          color: bgColor,
        },
      });
    }
  }, [inputString, colour, bgColor, cornerStyle, centerStyle, cellStyle]);

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
      data: inputString || "https://x.com/abhijitwt ",
      image: "",
      dotsOptions: {
        color: colour,
        type: validCell,
      },
      cornersSquareOptions: {
        color: colour,
        type: validCorner,
      },
      cornersDotOptions: {
        color: colour,
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
      data: inputString || "https://x.com/abhijitwt ",
      image: "",
      dotsOptions: {
        color: colour,
        type: validCell,
      },
      cornersSquareOptions: {
        color: colour,
        type: validCorner,
      },
      cornersDotOptions: {
        color: colour,
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

  const colorInputHandler = (e) => setColour(e.target.value);
  const bgColorInputHandler = (e) => setBgColor(e.target.value);
  const inputChangeHandler = (e) => setInputString(e.target.value);
  const clearHandler = () => setInputString("");
  const resetStylesHandler = () => {
    setColour("#000000");
    setBgColor("#ffffff");
    setCornerStyle("square");
    setCenterStyle("square");
    setCellStyle("square");
  };

  return (
    <main>
      {/* Input string section */}
      <div className="content-div">
        <div className="label-button">
          <button className="button-clear" onClick={clearHandler}>
            Clear
          </button>
        </div>
        <textarea
          className="input-string"
          name="inputString"
          rows={4}
          id="inputString"
          value={inputString}
          onInput={inputChangeHandler}
          placeholder="Enter your text or URL here to generate QR..."
        />
      </div>

      {/* Display QR code on plugin window */}
      <div className="main-container">
        <div className="inside-main-container">
          <div className="qr-container">
            <div id="qr-preview-area" />
          </div>
        </div>
        <div className="style-select-stack">
          <div className="color-picker-div">
            <p className="color-label">QR Color</p>
            <input
              type="color"
              className="input-picker"
              name="qr-color"
              id="color"
              value={colour}
              onInput={colorInputHandler}
            />
          </div>
          <div className="color-picker-div">
            <p className="color-label">BG Color</p>
            <input
              type="color"
              className="input-picker"
              name="bg-color"
              id="bg-color"
              value={bgColor}
              onInput={bgColorInputHandler}
            />
          </div>

          <StyleDropdown
            options={cornerOptions}
            value={cornerStyle}
            onChange={setCornerStyle}
            className="style-dropdown"
          />
          <StyleDropdown
            options={centerOptions}
            value={centerStyle}
            onChange={setCenterStyle}
            className="style-dropdown"
          />
          <StyleDropdown
            options={cellOptions}
            value={cellStyle}
            onChange={setCellStyle}
            className="style-dropdown"
          />

          <button
            className="reset-styles-link"
            onClick={resetStylesHandler}
            type="button"
          >
            Reset styles
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="content-div">
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
            disabled={inputString === ""}
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
