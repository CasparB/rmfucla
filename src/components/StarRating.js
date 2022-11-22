import { useState } from 'react';

// Icons
import { IoMdStarOutline, IoMdStar, IoMdStarHalf } from 'react-icons/io'

const StarRating = (props) => {
    let rating = props.rating ?? 0;
    const floor = Math.floor(rating);
    const decimal = Math.round(rating*2)/2 - floor;
    let halfstar = false;
    rating = floor;
    if (decimal === 0.5)
        halfstar = true;
    else if (decimal === 1)
        rating = floor+1;

    const handleStarDrag = i => {
        if (!props.viewOnly)
            props.onChange(i+1);
    }

    return (
        <div className='star-container'>
            {[...Array(rating)].map((x, i) =>
                <IoMdStar className='star' key={i} 
                    onClick={ e => handleStarDrag(i) }/>
            )}
            {halfstar &&
                <IoMdStarHalf className='star' />
            }
            {[...Array(5-rating-halfstar)].map((x, i) =>
                <IoMdStarOutline className='star' key={rating+i} 
                    onClick={ e => handleStarDrag(rating+i) }/>
            )}
        </div>
    );
}

export default StarRating;