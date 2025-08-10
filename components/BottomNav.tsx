"use client"

import {
  Home,
  Mail,
  Cog,
  Contact,
  Rss,
} from "lucide-react"

import { ExpandedTabs } from "./ui/expanded-tabs"

export function BottomNav() {
  const tabs = [
    { title: "Home", icon: Home, path: "/" },
    { title: "Projects", icon: Cog, path: "/page" },
    { title: "Blob", icon: Rss, path: "/blob" },
    { type: "separator" as const },
    { title: "Mail_Me!", icon: Mail, path: "" },
    { title: "Contact", icon: Contact, path: "/contact" },
  ]

  return (
    <div className="flex items-center justify-center fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <ExpandedTabs tabs={tabs as any} />
    </div>
  )
}