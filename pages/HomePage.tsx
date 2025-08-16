"use client"
import SmoothScrolling from "@/hooks/SmoothScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MouseEvent, useRef, useState } from "react";
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
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BorderTopIcon from '@mui/icons-material/BorderTop';
import UpdateIcon from '@mui/icons-material/Update';
import { FlipButton } from "@/components/animate-ui/buttons/flip";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {

  const mainRef = useRef(null);
  const boxRefs = useRef<HTMLDivElement[]>([]);
  const box1Refs = useRef<HTMLDivElement[]>([]);
  const box2Refs = useRef<HTMLDivElement[]>([]);
  const preRef = useRef<HTMLDivElement[]>([]);
  const [tl, setTl] = useState<gsap.core.Timeline | undefined>(undefined);
  const [time, setTime] = useState<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();

  function handleMouseLeave(e: MouseEvent) {
    if (time) {
      clearTimeout(time);
      setTime(undefined);
    }
    const index = Number((e.currentTarget as HTMLElement).dataset.index);
    const next = boxRefs.current[index];
    const next1 = box1Refs.current[index];
    const next2 = box2Refs.current[index];
    preRef.current[0] = next;
    preRef.current[1] = next1;
    preRef.current[2] = next2;

    const t = setTimeout(() => {
      handleSlide(index + 1);
    }, 10000);
    setTime(t);
  }

  function handleMouseEnter(e: MouseEvent) {
    const index = (e.currentTarget as HTMLElement).dataset.index
    if (index === undefined) return;
    const next = boxRefs.current[Number(index)]
    const next1 = box1Refs.current[Number(index)]
    const next2 = box2Refs.current[Number(index)]

    if (tl) {
      tl.pause();
      tl.kill();
    }

    const previous = preRef.current[0]
    const previous1 = preRef.current[1]
    const previous2 = preRef.current[2]

    if (previous) gsap.killTweensOf(previous)
    if (previous1) gsap.killTweensOf(previous1)
    if (previous2) gsap.killTweensOf(previous2)

    if (next) gsap.killTweensOf(next)
    if (next1) gsap.killTweensOf(next1)
    if (next2) gsap.killTweensOf(next2)

    if (previous === next) return;
    if (previous1 === next1) return;
    if (previous2 === next2) return;

    preRef.current[0] = next
    preRef.current[1] = next1
    preRef.current[2] = next2

    if (previous) gsap.to(previous, { delay: 0.5, opacity: 0, duration: 0.5, ease: "ease.in", overwrite: "auto" })
    if (previous1) gsap.to(previous1, { top: "40%", opacity: 0, duration: 0.5, onComplete: () => { gsap.set(previous1, { top: "60%" }) } })
    if (previous2) gsap.to(previous2, { left: "100%", opacity: 0, duration: 0.5, onComplete: () => { gsap.set(previous2, { left: "-100%" }) } })

    gsap.to(next2, { left: "0%", delay: 0.5, opacity: 1, duration: 0.5 })
    gsap.to(next1, { top: "50%", delay: 0.5, opacity: 1, duration: 0.5 })
    gsap.to(next, { delay: 0.5, opacity: 1, duration: 0.5, ease: "ease.in", overwrite: "auto" })
  }

  function handleSlide(index: number = 0) {
    if (tl) {
      tl.pause();
      tl.kill();
    }

    if (preRef.current.length) {
      if (preRef.current[0]) gsap.to(preRef.current[0], { delay: 0.5, opacity: 0, duration: 0.5, ease: "ease.in", overwrite: "auto" });
      if (preRef.current[1]) gsap.to(preRef.current[1], { top: "40%", opacity: 0, duration: 0.5, onComplete: () => { gsap.set(preRef.current[1], { top: "60%" }) } });
      if (preRef.current[2]) gsap.to(preRef.current[2], { left: "100%", opacity: 0, duration: 0.5, onComplete: () => { gsap.set(preRef.current[2], { left: "-100%" }) } });
    }

    const timeline = gsap.timeline({ repeat: -1 });
    setTl(timeline);
    const sections = boxRefs.current;
    const sections1 = box1Refs.current;
    const sections2 = box2Refs.current;

    if (!sections && sections1 && sections2) return;

    for (let i: number = index; i < index + sections.length; i++) {
      let ind = (i % sections.length);
      let section = sections[ind];
      let section1 = sections1[ind];
      let section2 = sections2[ind];

      timeline
        .to({}, {
          onStart: () => {
            preRef.current[0] = section;
            preRef.current[1] = section1;
            preRef.current[2] = section2;
            gsap.set(section1, { top: "60%" })
            gsap.set(section2, { left: "-100%" })
          }
        })
        .to(section, {
          delay: 0.1,
          opacity: 1,
          duration: 0.5,
        }, `sara${ind}`)
        .to(section1, {
          delay: 0.1,
          top: "50%",
          opacity: 1,
          duration: 0.5,
        }, `sara${ind}`)
        .to(section2, {
          delay: 0.1,
          left: "0%",
          opacity: 1,
          duration: 0.5,
        }, `sara${ind}`)
        .to(section, {
          opacity: 0,
          duration: 0.5,
          delay: 6
        }, `tara${ind}`)
        .to(section1, {
          top: "40%",
          opacity: 0,
          duration: 0.5,
          delay: 6
        }, `tara${ind}`)
        .to(section2, {
          left: "100%",
          duration: 0.5,
          delay: 6
        }, `tara${ind}`)
        .to({}, {
          duration: 0.05, onStart: () => {
            gsap.set(section1, { top: "60%" })
            gsap.set(section2, { left: "-100%" })
            preRef.current[0] = sections[(ind + 1) % sections.length];
            preRef.current[1] = sections1[(ind + 1) % sections.length];
            preRef.current[2] = sections2[(ind + 1) % sections.length];
          }
        });
    };
  }

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "200% top",
      pinSpacing: true,
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

    handleSlide();

    router.prefetch("/page");
  }, [])

  return (
    <SmoothScrolling>
      <>
        <div ref={mainRef} className="h-screen flex justify-center bg-amber-500 items-center relative">
          Hello world
        </div>
        <div className="h-full w-full inter-para">
          <div className="next-section box w-full border-t-1 bg-black border-white h-[20%] md:h-[42%] font-bold overflow-hidden mx-auto text-center relative">
            <div className="md:mt-5 relative">
              <CurvedLoop
                marqueeText="EAT ✦ CODE ✦ SLEEP ✦ REPEAT ✦"
                speed={1.1}
                curveAmount={-10}
                direction="right"
                interactive={true}
                className="text-6xl md:text-8xl z-50 w-full inter-para"
              />
            </div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0 border-zinc-300 md:border-zinc-400 ">
            <div className="row-span-3 grid grid-rows-subgrid border-r-1 border-b-0 border-zinc-300 md:border-zinc-400"></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-sm md:text-xl tracking-widest border-0 border-zinc-400 md:border-zinc-400"><p className="inter-para">ACTIVITIES &nbsp; <Trophy className="inline-block" /> &nbsp; WINNINGS &nbsp;</p></div>
              <div className="grid grid-cols-6 md:grid-rows-1 md:grid-cols-6 md:row-span-2">
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="0" className="border-1 cursor-pointer border-l-0 border-b-0 md:border-b-1 border-zinc-300 md:border-zinc-400 flex justify-center items-center">
                  <FlipButton frontText={<ShieldIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<VerifiedUserIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="1" className="border-1 cursor-pointer border-l-0 border-b-0 md:border-b-1 border-r-0 md:border-r-1 border-zinc-300 md:border-zinc-400">
                  <FlipButton frontText={<SettingsInputAntennaIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<SettingsInputAntennaIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="2" className="border-1 cursor-pointer border-l-0 border-b-0 md:border-b-1 border-zinc-300 md:border-zinc-400">
                  <FlipButton frontText={<AutoFixNormalIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<AutoFixNormalIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="3" className="border-1 cursor-pointer border-l-0 border-b-0 md:border-b-1 border-r-0 md:border-r-1 border-zinc-300 md:border-zinc-400">
                  <FlipButton frontText={<AutoAwesomeIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<AutoAwesomeIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="4" className="border-1 cursor-pointer border-l-0 border-zinc-300 md:border-zinc-400">
                  <FlipButton frontText={<BorderTopIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<BorderTopIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
                <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} data-index="5" className="border-1 cursor-pointer border-l-0 border-r-0 border-zinc-300 md:border-zinc-400">
                  <FlipButton frontText={<UpdateIcon className="md:scale-175 scale-75" fontSize="large" />} backText={<UpdateIcon className="md:scale-175 scale-75" fontSize="large" />} />
                </div>
              </div>
              <div className="row-span-7 md:row-span-7 flex flex-col md:flex-row md:items-center">
                <div className="h-full border-r md:w-1/2 flex
                 items-center justify-center text-2xl font-bold relative overflow-hidden">
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full flex justify-center bg-[#282828] absolute left-[-100%] top-0">
                    <img className="h-full w-[98%] absolute" src="/images/Screenshot_2025-08-16_085156.webp" alt="image1" />
                  </div>
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full absolute left-[-100%] top-0">
                    <img className="h-full w-full absolute bg-contain" src="https://ik.imagekit.io/sheryians/dark-logo_TwETv_UJBX.png" alt="image1" />
                  </div>
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full absolute left-[-100%] top-0">
                    <img className="h-full w-full absolute" src="/images/1744207075_row_42.webp" alt="image1" />
                  </div>
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full absolute left-[-100%] top-0">
                    <img className="h-full w-full absolute" src="https://media.licdn.com/dms/image/v2/D5622AQFWIEj3NNrz4A/feedshare-shrink_1280/B56ZQa9qJzG4Ak-/0/1735619162552?e=1758153600&v=beta&t=45SlAbHhKrY9KfDWOUWyc-FRDwZW0dcRTBmgogncAjU" alt="image1" />
                  </div>
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full absolute left-[-100%] top-0">
                    <img className="h-full w-full absolute" src="https://media.licdn.com/dms/image/v2/D5622AQGt6Dcs_uoHYA/feedshare-shrink_1280/B56ZQVlpCoHIAk-/0/1735528979038?e=1758153600&v=beta&t=ueUSOfk39FN7_wyjgOCUijnd_eUD-3wnVeGkQr1v-QY" alt="image1" />
                  </div>
                  <div
                    ref={(ref) => {
                      if (!ref) return;
                      box2Refs.current = [...box2Refs.current, ref];
                    }}
                    className="h-full w-full absolute left-[-100%] top-0">
                    <img className="h-full w-full absolute" src="/images/ChatGPT_Image_Aug6202509_28_42AM.webp" alt="image1" />
                  </div>

                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 border-2 border-white bg-green-600 text-white px-1 rounded">LeetCode ACE</p>
                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 bg-white px-1 rounded">BACKEND DOMINATION</p>
                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 border-2 border-black bg-yellow-400 text-zinc-800 px-1 rounded">III<sup>rd</sup> UNIVERCITY RANKER</p>
                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 text-white border-2 border-white bg-blue-900 px-1 rounded">TECHNO WINNER</p>
                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 border-white border-2 bg-black text-white px-1 rounded">DIPEX ACHIEVER</p>
                  <p ref={(ref) => {
                    if (!ref) return;
                    box1Refs.current = [...box1Refs.current, ref];
                  }} className="md:text-5xl font-extrabold absolute top-[60%] opacity-0 bg-white px-1 rounded"></p>
                </div>
                <div className="h-full md:w-1/2 px-3 md:px-10 flex md:items-center relative">
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      Solved over 450+ problems on LeetCode, strengthening my problem-solving ability, data structures knowledge, and algorithmic thinking. This consistent practice has helped me develop a structured approach to tackling complex problems, improve speed and accuracy, and prepare effectively for real-world coding challenges and technical interviews.
                    </p>
                  </div>
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center ">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      Completed the Backend Domination course at Sheriyans Coding School, gaining in-depth knowledge of the MERN Stack. Built projects and practiced real-world implementations, strengthening my skills in API design, authentication, database management, and scalable backend architecture. This course not only boosted my backend expertise but also gave me confidence in building full-stack applications efficiently.
                    </p>
                  </div>
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center ">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      Achieved 3rd rank at RTMNU University during my 6th semester, reflecting dedication, strong academic performance, and consistent learning discipline. This recognition highlights my ability to balance academics with practical skills and showcases my commitment to continuous growth both in theoretical foundations and hands-on technical expertise.
                    </p>
                  </div>
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center ">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      Secured 2nd position in the National Level Project Competition – Techno Kiran at Nagpur, Maharashtra. Competing among top innovators, my project was recognized for its uniqueness, real-world impact, and technical excellence. This achievement not only reflects my ability to innovate but also my determination to stand out in highly competitive environments.
                    </p>
                  </div>
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center ">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      Won 5th position at the State Level Project Competition – DIPEX held in Thane, Mumbai. The event brought together innovative minds from across the state, and earning this recognition highlighted my project’s creativity, technical depth, and ability to address real-world challenges. It further strengthened my passion for developing impactful solutions.
                    </p>
                  </div>
                  <div ref={(ref) => {
                    if (!ref) return;
                    boxRefs.current = [...boxRefs.current, ref];
                  }} className="absolute opacity-0 top-[1%] w-[90%] left-1/18 md:left-0 md:translate-x-1/18 h-full flex items-center ">
                    <p className="bg-white w-fit pl-1 rounded-t">
                      An enthusiastic learner in Blockchain and Artificial Intelligence, with a deep interest in exploring cutting-edge technologies that are shaping the future. Actively learning and experimenting with AI-driven solutions and decentralized applications, I aim to merge innovation with practical implementation to create systems that are scalable, intelligent, and future-ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white row-span-3 grid grid-rows-subgrid border-l border-zinc-300 md:border-zinc-400"></div>
          </div>
          <div className="next-section w-full h-full text-black bg-white grid grid-cols-30 grid-rows-3 gap-0">
            <div className="row-span-3 grid grid-rows-subgrid "></div>
            <div className="row-span-3 grid grid-rows-11 col-span-28">
              <div className="grid md:grid-rows-1 grid-cols-2 row-span-1 text-[10px] md:text-xl font-bold inter-para tracking-widest">
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
              <div className="md:row-span-2 flex items-center justify-center gap-2 text-md md:text-xl tracking-wider border-t border-r border-l border-b text-center">WE WORK WITH THE WORLDS TOP BRANDS</div>
              <div className=" border border-b-0 border-t-0 row-span-7 flex flex-col md:flex-row md:items-center">
                <div className="h-[30%] md:h-full md:w-[50%] flex items-center justify-center text-2xl px-3 md:px-10 font-bold border-b md:border-b-0 md:border-r">
                  <p className="text-sm md:text-5xl text-center uppercase">The video Infrastructure for your app</p>
                </div>
                <div className="h-full md:w-1/2 px-3 md:px-10 flex md:items-center text-sm pt-5">Mux solves the hard problems software teams face when building video, from  catalogs to AI-generated video platforms and anything in between. Developers use Mux to launch video features in minutes, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis aspernatur possimus fuga excepturi. Provident laboriosam quam architecto minima, veniam deserunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, ipsum!</div>
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