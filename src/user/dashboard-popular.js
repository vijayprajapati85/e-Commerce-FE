import React, { useRef, useState, useEffect }  from 'react';
import './dashboard-popular.css';
const Popular = ({ items }) => {

      const carouselRef = useRef(null);

      const scroll = 400;

       const scrollLeft = () => {
        if (carouselRef.current) {
            // Scroll left by the width of one card (adjust 300px if your card width is different)
            carouselRef.current.scrollLeft -= scroll; 
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            // Scroll right by the width of one card
            carouselRef.current.scrollLeft += scroll;
        }
    };

    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToSlide = (index) => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = index * scroll; 
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Extract the index from a data attribute on the card
                        const index = parseInt(entry.target.dataset.index);
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: carouselRef.current,
                rootMargin: '0px',
                threshold: 0.5 
            }
        );

        if (carouselRef.current) {
            Array.from(carouselRef.current.children).forEach((child) => {
                observer.observe(child);
            });
        }

        return () => {
            if (carouselRef.current) {
                Array.from(carouselRef.current.children).forEach((child) => {
                    observer.unobserve(child);
                });
            }
        };
    }, []);
    

  return (
    <>
          <div className="popular-container">
              <h2>Best Selling Products</h2>
          </div>
          <div className="slider-wrapper">
              <button onClick={scrollLeft} className="nav-arrow left-arrow">{'<'}</button>
              <div ref={carouselRef} className="carousel-container">
                {items.map((item, index) => (
                    // Add a data-index attribute to identify the slide
                    <div key={index} data-index={index} className="popularcard">
                        {/* Your item content goes here */}
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
              <button onClick={scrollRight} className="nav-arrow right-arrow">{'>'}</button>
          </div>
            <div className="pagination-dots">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => scrollToSlide(index)}
                    />
                ))}
            </div>
    </>
    );
}

export default Popular;