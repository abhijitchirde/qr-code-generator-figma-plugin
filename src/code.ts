figma.showUI(__html__, { width: 395, height: 450 });

figma.ui.onmessage = (msg) => {
  const nodes: SceneNode[] = [];

  // Handle theme requests
  if (msg.type === "get-theme") {
    // For now, default to light theme since Figma doesn't expose theme directly
    // In a real implementation, you might want to detect this from the UI context
    const currentTheme = "light";
    figma.ui.postMessage({
      pluginMessage: {
        type: "theme-changed",
        theme: currentTheme,
      },
    });
  }

  // Handle theme change notifications
  if (msg.type === "theme-changed") {
    // Store the theme preference if needed
    // This is optional but can be useful for persistence
    console.log("Theme changed to:", msg.theme);
  }

  if (msg.type == "png") {
    const input = msg.data.array;
    const qr = figma.createFrame() as FrameNode;
    qr.resize(200, 200);
    const qrImage = figma.createImage(Uint8Array.from(input)) as Image;
    qr.fills = [{ type: "IMAGE", imageHash: qrImage.hash, scaleMode: "FIT" }];
    qr.name = "QR";
    figma.currentPage.appendChild(qr);
    nodes.push(qr);
    figma.viewport.scrollAndZoomIntoView(nodes);

    return false;
  }

  if (msg.type == "svg") {
    const svgInput = msg.data.svgString;
    const newSVG = figma.createNodeFromSvg(svgInput);
    newSVG.name = "QR";
    figma.currentPage.appendChild(newSVG);
    nodes.push(newSVG);
    figma.viewport.scrollAndZoomIntoView(nodes);
    return false;
  }
};
