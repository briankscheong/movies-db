"use client"

import "@/app/globals.css";
import { useRouter } from 'next/navigation';

export default function Movies() {
    const router = useRouter();

    return (router.push("/movies/trending"));
}