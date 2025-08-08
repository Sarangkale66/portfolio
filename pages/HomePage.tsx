"use client"
import SmoothScrolling from "@/hooks/SmoothScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

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
      y: "-100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".next-section",
        start: "top bottom", // starts when next section bottom hits viewport
        end: "top top", // finishes when next section is fully in place
        scrub: true,
        markers: true
      }
    })
  }, [])

  return (
    <SmoothScrolling>
      <>
        <div ref={mainRef} className="h-screen relative">
          <div ref={boxRef} className="box w-10 h-10 bg-red-200 ">Hello World</div>
        </div>
        <div className="h-full w-full">
          <div className="next-section box w-full h-[20%] md:h-[42%] bg-zinc-800 font-bold rounded-y-2xl text-3xl lg:text-8xl  mx-auto text-center">EAT CODE SLEEP REPEAT</div>
          <div className="next-section w-full h-full bg-white">
            done and dusted
            <div className="h-20 w-20 bg-white"></div>
          </div>
          <div className="next-section w-full h-full bg-blue-300">done and dusted</div>
          <div className="next-section bg-black h-screen relative">
            <div className="w-10 h-10 bg-red-200 ">Hello World</div>
          </div>
        </div>
      </>
    </SmoothScrolling>
  );
}