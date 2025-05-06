"use client"
import { useTheme } from "@/components/ContextAPI";
import React, { useEffect } from "react";

export default function LoadComponent({ children }: Readonly<{ children: React.ReactNode; }>){
  const { LoadingScreenDown }=useTheme();
    useEffect(()=>{
      LoadingScreenDown();
    },[LoadingScreenDown]);
  return <>
   { children }
  </>
}