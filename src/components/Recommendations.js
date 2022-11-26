import { useState, useEffect } from "react";
import { db } from '../script/firebase';
import {getReviews} from '../script/fbAPI'
import { collection, getDocs } from "firebase/firestore";

const Recommendations = () => {
    // Recommendations will use the user context to determine
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "reviews");


    useEffect(() => {
        const getUsers = async () => {
                const options = {
                //author:"cbroekhuizen@g.ucla.edu",
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
                console.log("Author", review_ix, " ", all_reviews[review_ix].author);
            }
        };

        getUsers();

    }, []);

    return (
        <div className='fullwidth-component'>
            <h2>For You!</h2>

            // these are static recomendations that will stand in place for 
            // recomendations that are dynamically computed from user reviews

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