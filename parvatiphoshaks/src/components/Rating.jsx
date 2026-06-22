import '../componentStyles/Rating.css';
import { useState } from 'react';

export function Rating({ value, onRatingChange, disable }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  const handleMouseEnter = (ratingValue) => {
    if (!disable) {
      setHoverRating(ratingValue);
    }
  };

  const handleMouseLeave = () => {
    if (!disable) {
      setHoverRating(0);
    }
  };

  const handleClick = (ratingValue) => {
    if (!disable) {
      setSelectedRating(ratingValue);
      if (onRatingChange) {
        onRatingChange(ratingValue);
      }
    }
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : 'empty'}`}
          style={{ pointerEvents: disable ? 'none' : 'auto' }}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          ☆
        </span>
      );
    }
    return stars;
  };
  //handle star hover
  return (
    <>
      <div className="rating">{generateStars()}</div>
    </>
  );
}
