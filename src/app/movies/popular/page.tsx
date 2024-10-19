"use client"
import "@/app/globals.css"
import MoviePage from "@/components/moviePage";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default function Popular() {
    return (
        <Suspense key="popular" fallback={<Loading />}>
            <MoviePage urlPath="popular"></MoviePage>
        </Suspense>
    );
}