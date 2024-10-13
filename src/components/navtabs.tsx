"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

// Usage:
/**
 * import NavTabs from "@/components/animata/container/nav-tabs"
 * const tabs = ["Profile", "Search", "About Us", "Contact Us", "Settings"]
 * return (
 *  <NavTabs tabs={tabs}>
 *  </NavTabs>
 * )
 * */ 


interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavTabs({ tabs, homeTitle, homeRoute }: { tabs: string[], homeTitle: string, homeRoute: string }) {
  const [selected, setSelected] = useState<string>(tabs[0]);
  const router = useRouter();

  const homeBasis = tabs.length <= 2 ? "text-left basis-5/12 text-white" : "text-left basis-4/12 text-white"; 
  const navBasis = tabs.length <= 2 ? "flex basis-7/12 items-center gap-4" : "flex basis-8/12 items-center gap-4"; 

  return (
    <div className="flex flex-row items-center justify-center gap-4 bg-blue-950/60 p-6">
      <button className={homeBasis} onClick={() => router.push(homeRoute)}>
        <p className="text-left text-white hover:font-bold">{homeTitle}</p>
      </button>
      <div className={navBasis}>
        {tabs.map((tab) => (
          <Tab text={tab} selected={selected === tab} setSelected={setSelected} key={tab} />
        ))}
      </div>
    </div>
  );
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative rounded-md p-2 text-sm transition-all",
        selected ? "text-white" : "text-slate-300 hover:font-black",
      )}
    >
      <p className="relative z-50 min-w-20">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-gradient-to-r from-indigo-800 to-blue-800"
        />
      )}
    </button>
  );
};
