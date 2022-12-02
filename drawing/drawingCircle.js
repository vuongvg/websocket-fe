class DrawingCircle {
   constructor() {
      this.pointerStart = {};
      this.circle = {};
   }

   startDrawing({ obj, canvas }) {
      this.pointerStart = obj.pointer;
      this.circle = new fabric.Circle({ radius: 0, fill: "", stroke: "black", strokeWidth: 1, top: this.pointerStart.y, left: this.pointerStart.x });

      canvas.add(this.circle);
      canvas.renderAll();
   }

   moveDrawing({ canvas, obj, mouseDown }) {
      canvas.isDrawingMode = false;
      if (!mouseDown) return;
      const pointer = obj.pointer;

      const radius = Math.sqrt(Math.pow(Math.abs(pointer.x - this.pointerStart.x), 2) + Math.pow(Math.abs(pointer.y - this.pointerStart.y), 2));

      this.circle.set("radius", radius);
      this.circle.set("top", this.pointerStart.y - radius);
      this.circle.set("left", this.pointerStart.x - radius);
      canvas.renderAll();
   }

   stopDrawing({ canvas, socket }) {
      canvas.renderAll();

      const dataSaveToServer = canvas.toJSON();
      socket.emit("drawing", dataSaveToServer);
   }
}

const circle = new DrawingCircle();

export default circle;
