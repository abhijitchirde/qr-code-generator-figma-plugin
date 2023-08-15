import * as React from "react";

const BottomSection = () => {
  const onDisclaimer = () => {
    parent.postMessage({ pluginMessage: { type: "disclaimer" } }, "*");
  };
  return (
    <div className="bottomContainer">
      <p className="credit-text">
        <a href="https://abhijitchirde.com" target="_blank">
          by Abhijit
        </a>
      </p>
    </div>
  );
};

export default BottomSection;
