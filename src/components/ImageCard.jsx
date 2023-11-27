import React from "react";
import "../app.css";
import { motion } from "framer-motion";

const ImageCard = ({ image, index }) => {
  const tags = image.tags.split(",");
  const stagger = 0.25;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        delay: index * stagger,
        ease: "easeInOut",
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <img src={image.webformatURL} alt="" className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageCard;
