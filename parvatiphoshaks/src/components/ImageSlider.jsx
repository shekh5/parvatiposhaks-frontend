import '../componentStyles/ImageSlider.css';
import { useEffect, useState } from 'react';

const images = ['/images/banner2.png', '/images/banner3.png', '/images/banner4.png'];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const Interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(Interval);
  }, []);

  return (
    <>
      <div className="image-slider-container">
        <div className="slider-images" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => {
            return (
              <div className="slider-item" key={index}>
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            );
          })}
        </div>

        <div className="slider-dots">
          {images.map((_, index) => {
            return (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
