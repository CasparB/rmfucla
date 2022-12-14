import { useState, useEffect } from "react";
import { db } from '../script/firebase';
import {getReviews} from '../script/fbAPI'
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext'
import { cafeteriaFood } from '../script/webscrapeAPI'

/*
OUTLINE OF A SIMPLE RECOMENDATION ALGORITHM

get all the food offerings available today as an array

get all the reviews for the current user as an array

  create a (nested) recs array. The recs array 
will be used to find the best foods for the current user.
An example recs array could be:

    [[apples, 4], [chicken, 3], [pizza, 5]]

Where each element of the array is another array. Each nested
array contains the name of a food item (from UCLA dining menu) and 
either the rating this user has previously given this food item 
or a randomly generated score (to encourage the user to sometimes)
try new things. 

ALGORITHM PSEUDO-CODE
loop through todays foods to creat the recs array,
    for each item in todays foods see if user has already reviewed it
        if yes, use that (most recent) rating as score
        if not, give food a random score
    push [food_name, score] to the recs array

loop through the recs array a second time pushing the highest
rated food items to a user_recomendations array. Return from the loop once
the recomendations array reaches 5 (arbitrary value can easily change).

The user_recomendations array will now contain the five best foods for the user
from todays menu offerings across the dining halls. 
*/

// generate scores by sampling normal distributionusing Box-Muller transform
// source code for performing Box-Muller transformation adapted from:
// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function GenerateRandomScore(temperature) {
    let U1 = Math.random();
    let U2 = Math.random();
    var score = Math.sqrt( -2.0*Math.log(U1) ) * Math.cos( 2.0*Math.PI*U2 );
    score = temperature*score // sore ~ N(0, temperature**2)
    score = Math.abs(score)   // allowed since distribution is symmetric
    // constraint score to be between 1 and 5
    score = Math.min(5, Math.max(score, 1))
    // make score an int
    score = Math.ceil(score)
    return score
}

const Recommendations =  ({foods}) => {
    // Recommendations will use the user context to determine
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.

    const [users, setUsers] = useState([]);
    const [user_recomendations_for_printing] = useState('');
    const usersCollectionRef = collection(db, "reviews");
    const { user } = UserAuth();  // can use user.email to get reviews for this user
    const [top5, setTop5] = useState([]);
    
    /*GET ALL REVIEWS FOR CURRENT USER*/
    const getUsers = async () => {
        const options = {
            author:user.email,  //"cbroekhuizen@g.ucla.edu", // 
            from: new Date(0)
        };
        const all_reviews_by_user = await getReviews(options)
        
        /*GET ALL OF TODAYS FOOD OFFERINGS*/
            var todays_food = []
        for (let food_ix=0; food_ix<foods.length; food_ix++){
            todays_food.push(foods[food_ix])
        }

        /*CREATE RECS ARRAY*/
        const temperature = 2.7; // making this value larger encourages user to try newer foods domain: (0, +inf)
                                 // all random scores converge to 1 as temperature --> 0
                                 // random scores are ~U[1,5] as temperature --> +inf
        var recs = []
        for (let ix=0; ix<todays_food.length; ix++) {
            const food = todays_food[ix]
            // has food already been rated
            var score = 0  // will change if food has already been rated by user
            for (let j=0; j<all_reviews_by_user.length; j++){
                if (all_reviews_by_user[j].food == food){
                    score = all_reviews_by_user[j].rating
                }
            }
            if (score == 0){
                // randomly assign a score to encourage trying new foods
                score = GenerateRandomScore(temperature)
            }
            recs.push([food, score])
        }

        // shuffle foods to remove lexical bias
        recs = recs.sort(() => Math.random() - 0.5)

        /*CREATE AN ARRAY WITH TOP 5 RECOMENDATIONS*/
        var user_recomendations = []

        let breakout = false;

        for (let rvalue=5; rvalue>0; rvalue--){
            if (breakout)
                break;
            for (let i=0; i<recs.length; i++) {
                if (user_recomendations.length >= 5) {
                    breakout = true;
                    break;
                    // return user_recomendations;
                }
                if (recs[i][1] == rvalue)
                    user_recomendations.push(recs[i][0])
            }
        }
        setTop5(user_recomendations);
    };

    useEffect(() => {
        if (foods && foods.length > 0)
            getUsers();
    }, [foods]);

    return (
        <div className='fullwidth-component'>
            <h2>For you</h2>
            <div className='data-wrapper rec-wrapper'>
                { 
                top5.map((food, i) => (
                    <div key={i} className='rec-container'>
                        <p className='food-rec'>{food.name} at </p>
                        <p className='rec-location'>{food.location}</p>
                    </div> 
                ))}
                {
                    (top5.length == 0) &&
                    <span>Loading...</span>
                }
            </div>
        </div>
    )
}

export default Recommendations;