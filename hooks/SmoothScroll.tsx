"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }: { children: React.ReactElement }) {
  return (
    <ReactLenis root options={{ lerp: 1, duration: 1.5, infinite: false }}>
      <>
        {children}
      </>
    </ReactLenis>
  );
}

export default SmoothScrolling;