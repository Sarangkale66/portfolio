"use client"
import { BlurFade } from "@/components/magicui/blur-fade";
import { Meteors } from "@/components/magicui/meteors";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import TerminalUse from "@/components/magicui/terminal";
import React from "react";

const FirstPageComponent = ()=>{

  return <div className="relative h-full w-full font-extrabold flex flex-col  gap-7 lg:flex-row justify-center items-center">
  <Meteors />
  <div className="cursor-default py-3 relative tracking-wider text-center w-fit md:h-1/4">
    <BlurFade delay={0.5} className="-mt-64 md:mt-10 lg:-mt-10">
      <ShinyButton className="bg-zinc-300 mb-8" >Software Developement Engineer</ShinyButton>
      <SparklesText>
        <p className="font-myfont-1 text-7xl md:text-7xl text-stroke">
          <span className="text-orange-500">S</span>AR<span className="text-white">A</span><span className="text-blue-500">N</span>G <span className="text-green-500">K</span>ALE
        </p>
      </SparklesText>
    </BlurFade>
  </div>
  <div className="w-1/2 md:h-1/2 hidden md:flex md:justify-center md:items-start lg:items-center">
    <div className="max-w-xl mx-auto">
    { <BlurFade delay={1} duration={0.2}>
      <TerminalUse/> 
      </BlurFade> } 
    </div>
  </div>
</div>
}

const FirstPage = React.memo(FirstPageComponent);
FirstPage.displayName = "FirstPage";

const SecondPageComponent = ()=>{
  return (<>
        <div className="h-full md:hidden w-full p-6">
          <TerminalUse/>
        </div>
  </>);
}

const SecondPage = React.memo(SecondPageComponent);
SecondPage.displayName = "SecondPage";

export default function HomePage(){
  return(<>
  <div className="cursor-default h-full bg-zinc-900 w-full text-black  overflow-x-hidden" >
    <FirstPage/>
    <SecondPage/>
    <div className="h-full w-full">
    </div>
    <div className="h-full w-full"></div>
    <div className="h-full w-full"></div>
  </div>
  </>);
}
