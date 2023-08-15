import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";
import BottomSection from "./components/BottomSection";
import {
  QRCodeSVG,
  QRCodeCanvas,
} from "../node_modules/qrcode.react/lib/index";

declare function require(path: string): any;

function App() {
  const [inputString, setInputString] = React.useState("");
  const [colour, setColour] = React.useState("#000000");

  const inputChangeHandler = (e) => {
    setInputString(e.target.value);
  };

  const clearHandler = () => {
    setInputString("");
  };

  const colorInputHandler = (e) => {
    setColour(e.target.value);
  };

  const qrSVG = (
    <QRCodeSVG
      value={inputString}
      size={210}
      fgColor={colour}
      level="L"
      id="qr-svg"
    />
  );

  const qrPNG = (
    <QRCodeCanvas
      value={inputString}
      size={210}
      fgColor={colour}
      level="L"
      id="qr-png"
    />
  );

  const downloadPNG = () => {
    const canvas = document.getElementById("qr-png") as HTMLCanvasElement;

    const pngURL = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const array = base64toBytes(pngURL);

    function base64toBytes(input) {
      const BASE64_MARKER = ";base64,";

      var base64Index = input.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = input.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }

    parent.postMessage(
      {
        pluginMessage: { type: "png", data: { array } },
      },
      "*"
    );
  };

  const downloadSVG = () => {
    const svg = document.getElementById("qr-svg");

    const temp = new XMLSerializer();

    const svgString = temp.serializeToString(svg);

    parent.postMessage(
      { pluginMessage: { type: "svg", data: { svgString } } },
      "*"
    );
  };

  return (
    <main>
      {/* Input string section */}
      <div className="content-div">
        <div className="label-button">
          <label className="section-label">Enter your text</label>
          <button className="button-sec" onClick={clearHandler}>
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
        />
      </div>

      {/* Display QR code on plugin window */}
      <div className="main-container">
        {inputString === "" ? (
          <p className="placeholder-text">
            Please add your text above to generate QR code
          </p>
        ) : (
          <div>
            <div className="color-picker-div">
              <p className="color-label">Change color</p>
              <input
                type="color"
                className="input-picker"
                name="color"
                id="color"
                value={colour}
                onInput={colorInputHandler}
              />
            </div>

            <div className="qr-container">
              {qrPNG}
              <div style={{ display: "none" }}>{qrSVG}</div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="content-div">
        <div className="buttons-div">
          <button
            className="button-pri"
            disabled={inputString == ""}
            onClick={downloadPNG}
          >
            Add as PNG
          </button>
          <button
            className="button-pri"
            disabled={inputString == ""}
            onClick={downloadSVG}
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
