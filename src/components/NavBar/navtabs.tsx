"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import DropdownNav from "@/components/NavBar/DropDownNav";
import Image from "next/image";
import movieLogo from "@/app/movies/icon.png";

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

function redirectPage(page: string, router: ReturnType<typeof useRouter>) {
  router.push("/movies/" + page.replace(" ", "-").toLowerCase());
}

export default function NavTabs({ tabs, homeTitle, homeRoute }: { tabs: string[], homeTitle: string, homeRoute: string }) {
  const [selected, setSelected] = useState<string>(tabs[0]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="overflow-auto flex w-full gap-4 bg-black/50 p-6 items-center">
      <div className="flex items-start">
        <button onClick={() => router.push(homeRoute)} className="px-2 shadow-lg">
          <Image
            src={movieLogo}
            width={40}
            height={40}
            alt="Logo"
            className="min-w-10 min-h-10"
          />
          {/* <p className="text-left text-white hover:font-bold p-2 flex">{homeTitle}</p> */}
        </button>
      </div>
      <div className="w-full flex justify-end items-center">
        {isMobile ? (
          <DropdownNav tabs={tabs} selected={selected} setSelected={setSelected} />
        ) : (
          tabs.map((tab) => (
            <Tab text={tab} selected={selected === tab} setSelected={setSelected} router={router} key={tab} />
          ))
        )}
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
