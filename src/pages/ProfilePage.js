import ReviewList from '../components/ReviewList';
import UserStats from '../components/UserStats';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { reviews } from '../script/helpers';

// Icons
import { MdArrowBackIos } from 'react-icons/md';

const ProfilePage = () => {
    const { logOut, user } = UserAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <Link to='/home'>
                            <button className='actionable icon-wrapper'>
                                <MdArrowBackIos className='back-icon'/>
                            </button>
                        </Link>
                        <h1>Profile</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <UserStats />
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList reviews={reviews} />
                {/* Sign out button */}
                <div className='divider'></div>
                <button className='secondary'
                        onClick={ handleLogOut }>
                    <span>Sign out</span>
                </button>

            </div>
            <div className='sticky-bottom'>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;