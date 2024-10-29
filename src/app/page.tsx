"use client"

// import Auth from "@/pages/auth";
import "@/app/globals.css";
// import { useRouter } from 'next/navigation';
import GibberishText from "@/components/gibberish-text";
import TypingText from "@/components/typing-text";
import Expandable from "@/components/animata/carousel/expandable";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import AnimatedDock from "@/components/animata/container/animated-dock";
import { IoHomeOutline, IoTrendingUp } from "react-icons/io5";
import { FaHotjar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
// import { IoSearch } from "react-icons/io5";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";


interface ItemProps {
  image: string,
  title: string
}

interface MovieProps {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number[],
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export default function Home() {
  // const router = useRouter();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getMovies() {
    const backend_url = process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL;
    try {
        const fullUrl = `${backend_url}/movies/popular?page=1`;
        const res = await fetch(fullUrl);
        if (!res.ok) {
            console.error("Failed to retrieve movies");
            return [];
        }
        const moviesResult = await res.json();
        return moviesResult.results.slice(0, 6);
    }
    catch (e){
        console.error("Error fetching movie: ", e);
        return [];
    }
  }

  useEffect(() => {
    getMovies()
      .then(moviesResult => {
        setMovies(moviesResult);
      })
      .then(() => {
        const items: ItemProps[] = movies.sort(() => 0.5 - Math.random()).map(movie => ({
          image: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
          title: movie.title
        }));
        setItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  });

  return (
    <div className="w-screen text-center py-10 px-5 items-center justify-center">
      <GibberishText text="Movies.DB" className="text-4xl font-bold text-gray-100 font-mono" />
      <br />
      <div className="flex flex-row justify-center items-center">
          {/* <TypingText className="text-center text-base font-bold font-mono m-8 animate-typing whitespace-nowrap relative border-r-4 border-r-cyan-700"> */}
          <TypingText 
              className="select-text text-center text-base font-bold font-mono m-10"
              alwaysVisibleCount={1}
              delay={40}
              // smooth
              text="Your one-stop hub for movie info and streaming options."
              waitTime={3000}
              grow={true}
              repeat={false}
              onComplete={() =>{}}>
          </TypingText>
      </div>
      <div className="flex items-center justify-center">
        {
          loading ? <Loading></Loading> : <Expandable className="w-5/6 min-w-72 storybook-fix" list={items} />
        }
      </div>
      {/* <button className="ease-in px-4 py-2 text-white border hover:border-2 hover:shadow active:shadow-xl active:bg-blue-900 rounded-lg text-sm" type="button" onClick={() => router.push('/movies/trending')}>Get Started</button> */}
      <div className="relative flex h-40 w-full items-center justify-center">
        <AnimatedDock
          items={[
            {
              href: '/',
              icon: <IoHomeOutline />,
              title: 'Home'
            },
            {
              href: '/movies/trending',
              icon: <IoTrendingUp />,
              title: 'Trending'
            },
            {
              href: '/movies/popular',
              icon: <FaHotjar />,
              title: 'Popular'
            },
            {
              href: '/movies/top-rated',
              icon: <MdFavoriteBorder />,
              title: 'Top Rated'
            },
            // {
            //   href: '/profile',
            //   icon: <CgProfile />,
            //   title: 'Profile'
            // }
          ]}
          smallClassName="w-full"
        />
      </div>
    </div>
  );
}