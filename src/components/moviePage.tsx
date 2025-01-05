"use client"
import "@/app/globals.css"
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import Loading from '@/components/loading';
import { waitSeconds } from '@/lib/utils';
import { Modal, StyledBackdrop, ModalContent, TriggerButton } from "@/components/modal";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {Pagination} from "@nextui-org/react";

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

interface MovieVideo {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string
}

interface Genre {
    id: string,
    name: string
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export default function MoviePage({urlPath, paginated}: {urlPath: string, paginated: boolean}) {
    const [movies, setMovies] = useState<any[]>([]);
    const [activeMovieId, setActiveMovieId] = useState<number | null>(null); // Track active movie ID
    const [movieStreamingOption, setMovieStreamingOption] = useState<any>({});
    const [movieVideo, setMovieVideo] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number | null>(paginated ? 1 : null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [totalPage, setTotalPage] = useState<number>(1);
    // const [loading, setLoading] = useState<boolean>(true); 
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query');
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleOpen = (movieId: number) => setActiveMovieId(movieId);
    const handleClose = () => setActiveMovieId(null);

    async function getMovieStreamingOption(id: number, title: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL}/movie/${id}/streaming-options`)
            if (!res.ok) {
                console.error(`Failed to retrieve streaming option for movie ${title}`);
            }
            const movieStreamingOption = await res.json();
            console.log("Movie streaming option: ");
            console.log(movieStreamingOption);
            setMovieStreamingOption(movieStreamingOption);
            handleOpen(id);
            return;
        }
        catch (e) {
            console.error("Error fetching movie: ", e);
        }
    }

    async function getMovies() {
        const backend_url = process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL;
        // const params = new URLSearchParams(searchParams);
    
        try {
            // const paginationNumber = params.get("page");
            // setPageNumber(parseInt(paginationNumber ? paginationNumber : "1"));
            const paginationPath = paginated ? `?page=${pageNumber}` : "";
            const fullUrl = `${backend_url}/movies/${urlPath}${paginationPath}`;
            const res = await fetch(fullUrl);
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
    
    async function getMovieVideo(id: number) {
        let movieVideoKey: string = "";
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL}/movie/${id}/video`);
            if (!res.ok) {
                console.error(`Failed to retrieve streaming option for movie id ${id}`);
            }
            const movieVideoRes = await res.json();
            console.log("Movie video information: ")
            console.log(movieVideoRes)
            movieVideoRes.results?.forEach((movieVideo: MovieVideo) => {
                if (movieVideo.type === "Trailer" && movieVideo.site === "YouTube") {
                    movieVideoKey = movieVideo.key;
                }
            })
            if (movieVideoKey === "") {
                movieVideoKey = movieVideoRes.results[0];
            }
            setMovieVideo(movieVideoKey);
            return;
        }
        catch (e) {
            console.error("Error fetching movie video: ", e);
        }
    }

    async function handlePagination (currentPageNumber: number) {
        const params = new URLSearchParams(searchParams);
        setPageNumber(currentPageNumber);
        params.set('page', currentPageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        // setLoading(true);
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); 
          };
          
        handleResize(); // Set initial state
        window.addEventListener("resize", handleResize);
        
        waitSeconds(500)
            .then(() => getMovies())
            .then(moviesResult => {
                console.log("Movie results: ")
                console.log(moviesResult["results"])
                setTotalPage(moviesResult["total_pages"] > 500 ? 500 : moviesResult["total_pages"])
                return moviesResult["results"]
            })
            .then(results => {
                results.forEach((result: MovieResult) => {
                    result.poster_path = result.poster_path ? `https://image.tmdb.org/t/p/w342${result.poster_path}` : "";
                    result.smaller_poster_path = result.poster_path ? `https://image.tmdb.org/t/p/w154${result.poster_path}` : "";
                })
                setMovies(results)
                // setLoading(false);
            });
        return () => window.removeEventListener("resize", handleResize);
    }, [urlPath, pageNumber, totalPage]);

    const handleMovieClick = (movie: MovieResult) => {
        getMovieStreamingOption(movie.id, movie.title);
        getMovieVideo(movie.id);
    };

    const maxHeightValue = isMobile ? '80vh' : '93vh';
    const widthValue = isMobile ? '95vw' : 600;

    return (
        <div>
            {/* { loading ? <Loading /> : */}
                <Suspense fallback={<Loading />}>
                    {
                        paginated ? (
                            <div className="flex justify-center items-center text-center mb-6 mt-1">
                                <Pagination className="items-center justify-center" page={pageNumber ? pageNumber : 1} onChange={handlePagination} showControls boundaries={1} total={totalPage} initialPage={1} variant={"light"} />
                            </div>
                        ) : <></> 
                    }
                    <div className="columns-sm space-y-4">
                        {
                            movies.map((movie, index) => (
                                movie.poster_path ? (
                                    !queryParam?.trim().replaceAll(" ", "") || movie.title.toLowerCase().trim().replaceAll(" ", "").includes(queryParam.toLowerCase().trim().replaceAll(" ", "")) ? (
                                        <div key={index}>
                                            <TriggerButton type="button" onClick={() => handleMovieClick(movie)}>
                                                <div className="w-full items-center justify-center p-8 bg-gradient-to-r from-gray-950 to-gray-900 shadow-lg rounded-lg space-y-6 break-inside-avoid transform transition duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl" >
                                                    <div className="flex items-center justify-center">
                                                        <Image src={movie.poster_path} alt="poster image" width={ 360 } height={ 750 } className="rounded-md transition duration-500 ease-in-out transform shadow-md"></Image>
                                                    </div>
                                                    <p className="text-2xl font-extrabold text-cyan-500 tracking-wide hover:text-cyan-300 transition duration-300">{movie.title}</p>
                                                    <p className="text-base font-bold text-teal-500 mb-1">Overview: <span className="font-normal text-white">{movie.overview ? movie.overview : "N/A"}</span></p>
                                                    <p className="text-base font-bold text-teal-500">Popularity: <span className="font-normal text-white">{movie.popularity ? movie.popularity.toFixed(2) : "N/A"}</span></p>
                                                    <p className="text-base font-bold text-teal-500">Release Date: <span className="font-normal text-white">{movie.release_date ? formatDate(movie.release_date) : "N/A"}</span></p>
                                                    <p className="text-base font-bold text-teal-500">Vote Average: <span className="font-normal text-white">{movie.vote_average ? `${movie.vote_average.toFixed(2)} / 10` : "N/A"}</span></p>
                                                    <p className="text-base font-bold text-teal-500">Vote Count: <span className="font-normal text-white">{movie.vote_count ? movie.vote_count : "N/A"}</span></p>
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
                                                    width: widthValue,
                                                    maxHeight: maxHeightValue, // Ensure the modal height is limited to 85% of the viewport height
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
                                                        <button onClick={handleClose} className="px-3 py-1 rounded-sm bg-gray-800 hover:bg-gray-600 font-bold text-lg text-gray-50">
                                                            x
                                                        </button>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                                                        <Image 
                                                            src={movie.poster_path}
                                                            alt={`${movieStreamingOption.title} Poster`}
                                                            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px' }}
                                                            width={ 400 }
                                                            height={ 800 }>
                                                        </Image>
                                                    </div>

                                                    {/* Movie Title and Release Year */}
                                                    <h1 className="text-cyan-400 hover:text-cyan-300" style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
                                                        <strong>{movieStreamingOption.title}</strong> {movieStreamingOption.releaseYear ? `(${movieStreamingOption.releaseYear})` : ""}
                                                    </h1>

                                                    {/* Cast */}
                                                    <p className="text-teal-500 text-center text-lg">
                                                        <strong>Cast</strong>
                                                    </p>
                                                    <p className="text-center text-base">
                                                        {movieStreamingOption.cast ? movieStreamingOption.cast.join(', ') : 'N/A'}
                                                    </p>
                                                    <br />

                                                    {/* Director */}
                                                    <p className="text-teal-500 text-center text-lg">
                                                        <strong>Director</strong>
                                                    </p>
                                                    <p className="text-center text-base">
                                                        {movieStreamingOption.directors ? movieStreamingOption.directors.join(', ') : 'N/A'}
                                                    </p>
                                                    <br />

                                                    {/* Run Time */}
                                                    <p className="text-teal-500 text-center text-lg">
                                                        <strong>Show Time</strong>
                                                    </p>
                                                    <p className="text-center text-base">
                                                        {movieStreamingOption.runtime ? `${Math.floor(movieStreamingOption.runtime / 60)} hr ${movieStreamingOption.runtime % 60} min` : 'N/A'}
                                                    </p>
                                                    <br />

                                                    {/* Genre */}
                                                    <p className="text-teal-500 text-center text-lg">
                                                        <strong>Genres</strong>
                                                    </p>
                                                    <p className="text-center text-base">
                                                        {movieStreamingOption.genres ? movieStreamingOption.genres.map((genre: Genre) => genre.name).join(", ") : 'N/A'}
                                                    </p>
                                                    <br />

                                                    {/* Trailer */}
                                                    <p className="text-teal-500 text-center text-lg">
                                                        <strong>Trailer</strong>
                                                    </p>
                                                    {
                                                        movieVideo ? (
                                                            <div className="flex justify-center items-center">
                                                                <iframe
                                                                src={`https://www.youtube.com/embed/${movieVideo}`}
                                                                width={500}
                                                                height={290}
                                                                allowFullScreen
                                                                loading="lazy"
                                                                title="Description"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <p className="text-center text-lg">
                                                                No trailer found
                                                            </p>
                                                        )
                                                    }
                                                    <br />
                                                    

                                                    {/* Streaming Options in the US */}
                                                    <div className="text-center">
                                                        <p className="text-teal-500 text-lg mb-2">
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
                                                                                    color: '#1F9FFF',
                                                                                    transition: 'color 0.3s ease',
                                                                                }}
                                                                                onMouseEnter={(e) => e.currentTarget.style.color = '#1FEAFF'}
                                                                                onMouseLeave={(e) => e.currentTarget.style.color = '#1F9FFF'}
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
                                    ) : (<></>)
                                ) : (<></>)
                            ))
                        }
                    </div>
                    {
                        paginated ? (
                            <div className="flex justify-center items-center text-center mt-8 mb-2">
                                <Pagination className="items-center justify-center" page={pageNumber ? pageNumber : 1} onChange={handlePagination} showControls showShadow boundaries={1} total={totalPage} initialPage={1} variant={"light"} />
                            </div>
                        ) : <></> 
                    }
                </Suspense> 
            {/* } */}
        </div>
    );
}