
class DrawingFree{
   constructor(){}
   startDrawing  ({ canvas, mouseDown})  {
      console.log('free')
      mouseDown = true;
      canvas.renderAll();
   };
   
   moveDrawing  ({ canvas})  {
      canvas.isDrawingMode = true;
      canvas.renderAll();
   };
   
   stopDrawing  ({ canvas, socket,mouseDown })  {
      mouseDown = false;
      canvas.isDrawingMode = false;
      canvas.renderAll();
      const canvasJson = canvas.toJSON();
      socket.emit("drawing", canvasJson);
   };
}

const free= new DrawingFree()

export default free

// export const startDrawing = ({ canvas, obj ,modeDrawing,mouseDown}) => {
//    mouseDown = true;
//    canvas.renderAll();
// };

// export const moveDrawing = ({ canvas, obj, modeDrawing ,mouseDown}) => {
//    canvas.isDrawingMode = true;
//    canvas.renderAll();
// };

// export const stopDrawing = ({ canvas, obj, socket,mouseDown }) => {
//    mouseDown = false;
//    canvas.isDrawingMode = false;
//    canvas.renderAll();
//    const canvasJson = canvas.toJSON();
//    socket.emit("drawing", canvasJson);
// };
