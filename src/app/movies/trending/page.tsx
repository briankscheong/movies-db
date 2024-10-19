"use client"
import "@/app/globals.css"
import MoviePage from "@/components/moviePage";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default function Trending() {
    return (
        <Suspense key="trending" fallback={<Loading />}>
            <MoviePage urlPath="trending"></MoviePage>
        </Suspense>
    );
}