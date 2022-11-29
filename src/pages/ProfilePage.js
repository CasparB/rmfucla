import ReviewList from '../components/ReviewList';
import UserStats from '../components/UserStats';
import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import LogOutButton from '../components/LogOutButton';
import ChangeThemeButton from '../components/ChangeThemeButton';
import '../styles/index.css'

const ProfilePage = () => {
    function getCurrentTheme(){
        let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; 
        return theme;
    }
    function loadTheme(theme){
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${theme}`);    
    } 
    
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
                <ChangeThemeButton />
               
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