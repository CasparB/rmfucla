import { dininghalls } from '../script/helpers';
import { Link } from 'react-router-dom';

const DiningHallList = () => {
    // DiningHalls will use the UCLA Dining webscrape API
    // to populate a grid with all the dining halls. Tapping
    // on a dining hall in this grid will take the user to
    // that dining hall's menu page
    return (
        <div className='fullwidth-component'>
            <h2>Dining Halls</h2>
            <div className='grid-2'>
                { dininghalls.map((hall, i) => (
                    <Link to='/dininghall' state={ hall.name } key={i}>
                        <button>
                            <p>{hall.name}</p>
                        </button> 
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DiningHallList;