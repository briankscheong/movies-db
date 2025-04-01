"use client"

import "@/app/globals.css";
import GibberishText from "@/components/gibberish-text";
import TypingText from "@/components/typing-text";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Wallpaper from "@/public/images/wallpaper.jpg"

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Image className="opacity-35" src={Wallpaper} alt="Movies wallpaper" layout="fill" objectFit="cover"></Image>
      <div className="w-screen h-screen text-center pt-20 px-5 items-center justify-center bg-gradient-to-b from-gray-950 to-black">
        <GibberishText text="Movies.DB" className="text-4xl font-bold text-white" /> {/*font-mono */}
        <br />
        <div className="w-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center">
            {/* <TypingText className="text-center text-base font-bold font-mono m-8 animate-typing whitespace-nowrap relative border-r-4 border-r-cyan-700"> */}
            <TypingText 
                className="select-text text-center text-lg font-bold m-5" // font-mono
                alwaysVisibleCount={1}
                delay={40}
                // smooth
                text="Your one-stop hub for movie info and streaming options."
                waitTime={3000}
                grow={true}
                repeat={false}
                onComplete={() =>{}}>
            </TypingText>
        </div>
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in px-7 py-3 text-white bg-gradient-to-r from-indigo-700 to-blue-700 hover:bg-gradient-to-r hover:from-indigo-800 hover:to-blue-800 shadow active:shadow-xl active:bg-gradient-to-r active:from-indigo-900 active:to-blue-900 rounded-lg text-sm" type="button" onClick={() => router.push('/movies/trending')}>Get started</button>
      </div>
    </>
  );
}