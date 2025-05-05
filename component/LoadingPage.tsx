"use client"
import { useTheme } from "./ContextAPI";

export default function() {
  const { loadingRef, pageRef }=useTheme();

  return(
    <div ref={pageRef} className="z-30 absolute h-full w-full top-0 left-0 overflow-hidden">
      <div ref={loadingRef} className="bg-black h-full translate-y-[100%]  w-full absolute left-0 top-0">
       <div className=" opacity-100 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 border-8 border-yellow-400 border-l-red-800 border-r-blue-600 border-b-green-500 animate-spin rounded-full flex justify-center items-center
       bg-orange-500">
       </div>
       <div className=" opacity-100 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl rounded-b-full px-2 font-extrabold border-4 text-orange-700 bg-zinc-50 rounded-full">
        <p className="animate-pulse">$</p> 
       </div>
      </div>
     </div>
   );
}

