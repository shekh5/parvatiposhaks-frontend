import { useSelector } from 'react-redux';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

export function Pagination({
  currentPage,
  onPageChange,
}) {
  const { totalPages, products } = useSelector((state) => state.products);
  
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
    <div className="flex items-center space-x-2">
      {/* Previous button */}
      <button 
        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-brand-blue hover:bg-brand-blue hover:text-white shadow-sm'}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowBackIosNew sx={{ fontSize: 16 }} />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((number) => (
        <button
          key={number}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 ${
            currentPage === number 
              ? 'bg-brand-blue text-white shadow-md transform scale-110' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-transparent'
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      {/* Next button */}
      <button 
        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-brand-blue hover:bg-brand-blue hover:text-white shadow-sm'}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIos sx={{ fontSize: 16 }} />
      </button>
    </div>
  );
}
