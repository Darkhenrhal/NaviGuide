import React, { useState } from "react";
import "./News.css";


const News = () => {
  // Array of news items (headlines, descriptions, images, etc.)
  const newsItems = [
    {
      title: "News Headline 1",
      description: "Description of the first news item.",
      image: "path/to/news1.jpg",
    },
    {
      title: "News Headline 2",
      description: "Description of the second news item.",
      image: "path/to/news2.jpg",
    },
    {
      title: "News Headline 3",
      description: "Description of the third news item.",
      image: "path/to/news3.jpg",
    },
    // Add more news items as needed
  ];

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle the previous slide button click
  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? newsItems.length - 1 : prevSlide - 1
    );
  };

  // Function to handle the next slide button click
  const handleNextClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === newsItems.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Current news item based on the current slide index
  const currentNewsItem = newsItems[currentSlide];

  return (
    <div id="eventcard">
    <div className="news-slideshow">
      <div className="news-content">
        {/* Display the current news item */}
        <h3 id="news-titile">{currentNewsItem.title}</h3>
        <p id="news-description">{currentNewsItem.description}</p>
        {/* Display the image if available */}
        {currentNewsItem.image && (
          <img src={currentNewsItem.image} alt={currentNewsItem.title} />
        )}
      </div>
      {/* Previous and next buttons */}
      <button onClick={handlePrevClick} className="prev-button">Previous</button>
      <button onClick={handleNextClick} className="next-button">Next</button>
    </div>
    </div>
  );
};

export default News;
