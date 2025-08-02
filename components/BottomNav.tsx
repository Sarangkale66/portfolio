"use client"
import Image from "next/image";
import { useTheme } from "./ContextAPI";
import { usePathname, useRouter } from "next/navigation";
import { SparklesText } from "./magicui/sparkles-text";

interface RouteHandler {
  id: string;
  name: string;
  handleRoute: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const RouteHandler = ({
  id, name, handleRoute
}: Readonly<RouteHandler>) => {
  return <div id={id} onClick={handleRoute} className="h-fit bg-zinc-900 w-24 px-2 md:px-5 rounded-full transition-all hover:scale-110 text-white hover:text-black duration-200 hover:bg-white flex justify-center items-center font-extrabold">
    {name}
  </div>
}

export default function BottomNav() {
  const { LoadingScreenUp, LoadingScreenDown } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const path = String(e.currentTarget.id);
    if (path === pathname) return;
    LoadingScreenUp();
    router.prefetch(path);
    router.push(path);
  }

  return (
    <div className="z-10 cursor-default select-none h-13 w-[100%] md:w-1/2 pr-2 transition-all pl-2 fixed bottom-5 left-0 md:left-10 flex justify-left items-center overflow-hidden">
      <div className="min-w-1/12 h-full border-r-white border-r-2 flex items-center justify-evenly bg-zinc-900 border-border border rounded-bl-full rounded-tl-full">
        <div>
          <div id="/" onClick={handleRoute} className=" w-[75px] h-[75px] relative transition-transform hover:scale-110 duration-200 min-w-10 z-30 rounded-full">

            <Image
              src="/SankLogo.svg"
              fill
              className="object-contain h-full w-full"
              alt="Sank Logo"
            />
          </div>
        </div>
      </div>
      <div className="relative bg-zinc-100 border-2 border-black duration-300 left-0 top-0 w-64 md:w-32 hover:w-64 h-full transition-all delay-100 overflow-hidden">
        <div className="absolute w-fit left-5 top-1/2 transform -translate-y-1/2">
          <div className="flex justify-center items-center gap-5">
            <RouteHandler id="/page" name={"Project"} handleRoute={handleRoute} />
            <RouteHandler id="/blog" name={"Blog"} handleRoute={handleRoute} />
          </div>
        </div>
      </div>
      <div className="h-full flex border-l-white border-border border border-l-2 w-10 text-white bg-zinc-900 transition-all justify-center items-center rounded-br-full rounded-tr-full ">
        <Image
          src="/file.svg"
          width={20}
          height={20}
          className="hover:scale-110 duration-200"
          alt="Resume"
        />
      </div>
    </div>
  )
}