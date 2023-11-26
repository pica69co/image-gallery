import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { fetchImages } from "../services";

let page = 2;

function LoadMore({ term, images, setImages }) {
  const { ref, inView } = useInView();

  // const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // console.log(images);
  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      const delay = 500;

      const timeoutId = setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&page=${page}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res.hits);
            setImages([...images, ...res.hits]);
            setIsLoading(false);
            page++;
          });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, images, isLoading]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {images}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && (
            <img
              src="../assets/images/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
