import { useState, useEffect } from "react";
import { db } from '../script/firebase';
import {getReviews} from '../script/fbAPI'
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext'

/*
OUTLINE OF A VERY SIMPLE RECOMENDATION ALGORITHM

get all the food offerings available today as an array

get all the reviews for the current user as an array

  create a (nested) food scores array that. The food scores array 
will be used to find the best foods for the current user.
An example food scores array could be:

    [[apples, 4], [chicken, 3], [pizza, 5]]

Where each element of the array is another array. Each nested
array contains the name of a food item (from UCLA dining menu) and 
either the rating this user has previously given this food item 
or a randomly generated score (to encourage the user to sometimes)
try new things. 



loop through todays foods to creat the food scores array,
    for each item in todays foods see if user has already reviewed it
        if yes, use that (most recent) rating as score
        if not, give food a random score

loop through the food scores array a second time pushing the highest
rated food items to a recomendations array. Return from the loop once
the recomendations array reaches 3 (arbitrary value can easily change).

The recomendations array will now contain the three best foods for the user
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
        const getUsers = async () => {
                const options = {
                author:user.email,  //"cbroekhuizen@g.ucla.edu", // 
                from: new Date(1970, 1, 1, 0, 0, 0, 0)
            };
            const all_reviews_by_user =  await getReviews(options)

            /*CREATE RECS ARRAY*/
            var recs = []
            for (let review_ix=0; review_ix<all_reviews_by_user.length; review_ix++) {
                recs.push([all_reviews_by_user[review_ix].food.name, all_reviews_by_user[review_ix].rating])
            }

            /*CREATE AN ARRAY WITH TOP 3 RECOMENDATIONS*/
            var user_recomendations = []

            for (let rvalue=5; rvalue>0; rvalue--){
                for (let i=0; i<recs.length; i++) {
                    if (user_recomendations.length >= 3) {
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
            Epicuria's pasta dish!
            <img src={require('../assets/images/pasta.jpeg')} width={150} height={150}/>
            De Neve hot pizza!
            <img src={require("../assets/images/pizza.jpeg")} width={150} height={150}/>
            Rendezvous fresh blueberries!
            <img src={require("../assets/images/blueberries.jpg")} width={150} height={150} />
            </div>

        </div>
    )
}

export default Recommendations;