interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = (Props: Props) => {
  const { currentPage, totalPages, onPageChange } = Props;

  // const pageNumbers = [];
  // for (let i = 1; i <= Props.totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      // Jika total halaman <= 6, tampilkan semua halaman
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Halaman pertama selalu ditampilkan
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Menambahkan halaman sebelum halaman saat ini, halaman saat ini, dan halaman setelahnya
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Halaman terakhir selalu ditampilkan
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  // const handlePrevious = () => {
  //   if (currentPage > 1) {
  //     onPageChange(currentPage - 1);
  //   }
  // };

  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     onPageChange(currentPage + 1);
  //   }
  // };

  return (
    <div className="flex justify-center items-center">
      <nav className="flex font-mulish gap-2 items-start self-center mt-9 text-lg tracking-wider leading-9 text-gray-600 whitespace-nowrap" aria-label="Pagination">
        {/* <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border-solid border-[0.5px] border-neutral-200 ${currentPage === 1 ? "bg-white text-gray-400" : "bg-blue-700 text-white"}`}
          aria-label="Previous Page"
        >
          &lt;
        </button> */}

        {/* {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`flex flex-col w-10 rounded-lg ${currentPage === number ? "text-white" : ""}`}
            aria-current={currentPage === number ? "page" : undefined}
          >
            <span className={`px-3.5 w-10 h-10 rounded-lg ${currentPage === number ? "bg-blue-700 shadow-[0px_8px_16px_rgba(95,46,234,0.24)]" : "bg-white border-solid border-[0.5px] border-neutral-200"}`}>
              {number}
            </span>
          </button>
        ))} */}

        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`flex flex-col w-10 rounded-lg ${currentPage === page ? "text-white" : ""}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              <span
                className={`px-3.5 w-10 h-10 rounded-lg ${currentPage === page ? "bg-blue-700 shadow-[0px_8px_16px_rgba(95,46,234,0.24)]" : "bg-white border-solid border-[0.5px] border-neutral-200"}`}
              >
                {page}
              </span>
            </button>
          ) : (
            <span key={index} className="flex items-center justify-center w-10 h-10">
              ...
            </span>
          )
        )}

        {/* <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg border-solid border-[0.5px] border-neutral-200 ${currentPage === totalPages ? "bg-white text-gray-400" : "bg-blue-700 text-white"}`}
          aria-label="Next Page"
        >
          &gt;
        </button> */}
      </nav>
    </div>    
  );

};

export default Pagination;
