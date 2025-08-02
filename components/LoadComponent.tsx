"use client"
import { useTheme } from "@/components/ContextAPI";
import { useEffect, memo } from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./magicui/terminal";
import { usePathname } from "next/navigation";

export const TerminalUse = memo(() => {
  const lines = `sarang
  ├── project
  ├── skills
  │   ├── hard skill
  │   └── soft skill
  ├── winnings
  │   └── hackthons
  ├── contact
  └── resume`;

  const delay = 1000;
  const time = 1000 + delay;
  const { newline, LoadingScreenDown, terminalRef } = useTheme();

  return <>
    <Terminal ref={terminalRef} >
      <span className="flex text-md font-bold">@root123~ <TypingAnimation delay={delay} className="mt-[1.5px] font-normal">ls</TypingAnimation></span>
      <span><AnimatedSpan className="text-blue-500 font-extrabold" delay={time}>app bin root sarang trash</AnimatedSpan></span>
      <span className="flex">
        <AnimatedSpan className="font-bold text-md" delay={time}>@root123~ </AnimatedSpan>
        <TypingAnimation className="mt-[1.5px]" delay={time * 1.7} >cd sarang</TypingAnimation>
      </span>
      <AnimatedSpan delay={time * 2.5}>{lines}</AnimatedSpan>
      {
        newline.map((value, index) => (<div key={index} >
          <span className="flex" >
            <AnimatedSpan className="font-bold text-md" delay={(index === 0) ? (time * 3) : (0)}>@root123~ </AnimatedSpan>
            <TypingAnimation className="mt-[1.5px]" delay={(index === 0) ? (time * 3.1) : (1500)}>{"cd " + value}</TypingAnimation>
          </span>
          <span className="flex">
            <AnimatedSpan delay={(index === 0) ? (time * 3.5) : (2000)}>processing... </AnimatedSpan>
            <AnimatedSpan className="font-bold text-md text-green-500" onComplete={() => { setTimeout(() => { LoadingScreenDown() }, 1000) }} delay={(index === 0) ? (time * 4) : (3000)}> ✓done</AnimatedSpan>
          </span>
        </div>))
      }
    </Terminal>
  </>
});

TerminalUse.displayName = "TerminalUse";

export default function LoadComponent({ children }: Readonly<{ children: React.ReactNode; }>) {
  const { addNewLine } = useTheme();
  const pathname = usePathname();
  // const router = useRouter();

  useEffect(() => {
    const path: string = pathname || " ";
    addNewLine(path);
  }, [pathname, addNewLine]);

  return <>
    {children}
  </>
}