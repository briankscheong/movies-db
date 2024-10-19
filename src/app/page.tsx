"use client"

// import Auth from "@/pages/auth";
import "@/app/globals.css";
import { useRouter } from 'next/navigation';
import GibberishText from "@/components/gibberish-text";
import TypingText from "@/components/typing-text";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-screen text-center py-10 px-5 items-center justify-center">
      <GibberishText text="Movies.DB" className="text-4xl font-bold text-gray-100 font-mono" />
      <br />
      <div className="flex flex-row justify-center items-center">
          {/* <TypingText className="text-center text-base font-bold font-mono m-8 animate-typing whitespace-nowrap relative border-r-4 border-r-cyan-700"> */}
          <TypingText 
              className="select-text text-center text-base font-bold font-mono m-10"
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
      <button className="ease-in px-4 py-2 text-white border hover:border-2 hover:shadow active:shadow-xl active:bg-blue-900 rounded-lg text-sm" type="button" onClick={() => router.push('/movies/trending')}>Get Started</button>
    </div>
  );
}