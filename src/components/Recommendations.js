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
const Recommendations =  () => {
    // Recommendations will use the user context to determine
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.

    const [users, setUsers] = useState([]);
    const [user_recomendations_for_printing] = useState('');
    const usersCollectionRef = collection(db, "reviews");
    const { user } = UserAuth();  // can use user.email to get reviews for this user


    useEffect(() => {

        /*GET ALL REVIEWS FOR CURRENT USER*/
        const getUsers = async () => {
            const options = {
                author:user.email,  //"cbroekhuizen@g.ucla.edu", // 
                from: new Date(1970, 1, 1, 0, 0, 0, 0)
            };
            const all_reviews_by_user =  await getReviews(options)
            
            /*GET ALL OF TODAYS FOOD OFFERINGS*/
                var todays_food = []
            const foods = await cafeteriaFood()
            for (let food_ix=0; food_ix<foods.length; food_ix++){
                todays_food.push(foods[food_ix].name)
            }

            /*CREATE RECS ARRAY*/
            var recs = []
            for (let ix=0; ix<todays_food.length; ix++) {
                const todays_food_name = todays_food[ix]
                // has todays_food_name already been rated
                var score = 0  // will change if food has already been rated by user
                for (let j=0; j<all_reviews_by_user.length; j++){
                    if (all_reviews_by_user[j].food.name == todays_food_name){
                        score = all_reviews_by_user[j].rating
                    }
                }
                if (score == 0){
                    // randomly assign a score to encourage trying new foods
                    score = Math.ceil(Math.random()*5)
                }
                recs.push([todays_food_name, score])
            }

            /*CREATE AN ARRAY WITH TOP 5 RECOMENDATIONS*/
            var user_recomendations = []

            for (let rvalue=5; rvalue>0; rvalue--){
                for (let i=0; i<recs.length; i++) {
                    if (user_recomendations.length >= 5) {
                        return user_recomendations
                    }
                    if (recs[i][1] == rvalue)
                        user_recomendations.push(recs[i][0])
                }
            }

        };

        const usr_recs = getUsers();
        console.log("user recomendations");
        console.log(usr_recs)

    }, []);

    return (
        <div className='fullwidth-component'>
            <h2>For You!</h2>
            <div className="scrollable-div">
            chicken pasta dish!
            pizza!
            fresh blueberries!
            Chicken Tenders!
            Meatball Sub!
            </div>

        </div>
    )
}

export default Recommendations;