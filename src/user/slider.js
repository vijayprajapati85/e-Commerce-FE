import React, { useState, useEffect } from 'react';
import '../user/Slider.css';

const CombinedSlider = ({ slides }) => {
  const [index, setIndex] = useState(0);

  // Auto-play Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // 4-second delay

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slider-wrapper">
        <h2>Our Products</h2>
      {/* Radio buttons controlled by index state */}
      {slides.map((_, i) => (
        <input
          key={i}
          type="radio"
          name="slider"
          id={`slide${i}`}
          checked={index === i}
          onChange={() => setIndex(i)} // Manual click updates state
        />
      ))}

      <div className="slides-container" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, i) => (
          <div className="slide" key={i}>
            <img src={slide.url} alt={slide.title} />
          </div>
        ))}
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <label key={i} htmlFor={`slide${i}`} className="dot"></label>
        ))}
      </div>
    </div>
  );
};

export default CombinedSlider;