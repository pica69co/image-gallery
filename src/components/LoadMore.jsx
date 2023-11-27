import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

function LoadMore(term) {
  const { ref, inView } = useInView();

  const [images, setImages] = useState([] || undefined);
  const [isLoading, setIsLoading] = useState(true);

  let page = 2;
  useEffect(() => {
    if (!inView) return;
    if (inView) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      const delay = 700;
      console.log(images);
      const timeoutId = setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&page=${page}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setImages([...images, ...res.hits]);
            page++;
            setIsLoading(false);
          });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
    setIsLoading(false);
  }, [inView, images, isLoading]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
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
