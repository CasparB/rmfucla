import { useState } from 'react';

// Icons
import { IoMdStarOutline, IoMdStar } from 'react-icons/io'

const StarRating = (props) => {
    const rating = props.rating ?? 0;

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
            {[...Array(5-rating)].map((x, i) =>
                <IoMdStarOutline className='star' key={rating+i} 
                    onClick={ e => handleStarDrag(rating+i) }/>
            )}
        </div>
    );
}

export default StarRating;