import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../components/UserContex";

export default function Login() {
   const router = useRouter();
   const UserCtx = useContext(UserContext);

   const handleSubmit = (e) => {
      e.preventDefault();
      router.push("/joinroom");
      UserCtx.username= document.getElementById("username").value
   };

   return (
      <div className="container-sm d-flex justify-content-center" style={{ width: "300px" }}>
         <form className="col border border-danger" id="login" onSubmit={(e) => handleSubmit(e)}>
            <div style={{ height: "50px" }}></div>
            <div className="col-auto m-4">
               <label htmlFor="staticEmail2" className="visually-hidden">
                  Email
               </label>
               <input type="text" id="username" className="form-control" defaultValue="test" />
            </div>
            <div className="col-auto m-4">
               <label htmlFor="inputPassword2" className="visually-hidden">
                  Password
               </label>
               <input type="password" id="password" className="form-control" placeholder="Password" />
            </div>
            <div className="col-auto m-4 d-flex justify-content-center">
               <div className="">
                  <button type="submit" className="btn btn-primary mb-3">
                     Login
                  </button>
                  <p role={'button'}>Register</p>
               </div>
            </div>
         </form>
      </div>
   );
}
