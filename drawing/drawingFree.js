class DrawingFree {
   constructor() {}
   startDrawing({ canvas }) {
      canvas.renderAll();
   }

   moveDrawing({ canvas }) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingCursor = "crosshair";
      canvas.freeDrawingBrush.width = 1;
      canvas.freeDrawingBrush.color = '#000';
      canvas.renderAll();
   }

   stopDrawing({ canvas, socket }) {
      canvas.isDrawingMode = false;
      canvas.renderAll();

      const dataSaveToServer = canvas.toJSON();
      socket.emit("drawing", dataSaveToServer);
   }
}

const free = new DrawingFree();

export default free;
