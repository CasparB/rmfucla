import Recommendations from '../components/Recommendations';
import DiningHallList from '../components/DiningHallList'
import ReviewList from '../components/ReviewList';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { reviews } from '../script/helpers';
import ProfileButton from '../components/ProfileButton';
import ReviewButton from '../components/ReviewButton';
import { doMenuSync } from '../script/fbAPI';

// import { cafeteriaFood } from '../script/webscrapeAPI';

const HomePage = () => {
    const { user } = UserAuth();
    const [name, setName] = useState('');
    const navigate = useNavigate;

    const attemptMenuSync = async () => {
        // if (await doMenuSync()) {
        //     const foods = cafeteriaFood();
        //     console.log(foods);
        // }
    }

    useEffect(() => {
        // Set user name
        if (user.displayName)
            setName(user.displayName.replace(/ .*/,''));
        // Attempt menu sync
        attemptMenuSync();
    }, [user]);

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='home-hero'>
                        <h1>Hi {name}!</h1>
                        <ProfileButton />
                    </div>
                </div>
                {/* Display food recommendations */}
                <Recommendations />
                {/* Display dining halls */}
                <DiningHallList />
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList reviews={reviews} />
            </div>
            <div className='sticky-bottom'>
                <ReviewButton />
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default HomePage;