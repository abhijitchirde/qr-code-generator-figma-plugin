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

  const inputChangeHandler = (e) => {
    setInputString(e.target.value);
  };

  const clearHandler = () => {
    setInputString("");
  };

  const downloadQRPng = () => {
    const canvas = document.getElementById("qr-main") as HTMLCanvasElement;
    const pngURL = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const array = base64toBytes(pngURL);

    parent.postMessage(
      {
        pluginMessage: { type: "png-data", data: { array } },
      },
      "*"
    );
  };

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
          wrap="soft"
          rows={4}
          id="inputString"
          value={inputString}
          onInput={inputChangeHandler}
        />
      </div>

      {/* Display QR code on plugin window */}
      <div className="qr-container">
        {inputString === "" ? (
          "Nothing to show here :)"
        ) : (
          <QRCodeCanvas
            value={inputString}
            size={210}
            fgColor="#000"
            level="H"
            id="qr-main"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="content-div">
        <div className="buttons-div">
          <button
            className="button-pri"
            disabled={inputString == ""}
            onClick={downloadQRPng}
          >
            Add as PNG
          </button>
          <button className="button-pri" disabled={inputString == ""}>
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
