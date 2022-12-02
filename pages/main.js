import React, { useEffect } from "react";

export default function Main() {
//    useEffect(() => {
//       const iframe = document.createElement("iframe");
//       iframe.src="../public/index.html"
//       iframe.width='1000px'
//       iframe.height='1000px'

//       document.getElementById("main").appendChild(iframe);
//    }, []);

   return ( 
      <div className="" id="main">
         <iframe src="../index.html" frameBorder="0" width='1000px' height='1000px'></iframe>
      </div>
   );
}
