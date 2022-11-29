class DrawingLine {
   constructor() {
      this.line = {};
   }
   startDrawing({ canvas, obj, mouseDown }) {
      console.log(`  ~ line`, line);

      mouseDown = true;
      const pointer = obj.pointer;
      this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
         stroke: "black",
         strokeWidth: 1,
      });
      canvas.add(this.line);
      canvas.requestRenderAll();
   }

   moveDrawing({ canvas, obj, mouseDown }) {
      if (!mouseDown) return;

      const pointer = obj.pointer;
      canvas.isDrawingMode = false;
      this.line.set({
         x2: pointer.x,
         y2: pointer.y,
      });
      canvas.requestRenderAll();
   }

   stopDrawing({ canvas, socket, mouseDown }) {
      mouseDown = false;
      canvas.isDrawingMode = false;
      canvas.renderAll();
      const canvasJson = canvas.toJSON();
      socket.emit("drawing", canvasJson);
   }
}

const line = new DrawingLine();

export default line;

// let line={}

//  export const startDrawing = ({  canvas, obj ,modeDrawing,mouseDown}) => {
//    console.log(`  ~ line`, line)

//    mouseDown = true;
//    const pointer = obj.pointer;
//    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
//       stroke: "black",
//       strokeWidth: 1,
//    });
//    canvas.add(line);
//    canvas.requestRenderAll();
// };

//  export const moveDrawing = ({  canvas, obj,modeDrawing,mouseDown }) => {
//    if (!mouseDown) return;

//    const pointer = obj.pointer;
//    canvas.isDrawingMode = false;
//    line.set({
//       x2: pointer.x,
//       y2: pointer.y,
//    });
//    canvas.requestRenderAll();
// };

//  export const stopDrawing = ({  canvas, obj, socket,mouseDown }) => {
//    mouseDown = false;
//    canvas.isDrawingMode = false;
//    canvas.renderAll();
//    const canvasJson = canvas.toJSON();
//    socket.emit("drawing", canvasJson);
// };
