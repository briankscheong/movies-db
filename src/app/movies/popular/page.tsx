"use client"
import "@/app/globals.css"
import MoviePage from "@/components/moviePage";

export default function Popular() {
    return (
        <MoviePage urlPath="popular" paginated={true}></MoviePage>
    );
}