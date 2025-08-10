"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { useOnClickOutside } from "usehooks-ts"
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"

interface Tab {
  title: string
  icon: LucideIcon
  path?: string
  type?: never
}

interface Separator {
  type: "separator"
  title?: never
  icon?: never
}

interface ExpandedTabsProps {
  tabs: [(Tab | Separator)]
  className?: string
  activeColor?: string
  onChange?: (index: number | null) => void
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
}

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 }

export function ExpandedTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandedTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null)
  const outsideClickRef = React.useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  )
  const router = useRouter();

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null)
    onChange?.(null)
  })

  const handleSelect = (index: number) => {
    const tab = tabs[index];
    if ("type" in tab) return;
    setSelected(index);
    onChange?.(index);
    if (tab.path) router.push(tab.path.toLowerCase());
  }

  const Separator = () => (
    <div className=" h-[24px] w-[1.2px] my-1 bg-white" aria-hidden="true" />
  )

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        " flex gap-2 rounded-2xl border bg-black dark:bg-zinc-900 p-1 shadow-sm ",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />
        }

        const Icon = tab.icon
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition as any}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : " text-muted-foreground hover:bg-muted "
            )}
          >
            <Icon className="dark:text-white  " size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition as any}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
