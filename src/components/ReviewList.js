import { getReviews } from '../script/fbAPI';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getShortFormReviews } from '../script/fbAPI';
import LikeButton from './LikeButton';
import Dropdown from 'react-dropdown';

// Icons
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';

const ReviewList = ({location, author, showDate}) => {
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState('');
    const [ascending, setAscending] = useState(false);

    const options = [
        'Time',
        'Rating',
        'Likes'
    ];

    useEffect(() => {
        let options = {};
        const minDate = new Date(0);
        if (location)
            options.location = location;
        if (author) {
            options.author = author;
            options.from = minDate;
        }
        attemptSetReviews(options);
    }, []);

    const setLikes = (review, likes) => {
        let temp = [...reviews];
        for (var i = 0; i < temp.length; i++) {
            if (temp[i] === review)
                temp[i].likes = likes;
        }
        setReviews(temp);
    }

    const attemptSetReviews = async (options) => {
        let data = await getReviews(options);
        if (data) {        
            for (var i = 0; i < data.length; i++) {
                if (author) {
                    data[i].rating = [{
                        rating: data[i].rating
                    }]
                }
                else {
                    const rating = await getShortFormReviews(data[i].food);
                    data[i].rating = rating;
                }
            }
            setReviews(data);
        }
    }

    const convertDate = (str) => {
        const date = str.toDate();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var formattedTime = "";
        
        if (showDate)
            formattedTime += month + '/' + day + ' ';

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours > 12) {
            hours = hours % 12;
            formattedTime += hours + ":" + minutes + " AM";
        } else {
            formattedTime += hours + ":" + minutes + " PM";
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

    const handleFilterChange = (val, asc) => {
        let temp = [...reviews];
        setFilter(val);
        switch (val) {
            case 'Time':
                temp.sort((a, b) => {
                    const aDate = a.date.toDate();
                    const bDate = b.date.toDate();
                    if (aDate < bDate)
                        return -1;
                    if (aDate > bDate)
                        return 1;
                    return 0;
                });
                break;
                break;
            case 'Rating':
                temp.sort((a, b) => {
                    const aAvg = average(a.rating);
                    const bAvg = average(b.rating);
                    if (aAvg < bAvg)
                        return -1;
                    if (aAvg > bAvg)
                        return 1;
                    return 0;
                });
                break;
            case 'Likes':
                temp.sort((a, b) => {
                    if (a.likes.length < b.likes.length)
                        return -1;
                    if (a.likes.length > b.likes.length)
                        return 1;
                    return 0;
                });
                break;
        }
        if (!asc)
            temp.reverse();
        setAscending(asc);
        setReviews(temp);
    }

    const handleSortPress = () => {
        handleFilterChange(filter, !ascending);
    }
    
    return (
        <div className='fullwidth-component'>
            <div className='space-between'>
                <h2>
                    Reviews
                </h2>
                <div className='filter-wrapper'>
                    <button className='sort'
                        onClick={ handleSortPress }>
                        {ascending && <TbSortAscending className='sort-icon'/>}
                        {!ascending && <TbSortDescending className='sort-icon'/>}
                    </button>
                    <Dropdown className='filter' options={options} value={options[0]}
                        onChange={e => handleFilterChange(e.value)} />
                </div>
            </div>
            { 
            reviews.map((review, i) => (
                <div key={i}>
                    <div className='review'>
                        <div>
                            <div className='review-header'>
                                <h3>{review.food.name}</h3>
                                {author && <LikeButton disabled={true} review={review} setLikes={setLikes} />}
                                {!author && <LikeButton review={review} setLikes={setLikes} />}
                            </div>
                            <p>{`${convertDate(review.date)} at ${review.food.location}`}</p>
                            {review.rating &&
                                <div className='review-footer'>
                                        <div className='rating-wrapper'>
                                                <StarRating rating={average(review.rating)}/>
                                                {!author &&
                                                    <p className='count-text'>{`(${review.rating.length})`}</p>
                                                }
                                        </div>
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