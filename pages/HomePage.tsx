"use client"
import SmoothScrolling from "@/hooks/SmoothScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import CurvedLoop from "@/components/reactbits/TextAnimations/CurvedLoop/CurvedLoop";

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const mainRef = useRef(null);
  const boxRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "200% top",
      pin: boxRef.current,
      pinSpacing: false
    })

    gsap.to(".next-section", {
      y: "-150%",
      ease: "none",
      scrollTrigger: {
        trigger: ".next-section",
        start: "top bottom",
        end: "top top",
        scrub: true,
      }
    })
  }, [])

  return (
    <SmoothScrolling>
      <>
        <div ref={mainRef} className="h-screen relative">
          <div ref={boxRef} className="box w-full h-full ">Hello World</div>
        </div>
        <div className="h-full w-full">
          <div className="next-section box w-full border-t-1 bg-black border-white h-[20%] md:h-[42%] font-bold text-2xl lg:text-7xl overflow-hidden mx-auto text-center relative">
            <CurvedLoop
              marqueeText="EAT ✦ CODE ✦ SLEEP ✦ REPEAT ✦"
              speed={1.1}
              curveAmount={-10}
              direction="right"
              interactive={true}
              className="text-8xl z-50 w-full"
            />
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid "></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-sm md:text-xl tracking-wider border-1 border-zinc-400"><p className="inter-para">WE WORK WITH THE WORLDS TOP BRANDS</p></div>
              <div className="grid grid-cols-2 md:grid-rows-1 md:grid-cols-6 row-span-3">
                <div className="border-1 border-zinc-400">01</div>
                <div className="border-1 border-zinc-400">02</div>
                <div className="border-1 border-zinc-400">03</div>
                <div className="border-1 border-zinc-400">04</div>
                <div className="border-1 border-zinc-400">05</div>
                <div className="border-1 border-zinc-400">06</div>
              </div>
              <div className=" border-1 border-zinc-400 row-span-7 md:row-span-6 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:w-[50%] flex items-center justify-center text-2xl px-10 font-bold">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid border-1 border-zinc-400"></div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid border-1 border-zinc-400"></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="grid grid-cols-3 md:grid-rows-1 md:grid-cols-3 row-span-1 text-xl font-bold">
                <div className="border-1 border-zinc-400 flex justify-center items-center">PROJECT</div>
                <div className="border-1 border-zinc-400 flex justify-center items-center">SKILLS</div>
                <div className="border-1 border-zinc-400 flex justify-center items-center">WINNINGS</div>
              </div>
              <div className=" border-1 border-zinc-400 row-span-9 md:row-span-6 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:w-[50%] flex items-center justify-center text-2xl px-10 font-bold">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
              <div className="border-1 border-zinc-400"></div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid border-1 border-zinc-400"></div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid border-1 border-zinc-400"></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-md md:text-xl tracking-wider border-1 border-zinc-400">WE WORK WITH THE WORLDS TOP BRANDS</div>
              <div className="grid grid-cols-2 md:grid-rows-1 md:grid-cols-6 row-span-3">
                <div className="border-1 border-zinc-400">01</div>
                <div className="border-1 border-zinc-400">02</div>
                <div className="border-1 border-zinc-400">03</div>
                <div className="border-1 border-zinc-400">04</div>
                <div className="border-1 border-zinc-400">05</div>
                <div className="border-1 border-zinc-400">06</div>
              </div>
              <div className=" border-1 border-zinc-400 row-span-7 md:row-span-6 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:w-[50%] flex items-center justify-center text-2xl px-10 font-bold">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid border-1 border-zinc-400"></div>
          </div>
        </div>
      </>
    </SmoothScrolling>
  );
}