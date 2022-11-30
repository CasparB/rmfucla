import ReviewList from '../components/ReviewList';
import HallStats from '../components/HallStats';
import Menu from '../components/Menu';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ReviewButton from '../components/ReviewButton';
import history from '../script/helpers';
import { useEffect } from 'react';

const DiningHallPage = () => {
    const location = useLocation();
    let name = location.state;

    const last = history[history.length-1];
    if (!last)
        return <Navigate to='/' />;
    if (last[0] != '/dininghall' && name)
        history.push(['/dininghall', name]);

    if (!name) {
        if (history.length > 1 &&
            last[0] === '/dininghall')
            name = last[1];
        else
            return <Navigate to='/' />;
    }

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
                <HallStats location={name}/>
                {/* Display menu */}
                <Menu location={name}/>
                <div className='divider'></div>
                {/* Display general posts */}
                <ReviewList location={name} />
            </div>
            <div className='sticky-bottom'>
                <ReviewButton location={name} source='/dininghall' />
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default DiningHallPage;