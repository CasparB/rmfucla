import ReviewList from '../components/ReviewList';
import UserStats from '../components/UserStats';
import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import LogOutButton from '../components/LogOutButton';
import DarkMode from '../components/DarkMode';
const ProfilePage = () => {
    const { user } = UserAuth();

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
                <ReviewList author={user.email} />
                
                <div className='divider'></div>
                {/* Log out button */}
                <LogOutButton />
                <DarkMode />
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