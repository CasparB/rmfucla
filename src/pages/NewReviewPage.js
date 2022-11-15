import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';
import { validReview } from '../script/fbAPI';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const NewReviewPage = () => {
    const location = useLocation();
    const name = location.state;
    const [review, setReview] = useState({});
    const [classes, setClasses] = useState('')
    const { user } = UserAuth();

    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];

    const handleChange = (key, val) => {
        let revCopy = {
            ...review
        }
        revCopy[key] = val;
        setReview(revCopy);
    }

    const handleRatingChange = (val) => {
        let revCopy = {
            ...review
        }
        revCopy.rating = val;
        setReview(revCopy);
    }

    useEffect(() => {
        let revCopy = {
            ...review
        }
        revCopy.author = user.email;
        setReview(revCopy);
    }, [user]);

    const handleSubmit = () => {
        const now = new Date();
        const draft = {
            author: user.email,
            rating: review.rating,
            date: now,
            food: review.food
        }
        if (!validReview(draft)) {
            setClasses('invalid');
            setTimeout(() => setClasses(''), 1500);
        }
    }

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>New Review</h1>
                    </div>
                </div>

                <div className='review-form fullwidth-component'>
                    <div className='form-section'>
                        <h3>Location</h3>
                        <Dropdown options={options} value={defaultOption} placeholder='Select an option' 
                            onChange={e => handleChange('location', e.value)} />
                    </div>
                    <div className='form-section'>
                        <h3>Food</h3>
                        <Dropdown options={options} value={defaultOption} placeholder='Select an option' 
                            onChange={e => handleChange('food', e.value)} />
                    </div>
                    <div className='form-section'>
                        <h3>Rating</h3>
                        <StarRating rating={ review.rating } onChange={ handleRatingChange }/>
                    </div>
                    <button className={ `primary ${classes}`} type="submit"
                            onClick={ handleSubmit }>
                        Post review
                    </button>
                </div>

            </div>
            <div className='sticky-bottom'>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default NewReviewPage;