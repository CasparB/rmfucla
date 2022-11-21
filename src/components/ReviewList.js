import { getReviews } from '../script/fbAPI';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getShortFormReviews } from '../script/fbAPI';

const ReviewList = ({location}) => {
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
        attemptSetReviews(options);
    }, []);

    useEffect(() => {
        console.log('ratings', ratings);
    }, [ratings]);

    // <p className="dininghallname"> {review.food.loc}</p>
    //                         <p className="dateoffood">{review.dateof}</p>
    //                         <p>{review.rating} / 5</p>
    function convertDate(str) {
        const date = str.toDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = "";
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours >= 12) {
            hours = hours % 12;
            formattedTime = hours + ":" + minutes + " PM";
        } else {
            formattedTime = hours + ":" + minutes + " AM";
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

        return parseInt(sum / arr.length);
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
            {/* Cool syntax to iterate over each item in an array */}
            {console.log(reviews)}
            { 
            reviews.map((review, i) => (
                <div key={i}>
                    <div className='review'>
                        <div>
                            <h3>{review.food.name}</h3>
                            <p>{convertDate(review.date)}</p>
                            <StarRating rating={average(ratings[i])}/>
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default ReviewList;