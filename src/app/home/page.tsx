"use client"

import "@/app/globals.css";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    return (router.push("/home/trending"));
}