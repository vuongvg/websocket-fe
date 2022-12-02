import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { fetchApiLogin } from "../../common/fetchApi";
import { useRouter } from "next/router";
import Head from "next/head";
import UserContext from "../../components/UserContex";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [data, setData] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const user = useContext(UserContext);
   const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      setIsLoading(true);
      const result = await fetchApiLogin({ email, password });
      // user.login(result.user)
      setIsLoading(false);
      setData(result);
   };

   useEffect(() => {
      if (data.token) { 
         router.push("/joinroom");
         user.username= email
      }
   }, [data]);

   return (
      <>
         <Head>
            <title>Login</title>
         </Head>
         {/* Log In Section Start */}
         <div className="login-section">
            <div className="materialContainer">
               <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="box">
                     <div className="login-title">
                        <h2>Login</h2>
                     </div>
                     <div className="valid-feedback d-block text-danger">{!data.token && data.error}</div>
                     <div className="input">
                        <label htmlFor="email">{!email && "Email"}</label>
                        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="spin"></span>
                     </div>

                     <div className="input">
                        <label htmlFor="password">{!password && "Password"}</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="spin"></span>
                     </div>
                     
                     <div className="button login">
                        <button type="submit">
                           {isLoading ? (
                              <div className="spinner-border text-light spinner-border-sm" role="status">
                                 <span className="sr-only">Loading...</span>
                              </div>
                           ) : (
                              <span className="m-0">Log In</span>
                           )}
                        </button>
                     </div>

                     <p>
                        Not a member?{" "}
                        <Link href="/register">
                           {/* <a className="theme-color"> */}
                              Register now
                           {/* </a> */}
                        </Link>
                     </p>
                  </div>
               </form>
            </div>
         </div>
         {/* Log In Section End */}
      </>
   );
}

export default Login;
