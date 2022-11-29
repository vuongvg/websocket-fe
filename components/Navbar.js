import React from "react";
import { useRouter } from 'next/router'

export default function Navbar({ children }) {
    const router = useRouter()

    const handleClick=(page)=>{
        router.push(page)
    }

   return (
      <div>
         <div id="join-room" hidden></div>
         <div className="border">
            <div className="d-flex justify-content-between ">
               <div className="btn fs-3 font-weight-bold" onClick={()=>handleClick('/')}>Meeting</div>
               <div className="d-flex ">
                  <div className="me-3 btn my-auto" onClick={()=>handleClick('/auth')}>Login</div>
                  <div className="me-3 btn btn-light my-auto" onClick={()=>handleClick('/auth')}>
                     <img src="https://apps.google.com/static/img/exit_to_app-24px.svg?cache=571e586" alt="" />
                     Join Room
                  </div>
                  <div className=" btn btn-primary my-auto" onClick={()=>handleClick('/joinroom')}>
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
