"use client"

// import Auth from "@/pages/auth";
import "@/app/globals.css";
import GibberishText from "@/components/gibberish-text";
import TypingText from "@/components/typing-text";
// import Expandable from "@/components/animata/carousel/expandable";
// import { useEffect, useState } from "react";
// import Loading from "@/components/loading";
// import AnimatedDock from "@/components/animata/container/animated-dock";
// import { IoTrendingUp } from "react-icons/io5";
// import { FaHotjar } from "react-icons/fa";
// import { MdFavoriteBorder } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Wallpaper from "@/public/images/wallpaper.jpg"

/**
 * import Marquee from "@/components/animata/container/marquee";
 * import { IoSearch, IoHomeOutline } from "react-icons/io5";
 * import { IoMdNotificationsOutline } from "react-icons/io";
 * import { CgProfile } from "react-icons/cg";
 */


// interface ItemProps {
//   image: string,
//   title: string
// }

// interface MovieProps {
//   adult: boolean,
//   backdrop_path: string,
//   genre_ids: number[],
//   id: number,
//   original_language: string,
//   original_title: string,
//   overview: string,
//   popularity: number[],
//   poster_path: string,
//   release_date: string,
//   title: string,
//   video: boolean,
//   vote_average: number,
//   vote_count: number
// }

export default function Home() {
  const router = useRouter();
  // const [movies, setMovies] = useState<MovieProps[]>([]);
  // const [items, setItems] = useState<ItemProps[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  // async function getMovies() {
  //   const backend_url = process.env.NEXT_PUBLIC_NODEJS_BACKEND_URL;
  //   try {
  //       const fullUrl = `${backend_url}/movies/popular?page=1`;
  //       const res = await fetch(fullUrl);
  //       if (!res.ok) {
  //           console.error("Failed to retrieve movies");
  //           return [];
  //       }
  //       const moviesResult = await res.json();
  //       return moviesResult.results.slice(0, 6);
  //   }
  //   catch (e){
  //       console.error("Error fetching movie: ", e);
  //       return [];
  //   }
  // }

  // useEffect(() => {
  //   getMovies()
  //     .then(moviesResult => {
  //       setMovies(moviesResult);
  //     })
  //     .then(() => {
  //       const items: ItemProps[] = movies.map(movie => ({
  //         image: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
  //         title: movie.title
  //       }));
  //       setItems(items);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // });

  return (
    <>
      <Image className="opacity-35" src={Wallpaper} alt="Movies wallpaper" layout="fill" objectFit="cover"></Image>
      <div className="w-screen h-screen text-center pt-20 px-5 items-center justify-center bg-gradient-to-b from-gray-950 to-black">
        <GibberishText text="Movies.DB" className="text-4xl font-bold text-white" /> {/*font-mono */}
        <br />
        <div className="w-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center">
            {/* <TypingText className="text-center text-base font-bold font-mono m-8 animate-typing whitespace-nowrap relative border-r-4 border-r-cyan-700"> */}
            <TypingText 
                className="select-text text-center text-lg font-bold m-5" // font-mono
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
        {/* <div className="flex items-center justify-center">
          {
            loading ? <Loading></Loading> : <Expandable className="w-5/6 min-w-72 storybook-fix" list={items} />
          }
        </div> */}
        {/* <div className="relative flex h-40 w-full items-center justify-center">
          <AnimatedDock
            items={[
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
            ]}
            smallClassName="w-full"
          />
        </div> */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in px-5 py-3 text-white border bg-blue-900/70 hover:bg-blue-950 hover:border-2 hover:font-bold hover:shadow active:shadow-xl active:bg-blue-950 rounded-lg text-sm" type="button" onClick={() => router.push('/movies/trending')}>Get Started</button>
      </div>
    </>
  );
}