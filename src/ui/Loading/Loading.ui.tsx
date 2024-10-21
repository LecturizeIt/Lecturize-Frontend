const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-transparent border-t-[#861efd] border-b-[#2a27d6]"></div>
    </div>
  );
};
  
export default LoadingSpinner;