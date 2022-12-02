import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { fetchApiRegister } from "../../common/fetchApi";

function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rePassword, setRePassword] = useState("");
   const [data, setData] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      const rePassword = e.target[2].value;
      if (password !== rePassword && password) {
         setData({ error: "Password does not match" });
         return;
      }
      setIsLoading(true);
      const result = await fetchApiRegister({ email, password });
      setIsLoading(false);
      setData(result);
   };
   useEffect(() => {
      if (data.infoUser) {
         router.push("/login");
      }
   }, [data]);
   return (
      <div className="login-section">
         <div className="materialContainer">
            <form onSubmit={(e) => handleSubmit(e)}>
               <div className="box">
                  <div className="login-title">
                     <h2>Register</h2>
                  </div>
                  <div className="valid-feedback d-block text-danger">{!data.token && data.error}</div>

                  <div className="input">
                     <label htmlFor="email">{!email && "Email Address"}</label>
                     <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                     <span className="spin"></span>
                  </div>
       
                  <div className="input">
                     <label htmlFor="password">{!password && "Password"}</label>
                     <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                     <span className="spin"></span>
                  </div>

                  <div className="input">
                     <label htmlFor="repassword">{!rePassword && "Confirm Password"}</label>
                     <input type="password" id="repassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                     <span className="spin"></span>
                  </div>

                  <div className="button login">
                     <button>
                        {isLoading ? (
                           <div className="spinner-border text-light spinner-border-sm" role="status">
                              <span className="sr-only">Loading...</span>
                           </div>
                        ) : (
                           <span className="m-0">Register</span>
                        )}
                     </button>
                  </div>

                  <p>
                     <Link href="/login">
                        {/* <a className="theme-color"> */}
                            Already have an account?
                            {/* </a> */}
                     </Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Register;
