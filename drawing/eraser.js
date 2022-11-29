const eraserFn = (e) => {
   modeDrawing = "eraser";
   if (!mouseDown || modeDrawing !== "eraser") return;
   canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
   canvas.isDrawingMode = true;
   canvas.freeDrawingCursor = "not-allowed";

   //   const cursorUrl = "https://ossrs.net/wiki/images/figma-cursor.png";
   //   canvas.freeDrawingCursor  = `url(" ${cursorUrl} "), auto`;
   //   canvas.hoverCursor = `url(" ${cursorUrl} "), auto`;
   //   canvas.moveCursor = `url(" ${cursorUrl} "), auto`;
   //  optional

   canvas.freeDrawingBrush.width = 10;

   //  undo erasing
   //   canvas.freeDrawingBrush.inverted = true;
};
