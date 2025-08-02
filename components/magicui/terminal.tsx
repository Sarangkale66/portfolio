"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  onComplete,
  ...props
}: AnimatedSpanProps) => {
  return (<motion.span
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    onAnimationComplete={onComplete}
    transition={{ duration: 0.3, delay: delay / 1000 }}
    className={cn("text-sm font-normal tracking-tight inline-grid", className)}
    {...props}
  >
    {children}
  </motion.span>
  )
}

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = "span",
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:");
  }

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  ({ children, className }, ref) => {
    return (
      <div className="flex z-30 flex-col bg-background gap-y-2 border-b border-border p-4 pointer-events-auto">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
        <div
          ref={ref}
          className={cn(
            "z-0 h-full relative min-h-100 max-h-72 overflow-y-scroll max-w-screen min-w-full md:min-w-[500px] rounded-b-sm border border-border bg-background",
            className,
          )}
        >
          <pre className="p-4">
            <code className="grid gap-y-1 overflow-auto">{children}</code>
          </pre>
        </div>
      </div>
    );
  }
);

Terminal.displayName = "Terminal";