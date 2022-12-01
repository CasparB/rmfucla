import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';
import { validReview } from '../script/fbAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFoods, addReview, getShortFormReviews } from '../script/fbAPI';
import Dropdown from 'react-dropdown';
import SyncModal from '../components/SyncModal';
import history from '../script/helpers';
import { Navigate } from 'react-router-dom';
import 'react-dropdown/style.css';

const NewReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state;
    const [review, setReview] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [menu, setMenu] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [locations, setLocations] = useState([]);
    const [locVal, setLocVal] = useState(false);
    const [message, setMessage] = useState(null);
    const [foods, setFoods] = useState([]);
    const [types, setTypes] = useState([]);
    const { user } = UserAuth();

    const retrieveMenu = async () => {
        setMessage('Downloading Menus');
        setSyncing(true);
        const foods = await getFoods();
        setMenu(foods);
        const data = [];
        for (var i = 0; i < foods.length; i++) {
            if (!data.includes(foods[i].location)) {
                // Special case:
                if (!foods[i].location.includes('Late Night'))
                    data.push(foods[i].location);
            }
        }
        setLocations(data);
        setSyncing(false);
    }
    
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

    useEffect(() => {
        attemptSetTypes();
        attemptSetFoods();
        validateForm();
    }, [review]);

    useEffect(() => {
        attemptSetTypes();
        attemptSetFoods();
    }, [locations])

    const attemptSetTypes = () => {
        const typeData = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].location === review.location) {
                for (var j = 0; j < menu[i].type.length; j++) {
                    if (!typeData.includes(menu[i].type[j]))
                     typeData.push(menu[i].type[j]);
                }
            }
        }
        const formatted = [];
        if (typeData.includes('Breakfast')) 
            formatted.push('Breakfast');
        if (typeData.includes('Lunch')) 
            formatted.push('Lunch');
        if (typeData.includes('Dinner')) 
            formatted.push('Dinner');
        if (typeData.includes('Extended Dinner')) 
            formatted.push('Extended Dinner');
        setTypes(formatted);
    }

    const attemptSetFoods = () => {
        const foodData = [];
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].location === review.location &&
                menu[i].type.includes(review.type)) {
                    foodData.push(menu[i].name);
            }
        }
        const foodNames = [];
        for (var i = 0; i < foodData.length; i++)
            foodNames.push(foodData[i]);
        setFoods(foodNames);
    }

    const last = history[history.length-1];
    if (!last)
        return <Navigate to='/' />;
    if (last[0] != '/newreview')
        history.push(['/newreview']);

    const clearDropdowns = (temp, dropdowns) => {
        for (var i = 0; i < dropdowns.length; i++) {
            delete temp[dropdowns[i]];
        }
        delete temp['rating'];
    }

    const handleSelectChange = (key, val) => {
        let temp = {
            ...review
        }
        temp[key] = val;
        switch(key) {
            case 'location':
                clearDropdowns(temp, ['type', 'name'])
                break;
            case 'type':
                 clearDropdowns(temp, ['name']);
                break;
            case 'name':
                clearDropdowns(temp, []);
                break;
        }
        setReview(temp);
    }

    const handleRatingChange = (val) => {
        let revCopy = {
            ...review
        }
        revCopy.rating = val;
        setReview(revCopy);
    }

    const validateForm = () => {
        const now = new Date();
        let food;
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
        if (validReview(draft)) {
            setDisabled(false);
            return draft;
        } 
        setDisabled(true);
        return false;
    }

    const attemptAddReview = async (draft) => {
        await addReview(draft);
        setSyncing(false);
        navigate('/home');
    }

    const handleSubmit = () => {
        const draft = validateForm();
        if (draft) {
            setMessage('Uploading Review');
            setSyncing(true);
            attemptAddReview(draft);
        }
    }

    return (
        <div className='frame'>
            <SyncModal visible={ syncing } message={ message } />
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
                        <Dropdown options={locations} disabled={!!locVal} placeholder='Select an option'
                            value={review.location}
                            onChange={e => handleSelectChange('location', e.value)} />
                    </div>
                    { review.location &&
                        <div className='form-section'>
                            <h3>Meal period</h3>
                            <Dropdown options={types} placeholder='Select an option' 
                                value={review.type} 
                                onChange={e => handleSelectChange('type', e.value)} />
                        </div>
                    }
                    { review.type &&
                        <div className='form-section'>
                            <h3>Food</h3>
                            <Dropdown options={foods} placeholder='Select an option'
                                value={review.name} 
                                onChange={e => handleSelectChange('name', e.value)} />
                        </div>
                    }
                    { review.name &&
                        <div>
                            <h3>Rating</h3>
                            <div className='review-rating-wrapper'>
                                <StarRating rating={ review.rating } 
                                    onChange={ handleRatingChange }/>
                            </div>
                        </div>
                    }
                    <button className='primary' disabled={disabled} type="submit"
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