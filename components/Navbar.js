import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "./UserContex";

export default function Navbar({ children }) {
   const router = useRouter();
   const user = useContext(UserContext);
   const handleClick = (page) => {
      if (user.username) {
         router.push(page);
      } else router.push("/login");
   };

   return (
      <div>
         <div id="join-room" hidden></div>
         <div className="border">
            <div className="d-flex justify-content-between ">
               <div className="btn fs-3 font-weight-bold" onClick={() => handleClick("/")}>
                  Meeting
               </div>
               <div className="d-flex ">
                 {!user.username&& <div className="me-3 btn my-auto" onClick={() => handleClick("/login")}>
                     Login
                  </div>}
                  <div className="me-3 btn btn-light my-auto" onClick={() => handleClick("/joinroom")}>
                     <img src="https://apps.google.com/static/img/exit_to_app-24px.svg?cache=571e586" alt="" />
                     Join Room
                  </div>
                  <div className=" btn btn-primary my-auto me-4" onClick={() => handleClick("/joinroom")}>
                     <img src="https://apps.google.com/static/img/videocam-24px.svg?cache=793159b" alt="" />
                     Start
                  </div>
               </div>
            </div>
         </div>
         {children}
      </div>
   );
}
