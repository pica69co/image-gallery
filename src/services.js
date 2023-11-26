import ImageCard from "./components/ImageCard";
export const fetchImages = async (term, page) => {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&page=${page}`
  );
  const data = await res.json();

  // return data.map((image, index) => (
  //   <ImageCard key={image.id} image={image} index={index} />
  // ));
};
