import { useState, useEffect } from "react";
import { db } from '../script/firebase';
import {getReviews} from '../script/fbAPI'
import { collection, getDocs } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext'

/*
OUTLINE OF A VERY SIMPLE RECOMENDATION ALGORITHM

get all the food offerings available today as an array

get all the reviews for the current user as an array

create an empty recomendations array
(e.g. of what this will look like [[fish, 2], [pizza, 4], [chicken, 3], [pasta, 5]])

loop through todays foods, and rank them based on their rating
    --> loop through reviews to see if user has reviewed this food
        --> if this food has been reviewed add its rating
        --> if this food hasn't been reviewed randomly generate a rating from U[1,5]

sort the recomendations array

print the top three items from the recomendation array

 
*/
const Recommendations = () => {
    // Recommendations will use the user context to determine
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "reviews");
    const { user } = UserAuth();  // can use user.email to get reviews for this user
    console.log(user.email);


    useEffect(() => {
        const getUsers = async () => {
                const options = {
                author:"cbroekhuizen@g.ucla.edu", // author:"{user.email}"
                from: new Date(1970, 1, 1, 0, 0, 0, 0)
            };
            const all_reviews =  await getReviews(options)

            // all reviews is an array of all reviews in the database

            // here is how we can extract some information for the first
            // review 
            const ix = 2
            console.log(all_reviews)
            //console.log("review author:", all_reviews[ix].author)
            //console.log("food name:", all_reviews[ix].foodid)
            //console.log("food rating:", all_reviews[ix].rating)

            // Here I want loop through and get an array for each user
            for (let review_ix=0; review_ix<all_reviews.length; review_ix++) {
                console.log("Author", review_ix, " ", all_reviews[review_ix].food.name);
            }

            /*CREATE RECS ARRAY*/
            var recs = []
            for (let review_ix=0; review_ix<all_reviews.length; review_ix++) {
                recs.push([all_reviews[review_ix].food.name, all_reviews[review_ix].rating])
            }
            console.log(recs)

            /*CREATE AN ARRAY WITH TOP 3 RECOMENDATIONS*/
            var user_recomendations = []

            for (let rvalue=5; rvalue>0; rvalue--){
                for (let i=0; i<recs.length; i++) {
                    if (recs[i][1] == rvalue)
                        user_recomendations.push(recs[i][0])
                }
                if (user_recomendations.length >= 3) {
                    console.log("here")
                    console.log(user_recomendations)
                    const user_recs = user_recomendations;
                    return user_recs
                }
            }
       


        };

        const urecs = getUsers();
        console.log("user recomendations");
        
        


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