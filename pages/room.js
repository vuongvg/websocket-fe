/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef } from "react";
import { fabric } from "fabric";
import UserContext from "../components/UserContex";
import { useRouter } from "next/router";
import drawing from "../drawing";
import { saveJson } from "../drawing/saveJson";
import { loadJson } from "../drawing/loadJson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { textBox } from "../drawing/textBox";

export default function Room() {
   const userCtx = useContext(UserContext);
   const router = useRouter();
   // console.log(`  ~ router`, router)
   const { r: room } = router.query;
   const modeDrawing = useRef("");
   console.log("render");
   const { socketClient, username } = userCtx;

   useEffect(() => {
      const canvas = new fabric.Canvas("canvas", {
         width: window.innerWidth,
         heigh: window.innerHeight,
      });
      const drawingMode = document.querySelectorAll(".drawing-mode");
      let mouseDown = false;

      const selectModeDrawing = (btn, mode) => {
         modeDrawing.current = mode;
         drawingMode.forEach((elm) => elm.classList.replace("btn-primary", "btn-light"));
         btn.classList.replace("btn-light", "btn-primary");
      };

      const lockMove = (isLock) => {
         // return
         canvas.forEachObject((obj) => {
            obj.lockMovementX = isLock;
            obj.lockMovementY = isLock;
            obj.hasControls = !isLock;
            obj.hasBorders = !isLock;
            obj.selectable = !isLock;
         });
         canvas.renderAll();
      };

      canvas.on("mouse:down", (obj) => {
         if (!modeDrawing.current) return;
         mouseDown = true;

         drawing[modeDrawing.current].startDrawing({ canvas, obj });
      });

      canvas.on("mouse:move", (obj) => {
         if (!modeDrawing.current) return;
         if (!["move",'text'].includes(modeDrawing.current )) {
            lockMove(true);
         } else lockMove(false);
         drawing[modeDrawing.current].moveDrawing({ canvas, obj, mouseDown });
      });

      canvas.on("mouse:up", (obj) => {
         if (!modeDrawing.current) return;
         mouseDown = false;
         drawing[modeDrawing.current].stopDrawing({ canvas, socket: socketClient ,obj});
      });

      // document.getElementById("move-object").addEventListener("click", function () {
      //    selectModeDrawing(this, "move");
      // });

      document.getElementById("drawing-line").addEventListener("click", function () {
         selectModeDrawing(this, "line");
      });

      document.getElementById("drawing-free").addEventListener("click", function () {
         selectModeDrawing(this, "free");
      });

      document.getElementById("drawing-circle").addEventListener("click", function () {
         selectModeDrawing(this, "circle");
      });

      document.getElementById("text-box").addEventListener("click", function () {
         selectModeDrawing(this, "text");
      });

      document.getElementById("eraser").addEventListener("click", function () {
         selectModeDrawing(this, "eraser");
      });

      document.getElementById("clear").addEventListener("click", function () {
         canvas.clear();
      });

      document.getElementById("save-json").addEventListener("click", function () {
         saveJson(canvas);
      });

      document.getElementById("load-json").addEventListener("click", function () {
         document.getElementById("input-file").click();
      });

      document.getElementById("input-file").addEventListener("change", (e) => loadJson(e, canvas));

      socketClient.on("load-data", (data) => {
         canvas.loadFromJSON(data, () => canvas.renderAll());
      });

      socketClient.on("drawing", (data) => {
         console.log(`  ~ data drawing`, data);
         canvas.loadFromJSON(data, () => canvas.renderAll());
      });
      socketClient.emit("load-data", room);
   }, []);

   return (
      <div id="main">
         <div id="shapes-container">
            {/* <button className="btn me-2 btn-light border drawing-mode" id="move-object">
               <span class="material-symbols-outlined">swipe</span>
            </button> */}
            <button className="btn me-2 btn-light border drawing-mode" id="drawing-line">
               <img src="./line.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="drawing-free">
               <img src="./linez.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="drawing-circle">
               <img src="./circle.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="text-box">
               <img src="./text.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="eraser">
               <img src="./eraser.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border" id="clear">
               <img src="./clear.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border" id="save-json">
               <img src="./download.png" alt="" width="24px" />
            </button>
            <button className="btn me-2 btn-light border" id="load-json">
               <img src="./upload.png" alt="" width="24px" />
            </button>
            <input type="file" hidden id="input-file"></input>
         </div>
         <canvas id="canvas" width="800" height="800" style={{ border: "1px solid" }}></canvas>
      </div>
   );
}
