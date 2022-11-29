class DrawingCircle {
   constructor() {
      this.pointerStart = {};
      this.circle = {};
   }

   startDrawing({obj, canvas, mouseDown}) {
      mouseDown = true;
      this.pointerStart = obj.pointer;
      this.circle = new fabric.Circle({ radius: 0, fill: "", stroke: "black", strokeWidth: 1, top: this.pointerStart.y, left: this.pointerStart.x });
      canvas.add(this.circle);
      canvas.renderAll();
   }

   moveDrawing({ canvas, obj, mouseDown }) {
      if (!mouseDown) return;
      const pointer = obj.pointer;
      const radius = Math.sqrt(Math.pow(Math.abs(pointer.x - this.pointerStart.x), 2) + Math.pow(Math.abs(pointer.y - this.pointerStart.y), 2));
      this.circle.set("radius", radius);
      this.circle.set("top", this.pointerStart.y - radius);
      this.circle.set("left", this.pointerStart.x - radius);
      canvas.renderAll();
   }

   stopDrawing({ canvas, socket, mouseDown }) {
      mouseDown = false;
      canvas.renderAll();
   }
}

const circle= new DrawingCircle()

export default circle

// const drawingCircleFn = () => {
//    modeDrawing = "circle";
//    canvas.isDrawingMode = false;
//    canvas.on("mouse:down", startDrawingCircle);
//    canvas.on("mouse:move", drawingCircle);
//    canvas.on("mouse:up", stopDrawingCircle);
// };

// let pointerStart = {};
// let circle;
// const startDrawingCircle = (obj) => {
//    mouseDown = true;
//    pointerStart = obj.pointer;
//    circle = new fabric.Circle({ radius: 0,fill:'', stroke: "black", strokeWidth: 1, top: pointerStart.y, left: pointerStart.x });
//    canvas.add(circle);
//    canvas.renderAll();
// };

// const drawingCircle = (obj) => {
//    if (!mouseDown || modeDrawing !== "circle") return;
//    const pointer = obj.pointer;
//    const radius = Math.sqrt(Math.pow(Math.abs(pointer.x - pointerStart.x), 2) + Math.pow(Math.abs(pointer.y - pointerStart.y), 2));
//    circle.set("radius", radius);
//    circle.set("top", pointerStart.y - radius);
//    circle.set("left", pointerStart.x - radius);
//    canvas.renderAll();
// };

// const stopDrawingCircle = (obj) => {
//    //
//    mouseDown = false;
//    const pointerEnd = obj.pointer;
//    const radius = Math.sqrt(Math.pow(Math.abs(pointerEnd.x - pointerStart.x), 2) + Math.pow(Math.abs(pointerEnd.y - pointerStart.y), 2));
//    canvas.renderAll();
// };
