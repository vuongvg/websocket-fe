import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import UserContext from "../components/UserContex";

export default function Joinroom() {
   const userCtx = useContext(UserContext);
   const [valueInput, setValueInput] = useState("");
   const [roomCode] = useState(ramdomString());
   const router = useRouter();
   const { socketClient } = userCtx;
   const userID = userCtx.username;

   const handleChange = (e) => setValueInput(e.target.value);

   const handleClick = (action) => {
      switch (action) {
         case "create-room":
            if (!userCtx.username) router.push("/login");
            socketClient.emit("createRoom", { roomName: roomCode, userCreate: userID });
            setValueInput(roomCode);
            break;
         case "join-room":
            const roomName = document.getElementById("room").value;
            document.getElementById("feedback").innerText = "You will join the meeting when someone gives you permission.";
            socketClient.emit("joinRoom", { room: roomName, userID });
            break;
         case "btn-copy":
            console.log("copy");
            const copyText = document.getElementById("room");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
            break;

         default:
            break;
      }
   };

   useEffect(() => {
      socketClient.on("resultLoginRoom", ({ joinRoom, socketIDUser, room, userID }) => {
         console.log(`  ~ resultLoginRoom`);
         if (joinRoom) {
            router.push("/room?r=" + document.getElementById("room").value);
         } else {
            document.getElementById("feedback").innerText = "Someone on the call declined your request to join";
         }
      });

      socketClient.on("joinRoom", (data) => {
         console.log(data.msg);
         if(data.msg)return document.getElementById("feedback").innerText =data.msg
         const { userCreate, roomName } = data;
         if (userCreate === userID) {
            router.push("/room?r=" + roomName);
         } else socketClient.emit("LoginRoom", { room: roomName, userID });
      });
   }, []);

   useEffect(() => {
      if (valueInput.trim().length > 0) {
         document.getElementById("btn_join_room").removeAttribute("hidden");
      } else document.getElementById("btn_join_room").setAttribute("hidden", true);
   }, [valueInput]);

   return (
      <div id="create_room" className="d-flex container">
         <div className="">
            <div className="" style={{ height: "500px" }}></div>
            <div className="d-flex position-relative">
               <button className="btn btn-primary" onClick={() => handleClick("create-room")}>
                  Start meeting
               </button>

               <p className="btn my-auto me-2">Or</p>

               <div className="position-relative me-2 border">
                  <span
                     className="material-symbols-outlined position-absolute ms-2"
                     style={{ right: "0px", top: "5px", zIndex: 1 }}
                     role="button"
                     onClick={() => handleClick("btn-copy")}
                  >
                     content_copy
                  </span>
                  <input
                     name="room"
                     id="room"
                     className="btn  me-4"
                     style={{ background: 'url("https://apps.google.com/static/img/keyboard-24px.svg") no-repeat 6px 6px' }}
                     placeholder="Enter meeting code"
                     value={valueInput}
                     onChange={(e) => handleChange(e)}
                  ></input>
               </div>

               <button className=" btn btn-light" id="btn_join_room" onClick={() => handleClick("join-room")} hidden>
                  Join room
               </button>
            </div>
            <div className="mt-3 text-danger" id="feedback"></div>
         </div>
         <div className="mx-auto my-auto">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkku_s0Ae3eR35Vgn-Jl6PWlOLh8O9Re5rDw&usqp=CAU" alt="" /> */}
         </div>
      </div>
   );
}

const ramdomString = () => Math.random().toString(36).substr(2, 9);
