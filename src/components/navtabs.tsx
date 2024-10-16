"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'
import AppRouterInstance from 'next/types';
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
  router: ReturnType<typeof useRouter>;
}

function redirectPage (page: string, router: ReturnType<typeof useRouter>) {
  router.push("/home/" + page.replace(" ", "-").toLowerCase());
}

export default function NavTabs({ tabs, homeTitle, homeRoute }: { tabs: string[], homeTitle: string, homeRoute: string }) {
  const [selected, setSelected] = useState<string>(tabs[0]);
  const router = useRouter();

  return (
    <div className="flex w-full gap-4 bg-blue-950/60 p-6 items-center">
      <div className="flex items-start">
        <button onClick={() => router.push(homeRoute)}>
          <p className="text-left text-white hover:font-bold">{homeTitle}</p>
        </button>
      </div>
      <div className="w-full flex justify-end items-center">
        {tabs.map((tab) => (
          <Tab text={tab} selected={selected === tab} setSelected={setSelected} router={router} key={tab} />
        ))}
      </div>
    </div>
  );
}

const Tab = ({ text, selected, setSelected, router }: TabProps) => {
  return (
    <button
      onClick={() => {
        setSelected(text);
        redirectPage(text, router);
      }}
      className={cn(
        "relative rounded-md p-2 text-sm transition-all mx-2",
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
