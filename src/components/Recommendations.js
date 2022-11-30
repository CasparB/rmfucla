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
                score = Math.ceil(Math.random()*5)
            }
            recs.push([food, score])
        }

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
        // const usr_recs = getUsers();
        // console.log("user recomendations");
        // console.log(usr_recs)
        if (foods && foods.length > 0)
            getUsers();
    }, [foods]);

    return (
        <div className='fullwidth-component'>
            <h2>For You</h2>
            <div className='data-placeholder'>
            { 
            top5.map((food, i) => (
                <div key={i}>
                    <p>{food.name} at {food.location}</p>
                </div> 
            ))}
            </div>
        </div>
    )
}

export default Recommendations;