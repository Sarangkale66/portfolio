'use client'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { createContext, useContext, ReactNode, useRef, RefObject } from 'react'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

type loadingRefType = HTMLDivElement|null

interface ThemeContextType {
  loadingRef:RefObject<loadingRefType>;
  pageRef:RefObject<loadingRefType>;
  LoadingScreenDown:()=>void;
  LoadingScreenUp:()=>void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider ({ children }: { children: ReactNode }){
  const loadingRef = useRef<loadingRefType>(null);
  const pageRef = useRef<loadingRefType>(null);
  
  const LoadingScreenDown = ()=>{
    gsap.to(loadingRef.current,{
      delay:2.5,
      translateY:"100%",
      duration:0.5,
    });
  }
  
  const LoadingScreenUp = ()=>{
    gsap.to(loadingRef.current,{
      translateY:"0%",
      duration:0.5,
    })
  }

  useGSAP(() => {
    // LoadingScreenUp();
    gsap.set(pageRef.current,{
      ScrollTrigger:{
        marker:true
      }
    })
  },[]);
 
  return (
    <ThemeContext.Provider value={{ loadingRef, pageRef, LoadingScreenDown, LoadingScreenUp }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
