import ReviewList from '../components/ReviewList';
import HallStats from '../components/HallStats';
import Menu from '../components/Menu';
import PostButton from '../components/PostButton';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { reviews } from '../script/helpers';

// Icons
import { MdArrowBackIos } from 'react-icons/md';

const DiningHallPage = () => {
    const location = useLocation();
    const name = location.state;

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
                        <h1>{ name }</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <HallStats />
                {/* Display menu */}
                <Menu />
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

export default DiningHallPage;