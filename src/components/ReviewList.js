import { getReviews } from '../script/fbAPI';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getShortFormReviews } from '../script/fbAPI';
import LikeButton from './LikeButton';

const ReviewList = ({location, author}) => {
    // ReviewList takes an array of posts and renders each
    // post in a specific order. The ReviewList component 
    // should have a filter option, where posts can be
    // filtered based on a selectable criteria e.g. rating
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);

    const attemptSetReviews = async (options) => {
        const data = await getReviews(options);
        if (data) {
            setReviews(data);
            const temp = [];
            for (var i = 0; i < data.length; i++) {
                const rating = await getShortFormReviews(data[i].food);
                if (rating)
                    temp.push(rating);
                else
                    temp.push([]);
            }
            setRatings(temp);
        }
    }

    useEffect(() => {
        let options = {};
        if (location)
            options.location = location;
            options.author = author;
        attemptSetReviews(options);
    }, []);

    function convertDate(str) {
        const date = str.toDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = "";
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours > 12) {
            hours = hours % 12;
            formattedTime = hours + ":" + minutes + " AM";
        } else {
            formattedTime = hours + ":" + minutes + " PM";
        }
        return formattedTime;

    }

    function average (arr) {
        if (!arr || !arr.length)
            return 0;
        var sum = 0; 
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i].rating;
        }

        return (sum / arr.length);
    }
    
    return (
        <div className='fullwidth-component'>
            <div className='space-between'>
                <h2>
                    Reviews
                </h2>
                <button className='actionable'>
                    <span>Filter by</span>
                </button>
            </div>
            { 
            reviews.map((review, i) => (
                <div key={i}>
                    <div className='review'>
                        <div>
                            <h3>{review.food.name}</h3>
                            <p>{`${convertDate(review.date)}at${review.food.location}`}</p>
                            {ratings[i] &&
                                <div className='review-footer'>
                                    <div className='rating-wrapper'>
                                        <StarRating rating={average(ratings[i])}/>
                                        <p className='count-text'>{`(${ratings[i].length})`}</p>
                                    </div>
                                    <LikeButton review={review} />
                                </div>
                            }
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default ReviewList;