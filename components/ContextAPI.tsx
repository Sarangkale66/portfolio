'use client'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { createContext, useContext, ReactNode, useRef, RefObject, useEffect, useState } from 'react'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger)

type loadingRefType = HTMLDivElement | null
type terminalRefType = HTMLPreElement | null;

interface ThemeContextType {
  loadingRef: RefObject<loadingRefType>;
  pageRef: RefObject<loadingRefType>;
  LoadingScreenDown: () => void;
  LoadingScreenUp: () => void;
  addNewLine: (path: string) => void;
  newline: string[];
  terminalRef: RefObject<HTMLDivElement | null>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children, }: { children: ReactNode }) {
  const loadingRef = useRef<loadingRefType>(null);
  const pageRef = useRef<loadingRefType>(null);
  const [newline, setNewLine] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const addNewLine = (path: string): void => {
    setNewLine((prev) => {
      if (prev[prev.length - 1] === path) return prev;
      return [...prev, path];
    });
  };

  const LoadingScreenDown = () => {
    gsap.to(loadingRef.current, {
      translateY: "100%",
      duration: 0.5,
    });
  }

  const LoadingScreenUp = () => {
    gsap.to(loadingRef.current, {
      translateY: "0%",
      duration: 0.5,
    })
  }

  useGSAP(() => {
    LoadingScreenUp();
  }, []);

  return (
    <ThemeContext.Provider value={{ loadingRef, pageRef, LoadingScreenDown, LoadingScreenUp, addNewLine, newline, terminalRef }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
