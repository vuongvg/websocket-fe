class DrawingLine {
   constructor() {
      this.line = {};
   }
   startDrawing({ canvas, obj }) {
      console.log(`  ~ line`, line);
      canvas.isDrawingMode = false;
      const pointer = obj.pointer;
      this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
         stroke: "black",
         strokeWidth: 1,
      });
      canvas.add(this.line);
      canvas.requestRenderAll();
   }

   moveDrawing({ canvas, obj, mouseDown }) {
      canvas.isDrawingMode = false;
      if (!mouseDown) return;
      
      const pointer = obj.pointer;
      this.line.set({
         x2: pointer.x,
         y2: pointer.y,
      });
      // canvas.item(0).selectable = false;
      canvas.requestRenderAll();
   }

   stopDrawing({ canvas, socket }) {
      canvas.isDrawingMode = false;
      canvas.renderAll();

      const dataSaveToServer = canvas.toJSON();
      socket.emit("drawing", dataSaveToServer);
   }
}

const line = new DrawingLine();

export default line;
