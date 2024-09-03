import HeroImage from "../assets/images/AvangerHero.png";
import searchLight from "../assets/icons/SearchLight.svg";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Newsletter from "../components/NewsLetter";
import axios from "axios";
import { Movie } from "../types/moviesData";
import Pagination from "../components/Pagination";


function Home() {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
  const genreListes = ["Thriller", "Horror", "Romantic", "Adventure", "Sci-Fi"];
  const [genresSelected, setGenres] = useState<{genre: string}[]>([]);
  const [Search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const asyncFunctest = async () => {
      try {
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/movie/`;
        const genreNames = genresSelected.map(g => g.genre).join(",");
        const params = {
          ...(genreNames ? { genres: genreNames } : {}),
          ...(Search ? { name: Search } : {}),
          page: currentPage,
        };
        const result = await axios.get(url, { params });
        console.log(params)
        setMovies(result.data.data);
        setTotalPages(result.data.meta.totalPage);
      } catch (error) {
        setMovies(undefined);
        setTotalPages(0);
      }
    };

    asyncFunctest();
  }, [genresSelected, Search, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const SetgenreMoviecards = (genre: string) => {
    if (genresSelected.some((g) => g.genre === genre)) {
      setGenres(genresSelected.filter((g) => g.genre !== genre));
    } else {
      setGenres([...genresSelected, { genre }]);
    }
    console.log(genresSelected.join(","))
  };

  return (
    <section className="font-mulish">
      {/* hero desktop MD */}
      <div className="hidden md:flex relative flex-col items-start pt-16 sm:pt-28 pb-7 w-full min-h-[462px]">
        <img loading="lazy" src={HeroImage} alt="" className="object-cover absolute inset-0 size-full" />
        <div className="flex relative flex-col max-w-full w-full">
          <div className="text-white pl-4 tbt:pl-10 lg:pl-32">
            <h2 className="font-bold">LIST MOVIE OF THE WEEK</h2>
            <h1 className="mt-2.5 text-5xl sm:leading-[70px] md:w-[700px]">Experience the Magic of Cinema: Book Your Tickets Today</h1>
          </div>
          <div className="flex gap-3 justify-center items-center mt-8 sm:mt-16">
            <div className="flex my-auto bg-blue-700 rounded-3xl min-h-[6px] w-[43px]" />
          </div>
        </div>
      </div>

      {/* Filter Desktop */}
      <div className="hidden md:flex flex-row self-center mt-10 w-full gap-10 px-4 tbt:px-10 lg:px-32">
        <div>
          <div className="text-gray-600">Cari Event</div>
          <div className=" flex-wrap gap-5 mt-3">
            <div className="flex gap-4 p-3 tracking-wider bg-white rounded border border-solid border-neutral-200 text-slate-400">
              <img loading="lazy" src={searchLight} alt="" className="object-contain shrink-0 w-6 aspect-square" />
              <input type="text" className="flex-auto" placeholder="New Born Expert" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearch((e.target as HTMLInputElement).value);
                }
              }}/>
            </div>
          </div>
        </div>
        <div>
          <div className="font-semibold">Filter</div>
          <div className="flex flex-wrap mt-3 max-w-full w-full ">
            <div className="flex flex-wrap flex-auto gap-3 items-center my-auto text-xs font-medium leading-none text-gray-600 whitespace-nowrap">
              {genreListes.map((genre, index) => (
                <button onClick={() => SetgenreMoviecards(genre)} key={index} className={`px-3 sm:px-6 py-2 sm:py-2.5 my-auto text-center ${genresSelected.some((g) => g.genre === genre) ? "font-semibold text-white bg-blue-700 rounded-xl" : ""}`}>
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 tbt:px-10 md:hidden">
        <h2 className="self-center text-3xl font-bold tracking-wider leading-9 text-center text-blue-700">MOVIES</h2>
        <h3 className="self-center mt-3.5 text-3xl tracking-wider leading-10 text-center text-neutral-900">Exciting Movies That Should Be Watched Today</h3>
      </div>
      <MovieCard movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Newsletter />
    </section>
  );
}

export default Home;
