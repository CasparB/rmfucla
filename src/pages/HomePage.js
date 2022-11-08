import Recommendations from '../components/Recommendations';
import DiningHallList from '../components/DiningHallList'
import ReviewList from '../components/ReviewList';
import PostButton from '../components/PostButton';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reviews } from '../script/helpers';

// Icons
import { IoPersonCircleOutline } from 'react-icons/io5';

const HomePage = () => {
    const { user } = UserAuth();
    const [name, setName] = useState('');
    const navigate = useNavigate;

    useEffect(() => {
        if (user.displayName)
            setName(user.displayName.replace(/ .*/,''));
    }, [user]);

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='home-hero'>
                        <h1>Hi {name}!</h1>
                        <Link to='/profile'>
                            <button className='actionable icon-wrapper'>
                                <IoPersonCircleOutline className='profile-icon'/>
                            </button>
                        </Link>
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
                <PostButton />
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default HomePage;