import { useSelector } from 'react-redux';
import '../componentStyles/Pagination.css';

export function Pagination({
  currentPage,
  onPageChange,
  activeClass = 'active',
  nextPageText = 'Next',
  prevPageText = 'Prev',
  firstPageText = 'First',
  lastPageText = 'Last',
}) {
  const { totalPages, products } = useSelector((state) => {
    return state.products;
  });
  if (products.length === 0 || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="pagination">
        {/* first and previous button */}
        {currentPage > 1 && (
          <>
            <button className="pagination-btn" onClick={() => onPageChange(1)}>
              {firstPageText}
            </button>
            <button className="pagination-btn" onClick={() => onPageChange(currentPage - 1)}>
              {prevPageText}
            </button>
          </>
        )}

        {/* display page numbers button*/}
        {getPageNumbers().map((number) => (
          <>
            <button
              className={`pagination-btn ${currentPage === number ? activeClass : ''}`}
              key={number}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </>
        ))}

        {/* last and next button */}
        {currentPage < totalPages && (
          <>
            <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>
              {lastPageText}
            </button>
            <button className="pagination-btn" onClick={() => onPageChange(currentPage + 1)}>
              {nextPageText}
            </button>
          </>
        )}
      </div>
    </>
  );
}
