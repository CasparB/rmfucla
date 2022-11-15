import { useState } from 'react';

// Icons
import { IoMdStarOutline, IoMdStar } from 'react-icons/io'

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleStarDrag = i => {
        setRating(i+1);
    }

    return (
        <div className='star-container'>
            {[...Array(rating)].map((x, i) =>
                <IoMdStar className='star' key={i} 
                    onClick={ e => handleStarDrag(i) }/>
            )}
            {[...Array(5-rating)].map((x, i) =>
                <IoMdStarOutline className='star' key={rating+i} 
                    onClick={ e => handleStarDrag(rating+i) }/>
            )}
        </div>
    );
}

export default StarRating;