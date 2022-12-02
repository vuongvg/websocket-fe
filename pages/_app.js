import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import UserContext from "../components/UserContex";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../styles/vendors/bootstrap.css";
import "../styles/vendors/font-awesome.css";
import "../styles/vendors/feather-icon.css";
import "../styles/vendors/animate.css";
import "../styles/vendors/slick/slick.css";
import "../styles/vendors/slick/slick-theme.css";
import "../styles/globals.css";
import "../styles/compare.css";
import "../styles/product-card.css";

// const url="http://localhost:5001"
const url='https://websocket-yrjr.onrender.com/'

function MyApp({ Component, pageProps }) {
   const [user] = useState({ username: null, socketClient: io(url, { transports: ["websocket", "polling"] }) });
   const [show, setShow] = useState(false);
   const [userJoinRoom, setUserJoinRoom] = useState({});
   const { socketClient } = user;

   const handleClose = (result) => {
      console.log(`  ~ result`, result);
      setShow(false);
      socketClient.emit("resultLoginRoom", { ...result, ...userJoinRoom }); 
   };

   //    useEffect(() => {
   //       const script = document.createElement('script');
   //       // You may have to replace this code with your path.
   //       script.src = "../public/fabric.js";
   //       script.async = true;
   //       document.body.appendChild(script);
   //       return () => {
   //           document.body.removeChild(script);
   //       }
   //   }, []);

   useEffect(() => {
      socketClient.on("errorSocket", ({ msg, at }) => {
         console.log("errorSocket", msg, at);
      });

      socketClient.on("loginRoom", ({ room, userID, socketIDUser }) => {
         console.log(`loginRoom`);
         setShow(true);
         setUserJoinRoom({ room, userID, socketIDUser });
      });
   }, []);

   return (
      <>
         <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
               rel="stylesheet"
               href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
               integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
               crossorigin="anonymous"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
         </Head>

         <div className="" id="login_room">
            <Modal show={show} onHide={() => handleClose({ joinRoom: false })}>
               <Modal.Header closeButton>
                  <Modal.Title>{userJoinRoom.userID} join room</Modal.Title>
               </Modal.Header>
               <Modal.Footer>
                  <Button variant="primary" onClick={() => handleClose({ joinRoom: true })}>
                     Yes
                  </Button>
                  <Button variant="secondary" onClick={() => handleClose({ joinRoom: false })}>
                     No
                  </Button>
               </Modal.Footer>
            </Modal>
         </div>

         <UserContext.Provider value={user}>
            <Navbar>
               <Component {...pageProps} />
            </Navbar>
         </UserContext.Provider>

         <Script
            src="https://cdn.socket.io/4.5.3/socket.io.min.js"
            integrity="sha384-WPFUvHkB1aHA5TDSZi6xtDgkF0wXJcIIxXhC6h8OT8EH3fC5PWro5pWJ1THjcfEi"
            crossorigin="anonymous"
         ></Script>
         <Script  src="https://unpkg.com/fabric@latest/dist/fabric.js"></Script>
         {/* <Script   src="https://unpkg.com/fabric@latest/src/mixins/eraser_brush.mixin.js"></Script> */}
      </>
   );
}

export default MyApp;
