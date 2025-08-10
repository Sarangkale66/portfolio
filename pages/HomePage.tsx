"use client"
import SmoothScrolling from "@/hooks/SmoothScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import CurvedLoop from "@/components/reactbits/TextAnimations/CurvedLoop/CurvedLoop";
import {
  Trophy,

} from "lucide-react"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { FlipButton } from "@/components/animate-ui/buttons/flip";
import Link from "next/link";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {

  const mainRef = useRef(null);
  const boxRef = useRef(null);
  const router = useRouter();

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

    router.prefetch("/page");
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
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0 ">
            <div className="row-span-3 grid grid-rows-subgrid border-r-1 border-b-0"></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-sm md:text-xl tracking-widest border-0"><p className="inter-para">ACTIVITIES <Trophy className="inline-block" /> WINNINGS</p></div>
              <div className="grid grid-cols-2 md:grid-rows-1 md:grid-cols-6 row-span-2 ">
                <div className="border-1 border-l-0 border-b-0 md:border-b-1 "></div>
                <div className="border-1 border-l-0 border-b-0 md:border-b-1 border-r-0 md:border-r-1"></div>
                <div className="border-1 border-l-0 border-b-0 md:border-b-1"></div>
                <div className="border-1 border-l-0 border-b-0 md:border-b-1 border-r-0 md:border-r-1"></div>
                <div className="border-1 border-l-0"></div>
                <div className="border-1 border-l-0 border-r-0"></div>
              </div>
              <div className="row-span-7 md:row-span-7 flex flex-col md:flex-row md:items-center">
                <div className="h-full border-r md:w-[50%] flex items-center justify-center text-2xl px-3 md:px-10 font-bold">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-3 md:px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid border-l"></div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid "></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="grid md:grid-rows-1 grid-cols-2 row-span-1 text-sm md:text-xl font-bold">
                <div onClick={() => { router.push("/page") }} className="border-l border-r-2 flex justify-center items-center">
                  <FlipButton frontText="PROJECT" backText="PROJECT" />
                </div>
                <div className="border-l border-r border-t flex justify-center items-center">
                  <FlipButton frontText="SKILLS" backText="SKILLS" />
                </div>
              </div>
              <div className="border border-b-0 row-span-10 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:h-full border-r md:w-[50%] flex items-center justify-center text-2xl px-3 md:px-10 font-bold">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-3 md:px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid"></div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid"></div>
            <div className="row-span-3 grid grid-rows-11  col-span-28">
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-md md:text-xl tracking-wider border-t border-r border-l border-b">WE WORK WITH THE WORLDS TOP BRANDS</div>
              <div className=" border border-b-0 border-t-0 row-span-7 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:h-full md:w-[50%] flex items-center justify-center text-2xl px-3 md:px-10 font-bold md:border-r">
                  <p className="md:text-5xl">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-3 md:px-10 flex md:items-center">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
              </div>
              <div className="grid grid-rows-0 grid-cols-6 md:grid-cols-12 row-span-1">
                <div className="border border-t-0 col-span-6 hidden sm:block"></div>
                <div onClick={() => { router.push("http://wa.me/7038714158") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<WhatsAppIcon fontSize="large" />} backText={<WhatsAppIcon fontSize="large" />} /></div>
                <div onClick={() => { router.push("https://www.linkedin.com/in/sarangkale66") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<LinkedInIcon fontSize="large" />} backText={<LinkedInIcon fontSize="large" />} /></div>
                <div onClick={() => { router.push("https://www.github.com/sarangkale66") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<GitHubIcon fontSize="large" />} backText={<GitHubIcon fontSize="large" />} /></div>
                <div onClick={() => { router.push("https://www.instagram.com/thenameis_sarang") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<InstagramIcon fontSize="large" />} backText={<InstagramIcon fontSize="large" />} /></div>
                <div onClick={() => { router.push("https://mail.google.com/mail/?view=cm&fs=1&to=sarangkale66@gmail.com&su=Contact%20Request&body=Hello%20Sarang%2C%0A%0AI%20hope%20this%20message%20finds%20you%20well.%20I%20came%20across%20your%20profile%20and%20was%20impressed%20by%20your%20work.%20I%20would%20like%20to%20connect%20with%20you%20regarding%20potential%20collaboration%20or%20to%20discuss%20an%20opportunity%20that%20might%20be%20of%20interest.%0A%0APlease%20let%20me%20know%20a%20convenient%20time%20to%20have%20a%20conversation.%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<EmailIcon fontSize="large" />} backText={<EmailIcon fontSize="large" />} /></div>
                <div onClick={() => { router.push("tel:+917038714158") }} className="border-1 flex items-center justify-center"><FlipButton frontText={<PhoneInTalkIcon fontSize="large" />} backText={<PhoneInTalkIcon fontSize="large" />} /></div>
              </div>
            </div>
          </div>
        </div>
      </>
    </SmoothScrolling>
  );
}