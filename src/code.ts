figma.showUI(__html__, { width: 280, height: 445 });

figma.ui.onmessage = (msg) => {
  const nodes: SceneNode[] = [];

  if ((msg.type = "png")) {
    // figma.currentPage.appendChild(qrImage);
    // nodes.push(qrImage);
    // figma.viewport.scrollAndZoomIntoView(nodes);
    // const array = toUtf8Bytes(msg.data.pngURL);
    const input = msg.data.array;
    // // const array = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
    const frame = figma.createFrame() as FrameNode;
    frame.resize(150, 150);
    const qrImage = figma.createImage(Uint8Array.from(input)) as Image;

    frame.fills = [
      { type: "IMAGE", imageHash: qrImage.hash, scaleMode: "FIT" },
    ];

    figma.currentPage.appendChild(frame);
    nodes.push(frame);
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};
