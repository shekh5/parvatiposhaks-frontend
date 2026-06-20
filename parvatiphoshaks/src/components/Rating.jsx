import "../componentStyles/Rating.css"
import { useState } from "react";

export function Rating({ value, onRatingChange, disable }) {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0);

    const handleMouseEnter = () => {
        if (!disabled) {
            setHoverRating(rating);
        }
    }

    const handleMouseLeave = () => {
        if (!disabled) {
            setHoverRating(0);
        }
    }

    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating);
            if (onRatingChange) {
                onRatingChange(rating);
            }
        }
    }

    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoverRating || selectedRating );
            stars.push(<span
                key={i} className={`star ${isFilled ? 'filled' : 'empty'}`} 
                style={{ pointerEvents: disable ? "none" : "auto" }}  
                onMouseEnter={()=>handleMouseEnter(i)} 
                onMouseLeave={handleMouseLeave} 
                onClick={() => handleClick(i)}
                 >☆</span>)
        }
        return stars;
    }
    //handle star hover 
    return (<>

        <div className="rating">
            {generateStars()}
        </div>
    </>)
}