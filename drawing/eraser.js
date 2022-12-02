// import { fabric } from "../js/fabric1.js";
// import { fabric } from "fabric";

// export const eraserFn = ({ canvas,modeDrawing,mouseDown }) => {
//    modeDrawing = "eraser";
//    if (!mouseDown || modeDrawing !== "eraser") return;
//    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
//    canvas.isDrawingMode = true;
//    canvas.freeDrawingCursor = "not-allowed";
//    //   const cursorUrl = "https://ossrs.net/wiki/images/figma-cursor.png";
//    //   canvas.freeDrawingCursor  = `url(" ${cursorUrl} "), auto`;
//    //   canvas.hoverCursor = `url(" ${cursorUrl} "), auto`;
//    //   canvas.moveCursor = `url(" ${cursorUrl} "), auto`;
//    //  optional

//    canvas.freeDrawingBrush.width = 10;

//    //  undo erasing
//    //   canvas.freeDrawingBrush.inverted = true;
// };

class EraserBrush {
   constructor() {}
   startDrawing({ canvas }) {
      console.log("eraser");
      canvas.renderAll();
   }

   moveDrawing({ canvas}) {
      // const {fabric}= require('fabric')
      // if (!mouseDown || modeDrawing !== "eraser") return;

      canvas.freeDrawingCursor = "not-allowed";
      // const cursorUrl = "https://ossrs.net/wiki/images/figma-cursor.png";
      // const cursorUrl = "https://img.icons8.com/material-outlined/24/null/filled-circle--v1.png";
      // canvas.freeDrawingCursor  = `url(" ${cursorUrl} "), auto`;
      // canvas.hoverCursor = `url(" ${cursorUrl} "), auto`;
      // canvas.moveCursor = `url(" ${cursorUrl} "), auto`;
      
      canvas.freeDrawingBrush.width = 20;
      canvas.freeDrawingBrush.color = '#fff';
      canvas.isDrawingMode = true;
   
      //  optional
      
      //  undo erasing
      //   canvas.freeDrawingBrush.inverted = true;
      canvas.renderAll()
   }

   stopDrawing({ canvas, socket }) {
      canvas.isDrawingMode = false;

      canvas.renderAll();

      const dataSaveToServer = canvas.toJSON();
      socket.emit("drawing", dataSaveToServer);
   }
}

const eraser = new EraserBrush();

export default eraser;

