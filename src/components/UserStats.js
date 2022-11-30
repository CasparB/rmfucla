import { UserAuth } from '../context/AuthContext';
import { getReviews } from '../script/fbAPI';
import { useEffect, useState } from 'react';
const UserStats = () => {
    // UserStats will use the user context to gather
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.
    const { user } = UserAuth();

    const epicOpt = {
            author: user.email,
            location: 'Epicuria',
    }
    const bPlateOpt = {
        author: user.email,
        location: 'Bruin Plate',
    }
    const rendOpt = {
        author: user.email,
        location: 'Rendezvous',
    }
    const deNeveOpt = {
        author: user.email,
        location: 'De Neve',
    }

    const [numreviews, setNumreviews] = useState(-1);
    const [locations, setLocations] = useState({});

    const attemptGetReviews = async() => {
        const minDate = new Date(0);
        const options = {
            author: user.email,
            from: minDate
        };
        const data = await getReviews(options);
        setNumreviews( data.length );

        let temp = {};

        for (var i = 0; i < data.length; i++) {
            if (!temp[data[i].food.location]) {
                temp[data[i].food.location] = 1;
            }
            else
                temp[data[i].food.location] += 1;
                
        }
        setLocations(temp);
    }
    
    useEffect(() => {
        attemptGetReviews();
    }, []);

    return (
        <div className='fullwidth-component'>
            <h2>Your statistics</h2>
            <div className='data-wrapper stats-wrapper'>
                {
                    (numreviews == -1) &&
                    <span>Loading...</span>
                }
                { (numreviews == 0) &&
                    <p>It looks like you haven't reviewed any foods. Press the button in the lower-right corner of the home page to get started!</p>
                }
                { (numreviews > 0) &&
                    (Object.keys(locations).length > 0) &&
                    <h3>You've written {numreviews} reviews!</h3>
                }
                {
                    Object.keys(locations).map((key, index) => ( 
                        <p className='stat' key={index}>{key}: {locations[key]}</p> 
                    ))
                }
                
            </div>
        </div>
    )
}

export default UserStats;