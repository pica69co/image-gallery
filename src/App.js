import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";
import "./app.css";
import LoadMore from "./components/LoadMore";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  console.log(images.length);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://pixabay.com/api/?key=${
        process.env.REACT_APP_PIXABAY_API_KEY
      }&q=${term}&image_type=photo&pretty=true&per_page=50&page=${2}&safesearch=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  }, [term]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container mx-auto max-w-7xl ">
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
      <LoadMore term={term} />
    </div>
  );
}

export default App;
