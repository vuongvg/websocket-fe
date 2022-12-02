import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Index() {
   console.log("home");
   const router=useRouter()
   useEffect(() => {
      router.push('/joinroom')
   }, [])
   
   return <div className="">home</div>;
}
