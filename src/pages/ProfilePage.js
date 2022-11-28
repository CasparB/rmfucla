import ReviewList from '../components/ReviewList';
import UserStats from '../components/UserStats';
import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import LogOutButton from '../components/LogOutButton';
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
                <div className='themebtn'>
                <button onClick={() => {
                   if(document.documentElement.getAttribute('color-scheme') === 'dark'){
                    document.documentElement.setAttribute('color-scheme', 'light');
                   }
                   else if(document.documentElement.getAttribute('color-scheme') === 'light'){
                    document.documentElement.setAttribute('color-scheme', 'dark');
                   } }}
                >Change Theme</button>
                
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

export default ProfilePage;