"use client"
import { useTheme } from "./ContextAPI";
import { usePathname, useRouter } from "next/navigation";

export default function BottomNav () {
  const { LoadingScreenUp } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = async (e:React.MouseEvent<HTMLDivElement>)=>{
    let path=String(e.currentTarget.id);
    if(path === pathname) return;
    router.prefetch(path);
    LoadingScreenUp();
    await new Promise((resolve)=>setTimeout(resolve,1000));
    router.push(path);
  }
  
  return(
    <div className="z-10 cursor-default select-none h-13 w-[100%] md:w-1/2 transition-all pl-2 fixed bottom-5 left-0 md:left-10 flex justify-left items-center overflow-hidden">
      <div className="min-w-1/12 h-full flex items-center justify-evenly bg-black rounded-bl-full rounded-tl-full">
        <div id="/" onClick={handleRoute} className="h-20 w-fit transition-transform hover:scale-110 duration-200 min-w-10 z-30 rounded-full">
          <img src="/SankLogo.svg" className="h-full w-full"/>
        </div>
        
      </div>
      <div className="relative border-l-2 border-l-white border-r-2 border-r-white duration-300 left-0 top-0 w-0 md:w-32 hover:w-100 h-full transition-all bg-black overflow-hidden">
          <div className="absolute w-fit left-5 top-1/2 transform -translate-y-1/2">
            <div className="flex justify-center items-center gap-5">
              <div id="/signup" onClick={handleRoute} className="h-fit w-24 px-2 md:px-5 rounded-full transition-all hover:scale-110 bg-slate-200 duration-200 hover:bg-white flex justify-center items-center font-extrabold">
                Projects
              </div>
              <div id="/" onClick={handleRoute} className="h-fit w-24 px-2 md:px-5 rounded-full transition-all hover:scale-110 bg-slate-200 duration-200 hover:bg-white flex justify-center items-center font-extrabold">
                Home
              </div>
              <div id="/blog" onClick={handleRoute} className="h-fit w-24 px-2 md:px-5 rounded-full transition-all hover:scale-110 bg-slate-200 duration-200 hover:bg-white flex justify-center items-center font-extrabold">
                Blog
              </div>
            </div>
          </div>
      </div>
      <div className="h-full min-w-1 bg-black transition-all px-3 flex items-center rounded-br-full rounded-tr-full ">
          <img src="/file.svg" className="h-5 w-5 hover:scale-110 duration-200" alt="Resume" />
      </div>
    </div>
  )
}