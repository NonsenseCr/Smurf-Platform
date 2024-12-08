import { useEffect } from "react";

const Loader = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false); // Ẩn loader sau 500ms
      }, 500);
    }
  }, [isLoading, setIsLoading]);

  return (
    isLoading && (
      <div id="global-loader">
        <span className="loader"></span>
      </div>
    )
  );
};

export default Loader;
