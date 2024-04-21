import React, { useState, useEffect } from 'react';
import './PhotoSlideshow.css'; 

const PhotoSlideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  
  // Define the slides array with the image source, caption, and overlay text for each slide
  const slides = [
    {
      src: '../image1/lost.jpg', 
      overlayText: 'can\'t  you find right solution? ',
    },
    {
      src: '../image1/navi.png', 
      overlayText: 'we support you ',
    },
    
    {
      src: '../image1/health.jpeg', 
      overlayText: 'Health Awareness ',
    },
    {
      src: '../image1/nature.jpg', 
      overlayText: 'Enviromental Awareness ',
    },
    {
      src: '../image1/safety.jpg', 
      overlayText: 'Safety & Security Awareness ',
    },
    {
      src: '../image1/education.jpg', 
      overlayText: 'Educational Awareness ',
    },
    {
      src: '../image1/social.jpg', 
      overlayText: 'Social Issues Awareness ',
    },
    {
      src: '../image1/tech.png', 
      overlayText: ' Technology & Digital Literacy Awareness',
    },
    {
      src: '../image1/workPlace.jpg', 
      overlayText: 'Work Place Awareness ',
    },
    {
      src: '../image1/sucess.jpg', 
      overlayText: 'Find Sucess!!! ',
    },
  ];

  // Function to change slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="photo-slideshow" >
      {/* Render slideshow container */}
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides ${slideIndex === index ? 'show' : 'hide'}`}
          >
            <img className="slide-image" src={slide.src} alt={`Slide ${index + 1}`}  />
            <div className="overlay-text">{slide.overlayText}</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlideshow;
