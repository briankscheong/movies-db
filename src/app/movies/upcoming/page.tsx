"use client"
import "@/app/globals.css"
import MoviePage from "@/components/moviePage";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default function Upcoming() {
    return (
        <Suspense key="upcoming" fallback={<Loading />}>
            <MoviePage urlPath="upcoming"></MoviePage>
        </Suspense>
    );
}