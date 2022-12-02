export const moveObject = (canvas) => {
   canvas.forEachObject((obj) => {
      obj.lockMovementX = !false;
      obj.lockMovementY = !false;
      obj.hasControls = false;
      obj.hasBorders = false;
      obj.selectable = false;
   });
   canvas.renderAll();
};

class MoveObject {
    constructor() {}
    startDrawing({ canvas }) {
       canvas.renderAll();
    }
 
    moveDrawing({ canvas }) {
        canvas.forEachObject((obj) => {
            obj.lockMovementX = !true;
            obj.lockMovementY = !true;
            obj.hasControls = true;
            obj.hasBorders = true;
            obj.selectable = true;
         });
         canvas.renderAll();
    }

 
    stopDrawing({ canvas, socket }) {
       canvas.isDrawingMode = false;
       canvas.renderAll();
 
       const dataSaveToServer = canvas.toJSON();
       socket.emit("drawing", dataSaveToServer);
    }
 }
 
 const move = new MoveObject();
 
 export default move;
 