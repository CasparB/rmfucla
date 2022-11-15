import ReviewList from '../components/ReviewList';
import UserStats from '../components/UserStats';
import { UserAuth } from '../context/AuthContext';
import { reviews } from '../script/helpers';
import BackButton from '../components/BackButton';
import LogOutButton from '../components/LogOutButton';

const ProfilePage = () => {
    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>Profile</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <UserStats />
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList reviews={reviews} />
                
                <div className='divider'></div>
                {/* Log out button */}
                <LogOutButton />

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