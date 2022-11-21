import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';
import { validReview } from '../script/fbAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFoods, addReview } from '../script/fbAPI';
import Dropdown from 'react-dropdown';
import SyncModal from '../components/SyncModal';
import 'react-dropdown/style.css';

const NewReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state;
    const [review, setReview] = useState({});
    const [classes, setClasses] = useState('');
    const [menu, setMenu] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [locations, setLocations] = useState([]);
    const [locVal, setLocVal] = useState(false);
    const [foods, setFoods] = useState([]);
    const { user } = UserAuth();

    const types = [
        'Breakfast',
        'Lunch',
        'Dinner'
    ];

    // Upon loading page, retrieve menu and set location if specified
    useEffect(() => {
        if (name) { // location has been configured in Link
            setLocVal(name);
            let revCopy = {
                ...review
            }
            revCopy.location = name;
            setReview(revCopy);
        }
        retrieveMenu();
    }, []);

    const retrieveMenu = async () => {
        setSyncing(true);
        const foods = await getFoods();
        setMenu(foods);
        const data = [];
        for (var i = 0; i < foods.length; i++) {
            if (!data.includes(foods[i].location))
                data.push(foods[i].location);
        }
        setLocations(data);
        setSyncing(false);
    }

    useEffect(() => {
        const data = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].location === review.location &&
                menu[i].type.includes(review.type)) {
                data.push(menu[i].name);
            }
        }
        setFoods(data);
    }, [review])

    const handleSelectChange = (key, val) => {
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

    const attemptAddReview = async (draft) => {
        await addReview(draft);
        setSyncing(false);
        navigate('/home');
    }

    const handleSubmit = () => {
        const now = new Date();
        let food;
        setSyncing(true);
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].location === review.location &&
                menu[i].type.includes(review.type) &&
                menu[i].name === review.name) {
                food = {
                    name: menu[i].name,
                    location: menu[i].location,
                    type: menu[i].type
                }
                break;
            }
        }
        const draft = {
            author: user.email,
            rating: review.rating,
            date: now,
            food: food
        }
        if (!validReview(draft)) {
            setClasses('invalid');
            setTimeout(() => setClasses(''), 1500);
            return false;
        }
        attemptAddReview(draft);
    }

    return (
        <div className='frame'>
            <SyncModal visible={ syncing } />
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page blur'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>New Review</h1>
                    </div>
                </div>

                <div className='review-form fullwidth-component'>
                    <div className='form-section'>
                        <h3>Location</h3>
                        <Dropdown options={locations} disabled={!!locVal} value={locVal} placeholder='Select an option' 
                            onChange={e => handleSelectChange('location', e.value)} />
                    </div>
                    { review.location &&
                        <div className='form-section'>
                            <h3>Meal period</h3>
                            <Dropdown options={types} placeholder='Select an option' 
                                onChange={e => handleSelectChange('type', e.value)} />
                        </div>
                    }
                    { review.type &&
                        <div className='form-section'>
                            <h3>Food</h3>
                            <Dropdown options={foods} placeholder='Select an option' 
                                onChange={e => handleSelectChange('name', e.value)} />
                        </div>
                    }
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
            <div className='sticky-bottom blur'>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default NewReviewPage;