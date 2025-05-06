"use client"
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import TerminalUse from "@/components/magicui/terminal";
import React from "react";

const FirstPage = React.memo(()=>{

  return <div className="relative h-full w-full font-extrabold flex flex-col gap-7 md:flex-row justify-center items-center">
  <Meteors />
  <div className="cursor-default py-3 tracking-wider text-center w-fit">
    <BlurFade delay={0.5}>
      <ShinyButton className="bg-zinc-300 mb-10" >Software Developement Engineer</ShinyButton>
      <SparklesText>
      <p  className="font-myfont-1 text-5xl md:text-7xl text-stroke">
        <span className="text-orange-500">S</span>AR<span className="text-white">A</span><span className="text-blue-500">N</span>G <span className="text-green-500">K</span>ALE
      </p>
      </SparklesText>
    </BlurFade>
  </div>
  <div className="w-1/2 hidden md:flex md:justify-center md:items-center">
    <div className="max-w-xl mx-auto">
    { <BlurFade delay={1} duration={0.2}>
      <TerminalUse/> 
      </BlurFade> } 
    </div>
  </div>
</div>
})

const SecondPage = React.memo(()=>{
  return (<>
        <div className="h-full md:hidden w-full p-6">
          <TerminalUse/>
        </div>
  </>);
});

const HomePage =()=>{
  return(<>
  <div  className="cursor-default h-full bg-zinc-900 w-full text-black  overflow-x-hidden" >
    <FirstPage/>
    <SecondPage/>
    <div className="h-full w-full">
    </div>
    <div className="h-full w-full"></div>
    <div className="h-full w-full"></div>
  </div>
  </>);
}

export default HomePage;