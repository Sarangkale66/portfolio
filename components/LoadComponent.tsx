"use client"
import { useTheme } from "@/components/ContextAPI";
import React, { useEffect } from "react";

export default function({ children }: Readonly<{ children: React.ReactNode; }>){
  const { LoadingScreenDown }=useTheme();
    useEffect(()=>{
      LoadingScreenDown();
    },[]);
  return <>
   { children }
  </>
}