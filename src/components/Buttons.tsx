import * as React from "react";

const Buttons = ({ disabled }: { disabled: boolean }) => {
  return (
    <>
      <div className="content-div">
        <div className="buttons-div">
          <button className="button-pri" disabled={disabled}>
            Add as PNG
          </button>
          <button className="button-pri" disabled={disabled}>
            Add as SVG
          </button>
        </div>
      </div>
    </>
  );
};

export default Buttons;
