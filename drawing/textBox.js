export const textBox = (canvas) => {
   console.log("textbox");
   var textBox = new fabric.Textbox("MyText", {
      width: 150,
      top: 5,
      left: 5,
      fontSize: 16,
      textAlign: "center",
      fixedWidth: 150,
   });

   canvas.on("text:changed", function (opt) {
      console.log("change text");
      var textBox = opt.target;
      if (textBox.width > textBox.fixedWidth) {
         textBox.fontSize *= textBox.fixedWidth / (textBox.width + 1);
         textBox.width = textBox.fixedWidth;
      }
   });

   canvas.add(textBox);
};

class TextBox {
   constructor() {
      this.pointerStart = {};
      this.pointerEnd = {};
      this.textBox = {};
   }
   startDrawing({ canvas, obj }) {
      this.pointerStart = obj.pointer;
   }

   moveDrawing({ canvas, obj, mouseDown }) {
      canvas.isDrawingMode = false;
   }

   stopDrawing({ obj, canvas, socket }) {
      this.pointerEnd = obj.pointer;
      if (this.pointerEnd.x - this.pointerStart.x < 10) return;
      
      var textBox = new fabric.Textbox("MyText", {
         top: this.pointerStart.y,
         left: this.pointerStart.x,
         textAlign: "center",
         width: this.pointerEnd.x - this.pointerStart.x,
         fontSize: (this.pointerEnd.y - this.pointerStart.y) < 16 ? 16 : (this.pointerEnd.y - this.pointerStart.y) ,
         fixedWidth: this.pointerEnd.x - this.pointerStart.x,
      });
      canvas.add(textBox);
      canvas.renderAll();
      console.log(` canvas`, canvas)

        canvas.forEachObject((obj,index) => {
          console.log(` obj`+index, obj)
          // canvas._onDoubleClick()
          // obj.lockMovementX = true;
          // obj.lockMovementY = true;
          // obj.hasControls = !true;
          // obj.hasBorders = !true;
          // obj.selectable = !true;
       });

      //  const dataSaveToServer = canvas.toJSON();
      //  socket.emit("drawing", dataSaveToServer);
   }
}

const text = new TextBox();

export default text;
