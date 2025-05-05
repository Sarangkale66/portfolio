"use client"
import { useTheme } from "@/component/ContextAPI";
import React, { useEffect } from "react";

export default function({ children }: Readonly<{ children: React.ReactNode; }>){
  const { LoadingScreenDown }=useTheme();
    useEffect(()=>{
      LoadingScreenDown();
    },[]);
  return <div className="h-full w-full bg-slate-200 text-black">
        { children }
      </div> 
}