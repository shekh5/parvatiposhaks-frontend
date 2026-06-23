import { SearchOff } from '@mui/icons-material';

export function NoProducts({ keyword }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
        <SearchOff className="text-brand-blue" sx={{ fontSize: 48 }} />
      </div>
      <h3 className="text-2xl font-serif text-brand-blue font-bold mb-3">No Products Found</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        {keyword
          ? `We couldn't find any products matching "${keyword}". Try checking your spelling or use more general terms.`
          : `There are currently no products available in this category. Please check back later.`}
      </p>
      <button 
        onClick={() => window.history.back()}
        className="btn-outline border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
      >
        Go Back
      </button>
    </div>
  );
}
