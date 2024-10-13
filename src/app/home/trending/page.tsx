"use client"
import "@/app/globals.css"
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import Loading from '@/app/home/trending/loading';
import { Modal, StyledBackdrop, ModalContent, TriggerButton } from "@/components/modal";

interface MovieResult {
    name: string;
    price: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number,
    poster_path: string,
    smaller_poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface Genre {
    id: string,
    name: string
}

async function getMovies() {
    // const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    // await sleep(1500)

    const backend_url = process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL;

    try {
        const res = await fetch(`${backend_url}/movies`)
        if (!res.ok) {
            console.error("Failed to retrieve movies");
            return [];
        }
        const moviesResult = await res.json();
        return moviesResult;
    }
    catch (e){
        console.error("Error fetching movie: ", e);
        return [];
    }
}

async function getMovieStreamingOption(id: number, title: string, setMovieStreamingOption: Function, handleOpen: Function) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL}/movie/${id}/streaming-options`)
        if (!res.ok) {
            console.error(`Failed to retrieve streaming option for movie ${title}`);
        }
        const movieStreamingOption = await res.json();
        console.log(movieStreamingOption);
        setMovieStreamingOption(movieStreamingOption);
        handleOpen();
        return;
    }
    catch (e) {
        console.error("Error fetching movie: ", e);
    }
}

export default function Trending() {
    const [movies, setMovies] = useState<any[]>([]);
    const [activeMovieId, setActiveMovieId] = useState<number | null>(null); // Track active movie ID
    const [movieStreamingOption, setMovieStreamingOption] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true); 
    const handleOpen = (movieId: number) => setActiveMovieId(movieId);
    const handleClose = () => setActiveMovieId(null);

    useEffect(() => {
        setLoading(true);
        getMovies()
            .then(moviesResult => {
                console.log(moviesResult["results"])
                return moviesResult["results"]
            })
            .then(results => {
                results.forEach((result: MovieResult) => {
                    result.poster_path = `https://image.tmdb.org/t/p/w342${result.poster_path}`;
                    result.smaller_poster_path = `https://image.tmdb.org/t/p/w154${result.poster_path}`;
                })
                setMovies(results)
                setLoading(false);
            });
    }, []);

    const handleMovieClick = (movie: MovieResult) => {
        getMovieStreamingOption(movie.id, movie.title, setMovieStreamingOption, () => handleOpen(movie.id));
    };

    return (
        <div>
            <div className="justify-center items-center text-center">
                {/* <h1 className="text-2xl font-bold text-gray-100 mb-3">Trending Movies</h1> */}
                {/* <p className="text-base text-gray-700 my-1">Just for you!</p> */}
            </div>
            {/* <Suspense fallback={ <Loading /> }> */}
            { loading ? <Loading /> : 
                <Suspense fallback={<p className="text-4xl text-center justify-center">Loading...</p>}>
                    <div className="columns-sm items-center justify-center space-y-2">
                        {
                            movies.map((movie, index) => (
                                <div key={index}>
                                    <TriggerButton type="button" onClick={() => handleMovieClick(movie)}>
                                        <div 
                                            className="p-8 bg-gradient-to-r from-blue-900 to-cyan-700 shadow-lg rounded-lg space-y-4 my-2 break-inside-avoid transform transition duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl" 
                                        >
                                            <Image src={movie.poster_path} alt="poster image" width={ 400 } height={ 500 } className="rounded-md transition duration-500 ease-in-out transform shadow-md"></Image>
                                            <p className="text-2xl font-extrabold text-white tracking-wide hover:text-cyan-100 transition duration-300">{movie.title}</p>
                                            <p className="text-base font-bold text-white">Overview: <span className="font-normal text-white">{movie.overview}</span></p>
                                            <p className="text-base font-bold text-white">Popularity: <span className="font-normal text-white">{movie.popularity}</span></p>
                                            <p className="text-base font-bold text-white">Release Date: <span className="font-normal text-white">{movie.release_date}</span></p>
                                            <p className="text-base font-bold text-white">Vote Average: <span className="font-normal text-white">{movie.vote_average} / 10</span></p>
                                            <p className="text-base font-bold text-white">Vote Count: <span className="font-normal text-white">{movie.vote_count}</span></p>        
                                            {/* <p className="text-2xl font-extrabold text-gray-900 tracking-wide hover:text-blue-800 transition duration-300">{movie.title}</p>
                                            <p className="text-base font-bold text-gray-800">Overview: <span className="font-normal text-gray-600">{movie.overview}</span></p>
                                            <p className="text-base font-bold text-gray-800">Popularity: <span className="font-normal text-gray-600">{movie.popularity}</span></p>
                                            <p className="text-base font-bold text-gray-800">Release Date: <span className="font-normal text-gray-600">{movie.release_date}</span></p>
                                            <p className="text-base font-bold text-gray-800">Vote Average: <span className="font-normal text-gray-600">{movie.vote_average} / 10</span></p>
                                            <p className="text-base font-bold text-gray-800">Vote Count: <span className="font-normal text-gray-600">{movie.vote_count}</span></p>         */}
                                        </div>
                                    </TriggerButton>
                                    <Modal
                                        aria-labelledby="unstyled-modal-title"
                                        aria-describedby="unstyled-modal-description"
                                        open={activeMovieId === movie.id}
                                        onClose={handleClose}
                                        slots={{ backdrop: StyledBackdrop }}
                                    >
                                        <ModalContent sx={{ 
                                            width: 600,
                                            maxHeight: '90vh', // Ensure the modal height is limited to 80% of the viewport height
                                            overflowY: 'auto',  // Enable vertical scrolling when content overflows
                                            padding: '20px',
                                            borderRadius: '12px',
                                            '&::-webkit-scrollbar': {
                                                display: 'none',  // Hide scrollbar for webkit browsers
                                            },
                                            msOverflowStyle: 'none',  // IE and Edge
                                            scrollbarWidth: 'none',   // Firefox
                                            'WebkitOverflowScrolling': 'touch',  // Smooth scrolling for touch devices
                                            }}
                                        >
                                            <div className="flex justify-end">
                                                <button onClick={handleClose} className="px-3 py-1 rounded-sm hover:bg-gray-50 font-bold text-lg text-gray-700">
                                                    x
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                                                <Image 
                                                    src={movie.poster_path}
                                                    alt={`${movieStreamingOption.title} Poster`}
                                                    style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                                                    width={ 400 }
                                                    height={ 500 }>
                                                </Image>
                                            </div>

                                            {/* Movie Title and Release Year */}
                                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
                                                <strong>{movieStreamingOption.title}</strong> {movieStreamingOption.releaseYear ? `(${movieStreamingOption.releaseYear})` : ""}
                                            </h1>

                                            {/* Cast */}
                                            <p className="text-center text-lg">
                                                <strong>Cast</strong>
                                            </p>
                                            <p className="text-center text-base">
                                                {movieStreamingOption.cast ? movieStreamingOption.cast.join(', ') : 'N/A'}
                                            </p>
                                            <br />

                                            {/* Director */}
                                            <p className="text-center text-lg">
                                                <strong>Director</strong>
                                            </p>
                                            <p className="text-center text-base">
                                                {movieStreamingOption.directors ? movieStreamingOption.directors.join(', ') : 'N/A'}
                                            </p>
                                            <br />

                                            {/* Run Time */}
                                            <p className="text-center text-lg">
                                                <strong>Show Time</strong>
                                            </p>
                                            <p className="text-center text-base">
                                                {movieStreamingOption.runtime ? `${Math.floor(movieStreamingOption.runtime / 60)} hr ${movieStreamingOption.runtime % 60} min` : 'N/A'}
                                            </p>
                                            <br />

                                            {/* Genre */}
                                            <p className="text-center text-lg">
                                                <strong>Genres</strong>
                                            </p>
                                            <p className="text-center text-base">
                                                {movieStreamingOption.genres ? movieStreamingOption.genres.map((genre: Genre) => genre.name).join(", ") : 'N/A'}
                                            </p>
                                            <br />

                                            {/* Streaming Options in the US */}
                                            <div className="text-center">
                                                <p className="text-lg mb-2">
                                                    <strong>Stream Now</strong>
                                                </p>
                                                {movieStreamingOption.streamingOptions?.us && movieStreamingOption.streamingOptions.us.length > 0 ? (
                                                    <ul>
                                                        {movieStreamingOption.streamingOptions.us.map((option: any) => (
                                                            <li key={option.service.name + "-" + option.type} className="text-base mb-1">
                                                                <strong>{option.service.name}</strong> {option.price ? `(\$${option.price.amount}, ${option.type})`: `(${option.type})`}: {option.link ? (
                                                                    <a 
                                                                        href={option.link} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        style={{
                                                                            color: '#1e90ff',
                                                                            transition: 'color 0.3s ease',
                                                                        }}
                                                                        onMouseEnter={(e) => e.currentTarget.style.color = '#104e8b'}
                                                                        onMouseLeave={(e) => e.currentTarget.style.color = '#1e90ff'}
                                                                    >
                                                                    Watch Here
                                                                    </a>
                                                                ) : 'Unavailable'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>Not available for streaming in the US yet.</p>
                                                )}
                                            </div>
                                        </ModalContent>
                                    </Modal>
                                    
                                </div>
                            ))
                        }
                    </div>
                </Suspense>
            }
        </div>
    );
}