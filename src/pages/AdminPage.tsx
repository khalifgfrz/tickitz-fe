import calendar from "../assets/icons/Calendar.svg";
import eye from "../assets/icons/Eye.svg";
import edit from "../assets/icons/Edit.svg";
import deleteIcon from "../assets/icons/Delete.svg";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../types/moviesData";
import axios from "axios";
import { useStoreSelector } from "../redux/hooks";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";

function MovieList() {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
  const { token } = useStoreSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getMovies = async () => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/movie/`;

      const params = {
        page: currentPage,
      };

      const result = await axios.get(url, {params});

      const filteredMovies = result.data.data.filter((movie: Movie) => movie.is_deleted === false);      

      setMovies(filteredMovies);
      setTotalPages(result.data.meta.totalPage);
    } catch (error) {
      console.log(error);
      setTotalPages(0);
    }
  };
  useEffect(() => {
    getMovies();
  }, [currentPage]);

  const deleteMovie = async (id: string) => {
    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/movie/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Success!",
        text: "Delete Success",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup: "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
      setShowModal(false);
      getMovies();
      setMovies(movies?.filter((movie) => movie.id !== id));
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: "Delete Failed!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        customClass: {
          popup: "border-solid border-5 border-primary text-sm rounded-lg shadow-lg mt-8 tbt:mt-16",
        },
        toast: true,
      });
      console.log(err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    setSelectedMovieId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovieId(null);
  };

  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === modalBgRef.current) {
      setShowModal(false);
      setSelectedMovieId(null);
    }
  };

  if (!movies || !Array.isArray(movies)) {
    return <div className="justify-center items-center text-3xl text-center font-bold p-8">No movies available</div>;
  }

  return (
    <main className="flex flex-col pb-16 px-4 tbt:px-10 lg:px-32 bg-neutral-100 font-mulish h-screen">
      <section className="flex flex-col self-center mt-16 w-full bg-white rounded-3xl max-w-[1105px] max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col px-14 pt-6 pb-10 w-full bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
          <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
            <h1 className="my-auto text-2xl font-bold text-slate-900">List Movie</h1>
            <Link to="/admin/movie-create">
              <button className=" md:hidden bg-blue-700 rounded-md fill-blue-700 px-6 py-1 font-bold tracking-wider leading-loose text-center text-slate-50">+ Add</button>
            </Link>
            <div className="flex gap-3.5 text-base w-full md:w-auto">
              <div className="flex flex-col grow shrink-0 font-semibold tracking-wide leading-7 text-gray-600 basis-0 md:w-fit">
                <div className="flex gap-5 justify-between px-6 py-3.5 w-full bg-gray-100 rounded-lg max-md:px-5">
                  <div className="flex gap-6">
                    <img loading="lazy" src={calendar} alt="Calendar" className="object-contain shrink-0 my-auto aspect-square w-[18px]" />
                    <span className="basis-auto">November 2023</span>
                  </div>
                </div>
              </div>
              <Link to="/admin/movie-create" className="self-center">
                <button className="text-sm hidden items-center md:flex p-2 bg-blue-700 rounded-lg fill-blue-700 max-md:px-5 font-bold tracking-wider leading-loose text-center text-slate-50">Add Movies</button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto mt-5 tbt:self-center">
            <table className="bg-white">
              <thead>
                <tr className="text-left text-xs md:text-base font-bold text-sky-900">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Thumbnail</th>
                  <th className="px-4 py-2">Movie Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Released Date</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {movies.length > 0 ? (
                  movies?.map((movie, index) => (
                    <tr key={movie.id} className="border-t">
                      <td className="px-4 py-2">{(currentPage - 1) * 10 + index + 1}
                        {/* {index + 1} */}
                      </td>
                      <td className="px-4 py-2">
                        <img src={movie.image} alt={movie.title} className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-2xl" />
                      </td>
                      <td className="px-4 py-2 text-sm md:text-base text-primary">{movie.title}</td>
                      <td className="px-4 py-2 text-sm md:text-base">{movie.genres}</td>
                      <td className="px-4 py-2 text-sm md:text-base">{movie.release_date}</td>
                      <td className="px-4 py-2 text-sm md:text-base">{movie.duration}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={eye} alt="" />
                            </div>
                          </button>
                          <button className="bg-[#5D5FEF] text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={edit} alt="" />
                            </div>
                          </button>
                          <button onClick={() => handleDelete(movie.id)} className="bg-red-500 text-white p-2 rounded w-8 md:w-10 h-8 md:h-10">
                            <div className="grid place-items-center">
                              <img src={deleteIcon} alt="" />
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="justify-center items-center text-3xl text-center font-bold p-8">
                      No movies available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}        
          />
        </div>
      </section>
      {showModal && (
        <div ref={modalBgRef} onClick={handleBackgroundClick} className="show fixed z-50 inset-0 bg-black bg-opacity-50 modal-bg justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-3/4 tbt:w-full text-center">
            <h2 className="text-sm tbt:text-2xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-xs xsm:text-sm tbt:text-base mb-6">Are you sure you want to delete?</p>
            <div className="flex justify-center">
              <button onClick={() => deleteMovie(selectedMovieId!)} className="text-xs tbt:text-base bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded mr-2">
                Delete
              </button>
              <button onClick={handleCloseModal} className="text-xs tbt:text-base bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
    </main>
  );
}

export default MovieList;
