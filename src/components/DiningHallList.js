import { dininghalls } from '../script/helpers';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTimes } from '../script/webscrapeAPI';

const DiningHallList = () => {
    // DiningHalls will use the UCLA Dining webscrape API
    // to populate a grid with all the dining halls. Tapping
    // on a dining hall in this grid will take the user to
    // that dining hall's menu page
    const [halls, setHalls] = useState([]);

    const attemptGetDiningHalls = async () => {
        const data = await getTimes();
        if (halls)
            setHalls(data);
    }
    useEffect(() => {
        attemptGetDiningHalls();
    }, [])

    const getImage = (location) => {
        let sanitized = location.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        sanitized = sanitized.toLowerCase().replace(/\s/g, '');
        var module;
        try {
            module = require(`../assets/images/${sanitized}.webp`);
        } catch(error) {
            module = require('../assets/images/noimage.png');
        }
        return module;
    }

    return (
        <div className='fullwidth-component'>
            <h2>Dining options</h2>
            <div className='grid-3'>
                { halls.map((hall, i) => (
                    <Link to='/dininghall' state={ hall.location } key={i}>
                        <button>
                            <img className='dininghall-logo'
                                src={getImage(hall.location)} />
                            <p>{hall.name}</p>
                        </button> 
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default DiningHallList;