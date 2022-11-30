import Recommendations from '../components/Recommendations';
import DiningHallList from '../components/DiningHallList'
import ReviewList from '../components/ReviewList';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { reviews } from '../script/helpers';
import ProfileButton from '../components/ProfileButton';
import ReviewButton from '../components/ReviewButton';
import { cafeteriaFood } from '../script/webscrapeAPI';
import { otherFoods } from '../script/webscrapeAPI';
import { get_times } from '../script/webscrapeAPI';
import { doMenuSync, didMenuSync } from '../script/fbAPI';
import { addFood, getReviews, getFoods } from '../script/fbAPI';
import SyncModal from '../components/SyncModal';
import FoodSearch from '../components/FoodSearch';

const HomePage = () => {
    const { user } = UserAuth();
    const [name, setName] = useState('');
    const [syncing, setSyncing] = useState(false);
    const [progress, setProgress] = useState(0.0);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate;

    let increment = 1;
    let prog = 0;
    const attemptMenuSync = async () => {
        if (await doMenuSync()) {
            setSyncing(true);
            const cafeteria = await cafeteriaFood();
            const other = await otherFoods();
            const foods = cafeteria.concat(other);
            increment = 1/foods.length;
            for (var i = 0; i < foods.length; i++) {
                addFood(foods[i]).then(() => {
                    prog = prog + increment;
                    setProgress(prog);
                });
            } 
        } else {
            attemptSetFoods();
        }
    }

    const attemptSetFoods = async () => {
        const data = await getFoods();
        setFoods(data);
    }

    useEffect(() => {
        if (progress >= 0.99) {
            didMenuSync();
            setSyncing(false);
            attemptSetFoods();
        }
    }, [progress]);

    useEffect(() => {
        // Set user name
        if (user.displayName)
            setName(user.displayName.replace(/ .*/,''));
        // Attempt menu sync
        attemptMenuSync();
    }, [user]);

    return (
        <div className='frame'>
            <SyncModal visible={ syncing } progress={ progress } message='Downloading Menus' />
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page blur'>
                <div className='sticky-top'>
                    <div className='home-hero'>
                        <h1>Hi {name}!</h1>
                        <ProfileButton />
                    </div>
                </div>
                {/* Display food recommendations */}
                <Recommendations foods={foods}/>
                {/* Display dining halls */}
                <DiningHallList />
                {/* Food Search */}
                <FoodSearch foods={foods}/>
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList />
            </div>
            <div className='sticky-bottom blur'>
                <ReviewButton />
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default HomePage;