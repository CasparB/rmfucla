import BackButton from '../components/BackButton';
import { useLocation } from 'react-router-dom';
import history from '../script/helpers';
import { average } from '../script/helpers';

// Icons
import { IoMdStarOutline, IoMdStar } from 'react-icons/io'

const MenuPage = () => {
    const location = useLocation();
    const menu = location.state[0];

    const last = history[history.length-1];
    if (last[0] != '/menu')
        history.push(['/menu']);

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>{location.state[1]}</h1>
                    </div>
                </div>
                {/* the code body for the menu. display all the food items */}
                <div className='menu-wrapper'>
                    { menu.map((item, i) => (
                        <div key={i} className='menu-item'>
                            {(item.reviews.length === 0) &&
                                <div className='menu-rating-wrapper'>
                                    <p className='menu-rating-text outline'>N/A</p>
                                    <IoMdStarOutline className='menu-star outline'/>
                                </div>
                            }
                            {(item.reviews.length > 0) &&
                                <div className='menu-rating-wrapper'>
                                    <p className='menu-rating-text'>{average(item.reviews)}</p>
                                    <IoMdStar className='menu-star'/>
                                </div>
                            }   
                            <p className='menu-item'>{item.name}</p>
                        </div>
                    ))}
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

export default MenuPage;