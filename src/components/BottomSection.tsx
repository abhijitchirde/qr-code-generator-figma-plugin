import * as React from "react";
import ThemeToggle from "./ThemeToggle";

const BottomSection = () => {
  return (
    <div className="bottom-wrapper">
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>

      <div className="credit-container">
        <p className="credit-text">
          <a
            href="https://x.com/abhijitwt"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Abhijit
          </a>
        </p>
      </div>
    </div>
  );
};

export default BottomSection;
