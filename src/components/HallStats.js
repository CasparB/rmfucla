import { useState, useEffect } from 'react';
import { getReviews } from '../script/fbAPI';
import StarRating from './StarRating';

const HallStats = ({location}) => {
    const [numreviews, setNumreviews] = useState(0);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        getHallStats();
    }, []);

    const getHallStats = async () => {
        const reviews = await getReviews({
            location: location
        });
        setNumreviews(reviews.length);
        let avg = 0;
        for (var i = 0; i < reviews.length; i++) {
            avg += reviews[i].rating;
        }
        avg /= reviews.length;
        const floor = Math.floor(avg);
        const decimal = Math.round(avg*2)/2 - floor;
        setRating(floor+decimal);
    }

    return (
        <div className='fullwidth-component'>
            <h2>Statistics</h2>
            <div className='data-wrapper'>
                { (numreviews == 0 ) &&
                    <p>There has been no reviews for this hall today. Be the first!</p>
                }
                { (numreviews == 1 ) &&
                    <p>There has been 1 review today, averaging to a score of {rating}/5.</p>
                }
                { (numreviews > 1 ) &&
                    <p>There have been {numreviews} reviews today, averaging to a score of {rating}/5.</p>
                }
                { (numreviews != 0) &&
                    <div className='hallstat-rating-wrapper'>
                        <StarRating viewOnly rating={rating} />
                    </div>
                }
            </div>
        </div>
    )
}

export default HallStats;