figma.showUI(__html__, { width: 300, height: 480 });

figma.ui.onmessage = (msg) => {
  const nodes: SceneNode[] = [];

  if (msg.type == "png") {
    const input = msg.data.array;
    const qr = figma.createFrame() as FrameNode;
    qr.resize(210, 210);
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
