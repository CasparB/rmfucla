import ReviewList from '../components/ReviewList';
import HallStats from '../components/HallStats';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { reviews } from '../script/helpers';
import BackButton from '../components/BackButton';
import ReviewButton from '../components/ReviewButton';

const DiningHallPage = () => {
    const location = useLocation();
    const name = location.state;

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>{ name }</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <HallStats />
                {/* Display menu */}
                <Menu location={name}/>
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList location={name} />
            </div>
            <div className='sticky-bottom'>
                <ReviewButton location={ name }/>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default DiningHallPage;