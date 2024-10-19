"use client"
import "@/app/globals.css"
import MoviePage from "@/components/moviePage";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function TopRated() {
    return (
        <Suspense key="topRated" fallback={<Loading />}>
            <MoviePage urlPath="top-rated"></MoviePage>
        </Suspense>
    );
}