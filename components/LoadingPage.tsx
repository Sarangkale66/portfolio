"use client"
import { useTheme } from "./ContextAPI";
import { TerminalUse } from "./LoadComponent";

export default function LoadingScreen() {
  const { loadingRef } = useTheme();

  return (
    <div className="z-50 fixed inset-0 overflow-hidden pointer-events-none">
      <div ref={loadingRef} className="bg-black h-full w-full fixed inset-0 translate-y-[100%]">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
          <TerminalUse />
        </div>
      </div>
    </div>
  );
}
