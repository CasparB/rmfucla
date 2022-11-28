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

    const [numreviews, setNumreviews] = useState(0);
    const [epicStr, setEpicStr] = useState(0);
    const [deNeveStr, setDeNeveStr] = useState(0);
    const [rendStr, setRendStr] = useState(0);
    const [bPlateStr, setBPlateStr] = useState(0);

    const attemptGetReviews = async() => {
        const options = {
            author: user.email,
        };
        const data = await getReviews(options);
        console.log(data)
        setNumreviews( data.length );
    }
    const attemptGetEpic = async() => {
            const user_review = await getReviews(epicOpt);
            setEpicStr( user_review.length );
    }
    const attemptGetRend = async() => {
        const user_review = await getReviews(rendOpt);
        setRendStr( user_review.length );
    }
    const attemptGetBPlate = async() => {
        const user_review = await getReviews(bPlateOpt);
        setBPlateStr( user_review.length );
    }
    const attemptGetDeNeve = async() => {
        const user_review = await getReviews(deNeveOpt);
        setDeNeveStr( user_review.length );
    }
    useEffect(() => {
        attemptGetReviews();
        attemptGetEpic();
        attemptGetRend();
        attemptGetBPlate();
        attemptGetDeNeve();
    }, []);

    
   
    return (
        <div className='fullwidth-component'>
            <h2>Your Statistics</h2>
            <div className='data-placeholder'>
                <h3>Total reviews: {numreviews}.</h3>
                <h3>Epicuria: {epicStr}.</h3>
                <h3>De Neve: {deNeveStr}.</h3>
                <h3>Rendezvous: {rendStr}.</h3>
                <h3>Bruin Plate: {bPlateStr}.</h3>
            </div>
        </div>
    )
}

export default UserStats;