"use client"

import "@/app/globals.css";
import { useRouter } from 'next/navigation';

export default function Main() {
    const router = useRouter();

    return (
        <div className="text-center p-10 items-center justify-center">
            <h2 className="text-4xl font-bold text-gray-100 font-mono">
                Movies.db
            </h2>
            <br />
            <div className="flex justify-center w-auto items-center">
                <h3 className="text-center text-base font-bold font-mono m-8 animate-typing overflow-hidden whitespace-nowrap relative border-r-4 border-r-cyan-700">
                    {/* A place to build your social circle around AI with different expertises. */}
                    Get the latest trending movies with up-to-date infomation and streaming options.
                </h3>
            </div>
            <button className="w-28 py-2 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm" type="button" onClick={() => router.push('/home/trending')}>Get Started</button>
        </div>
    );
}

