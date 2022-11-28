import { getReviews } from '../script/fbAPI';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getShortFormReviews } from '../script/fbAPI';
import LikeButton from './LikeButton';
import Dropdown from 'react-dropdown';

const ReviewList = ({location, author}) => {
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [filter, setFilter] = useState('');

    const options = [
        'Time',
        'Rating',
        'Likes'
    ]

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

    const convertDate = (str) => {
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

    const average = (arr) => {
        if (!arr || !arr.length)
            return 0;
        var sum = 0; 
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i].rating;
        }

        return (sum / arr.length);
    }

    const handleFilterChange = () => {

    }
    
    return (
        <div className='fullwidth-component'>
            <div className='space-between'>
                <h2>
                    Reviews
                </h2>
                <Dropdown className='filter' options={options} value={options[0]}
                        onChange={e => handleFilterChange(e.value)} />
            </div>
            { 
            reviews.map((review, i) => (
                <div key={i}>
                    <div className='review'>
                        <div>
                            <h3>{review.food.name}</h3>
                            <p>{`${convertDate(review.date)} at ${review.food.location}`}</p>
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