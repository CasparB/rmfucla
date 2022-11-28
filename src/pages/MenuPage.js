import BackButton from '../components/BackButton';
import { useLocation } from 'react-router-dom';

const MenuPage = () => {
    const location = useLocation();
    const menu = location.state[0];
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
                { menu.map((item, i) => (
                    <div key={i}>
                        <p className="menu-item">{item}</p>
                    </div>
                ))}
                
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