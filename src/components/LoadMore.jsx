import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

function LoadMore(term) {
  const { ref, inView } = useInView();

  const [images, setImages] = useState([] || undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const delay = 1000;
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (!inView) return;
    if (inView) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      console.log(images);
      async function fetchMorePosts() {
        setIsLoading(true);
        setTimeout(() => setShowLoading(true), delay);
        fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&per_page=50&page=${page}&safesearch=true`
        )
          .then((res) => res.json())
          .then((data) => {
            setImages((prevImages) => [...prevImages, ...data.hits]);
            setIsLoading(false);
            setPage((prevPage) => prevPage + 1);
          })
          .catch((err) => console.log(err));
      }
      fetchMorePosts();
      // setIsLoading(false);
    }
  }, [inView, page, images, isLoading]);

  return (
    <>
      {!showLoading ? (
        "wait..."
      ) : (
        <section className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </section>
      )}

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {isLoading && (
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
