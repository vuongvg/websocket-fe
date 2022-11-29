import React, { useContext, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { drawingLineFn, runDrawingLine, startDrawingLine, stopDrawingLine } from "../../drawing/drawingLine";
import { drawingFreeFn, runDrawingFree, startDrawingFree, stopDrawingFree } from "../../drawing/drawingFree";
import UserContext from "../../components/UserContex";
import { useRouter } from "next/router";
import drawing from "../../drawing";

export default function Room() {
   const userCtx = useContext(UserContext);
   const router = useRouter();
   const { room } = router.query;
   const modeDrawing = useRef("");
   console.log("render");
   const { socketClient, username } = userCtx;

   // useEffect(() => {
   //    setCanvas(
   //       new fabric.Canvas("canvas", {
   //          width: window.innerWidth,
   //          heigh: window.innerHeight,
   //       })
   //    );
   // }, []);

   // const data = { canvas, modeDrawing: modeDrawing.current, mouseDown: mouseDown.current, socket: socketClient, userID: username };

   // // const selectModeDrawing = function(element)  {
   // const selectModeDrawing = ({id,mode}) => {
   //    const drawingMode = document.querySelectorAll(".drawing-mode");
   //    drawingMode.forEach((element) => element.classList.replace("btn-primary", "btn-light"));
   //    document.getElementById(id).classList.replace("btn-light", "btn-primary");
   //    modeDrawing.current=mode
   //    let line
   //    canvas.on("mouse:down", (obj) => {
   //       switch (mode) {
   //          case 'line':
   //             startDrawingLine({...data,line,obj})
   //             break;

   //          default:
   //             break;
   //       }
   //    });
   //    canvas.on("mouse:move", (obj) => {
   //       switch (mode) {
   //          case 'line':
   //             runDrawingLine({...data,line,obj})
   //             break;

   //          default:
   //             break;
   //       }
   //    });
   //    canvas.on("mouse:up", (obj) => {
   //       switch (mode) {
   //          case 'line':
   //             stopDrawingLine({...data,line,obj})
   //             break;

   //          default:
   //             break;
   //       }
   //    });
   // };

   // socketClient.on("drawing", (data) => {
   //    canvas.loadFromJSON(data, () => {
   //       canvas.renderAll();
   //    });
   // });

   useEffect(() => {
      const canvas = new fabric.Canvas("canvas", {
         width: window.innerWidth,
         heigh: window.innerHeight,
      });
      const drawingMode = document.querySelectorAll(".drawing-mode");
      let mouseDown = false;

      const selectModeDrawing = (element, mode) => {
         modeDrawing.current = mode;
         drawingMode.forEach((elm) => elm.classList.replace("btn-primary", "btn-light"));
         element.classList.replace("btn-light", "btn-primary");
      };
      canvas.on("mouse:down", (obj) => {
         mouseDown = true;
         drawing[modeDrawing.current].startDrawing({ canvas, obj, modeDrawing: modeDrawing.current, mouseDown })
      });

      canvas.on("mouse:move", (obj) => {
         if(modeDrawing.current==='')return
         drawing[modeDrawing.current].moveDrawing({ canvas, obj, modeDrawing: modeDrawing.current, mouseDown })
      });

      canvas.on("mouse:up", (obj) => {
         mouseDown = false;
         drawing[modeDrawing.current].stopDrawing({ canvas, mouseDown,socket:socketClient })
      });

      document.getElementById("drawing-line").addEventListener("click", function () {
         selectModeDrawing(this, "line");
      });

      document.getElementById("drawing-free").addEventListener("click", function () {
         selectModeDrawing(this, "free");
      });

      document.getElementById("drawing-circle").addEventListener("click", function () {
         selectModeDrawing(this, "circle");
      });

      socketClient.on("load-data", (data) => {
         console.log(" data  client", data);
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
            <button
               className="btn me-2 btn-light border drawing-mode"
               id="drawing-line"
            >
               <span className="material-symbols-outlined">line_start</span>
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="drawing-free">
               <span className="material-symbols-outlined">conversion_path</span>
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="drawing-circle">
               <span className="material-symbols-outlined">circle</span>
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="text-box">
               <span className="material-symbols-outlined">text_fields</span>
            </button>
            <button className="btn me-2 btn-light border drawing-mode" id="eraser">
               <span className="material-symbols-outlined">format_ink_highlighter</span>
            </button>
            <button className="btn me-2 btn-light border" id="save-json">
               <span className="material-symbols-outlined">download</span>
            </button>
            <button className="btn me-2 btn-light border" id="load-json">
               <span className="material-symbols-outlined">upload_file</span>
            </button>
            <input type="file" hidden></input>
            <button className="btn me-2 btn-light border" id="clear">
               <span className="material-symbols-outlined">cleaning_services</span>
            </button>
            <button className="btn me-2 btn-light border" id="test">
               Test
            </button>
         </div>
         <canvas id="canvas" width="800" height="800" style={{ border: "1px solid" }}></canvas>
      </div>
   );
}
