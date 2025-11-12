figma.showUI(__html__, { width: 300, height: 780 });

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

  // Helper function to check if a node can contain children
  const canHaveChildren = (node: SceneNode): boolean => {
    // Check if node has appendChild method (part of ChildrenMixin interface)
    return (
      "appendChild" in node && typeof (node as any).appendChild === "function"
    );
  };

  // Helper function to get the target parent node (selected container or page)
  const getTargetParent = (): ChildrenMixin => {
    const selection = figma.currentPage.selection;

    // If there are selected nodes, try to use the first one
    if (selection.length > 0) {
      const firstSelected = selection[0];

      // Check if the selected node can have children using runtime check
      // This works for all container types including: FrameNode, GroupNode,
      // ComponentNode, InstanceNode, SectionNode, SlideNode, etc.
      if (canHaveChildren(firstSelected)) {
        return firstSelected as ChildrenMixin;
      }
    }

    // If nothing selected or selected node can't have children, use the page
    return figma.currentPage;
  };

  if (msg.type == "png") {
    const input = msg.data.array;
    const qr = figma.createFrame() as FrameNode;
    qr.resize(200, 200);
    const qrImage = figma.createImage(Uint8Array.from(input)) as Image;
    qr.fills = [{ type: "IMAGE", imageHash: qrImage.hash, scaleMode: "FIT" }];
    qr.name = "QR";

    const targetParent = getTargetParent();
    targetParent.appendChild(qr);
    nodes.push(qr);

    // Only scroll and zoom if we appended to the page (not inside a selected element)
    if (targetParent === figma.currentPage) {
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    return false;
  }

  if (msg.type == "svg") {
    const svgInput = msg.data.svgString;
    const newSVG = figma.createNodeFromSvg(svgInput);
    newSVG.name = "QR";

    const targetParent = getTargetParent();
    targetParent.appendChild(newSVG);
    nodes.push(newSVG);

    // Only scroll and zoom if we appended to the page (not inside a selected element)
    if (targetParent === figma.currentPage) {
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    return false;
  }
};
