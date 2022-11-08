import { db } from './firebase';
import { UserAuth } from '../context/AuthContext';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { 
    sameDate,
    foodID,
    hexID
} from './helpers';

// Add food to item to Foods database
// - if item exists, see if date is new
// - if date is not new, return false 
export const addFood = async (food) => {
    if (!validFood(food))
        return false;

    const id = foodID( [food.name, food.location, food.type] );
    const ref = doc(db, 'foods', id);
    const docSnap = await getDoc(ref);

    var data;
    const today = new Date();
    if (docSnap.exists()) {
        data = docSnap.data();
        const mostRecentUploadDate = data.dates[data.dates.length-1].toDate();
        if (sameDate(mostRecentUploadDate, today)) {
            console.log('FOOD ALREADY UPLOADED TODAY');
            return false;
        }
        const dates = data.dates.concat( [today] )
        await updateDoc(ref, { dates: dates });
    } else {
        const newFood = {
            ...food,
            reviews: [],
            dates: [ today ]
        }
        await setDoc(ref, newFood);
    }
    return true;
}

// Add review to food in the Reviews database
// - if food does not exist, return false
// - if user review already exist today, return false
// Add short form review to the Foods database
export const addReview = async (review) => {
    if (!validReview(review) || !validFood(review.food))
        return false;
    
    const fid = foodID( [review.food.name, review.food.location, review.food.type] );
    const foodRef = doc(db, 'foods', fid);
    const foodDocSnap = await getDoc(foodRef);
    if (!foodDocSnap.exists()) {
        console.log('FOOD DOES NOT EXIST');
        return false;
    }

    const td = new Date();
    td.setHours(0, 0, 0, 0);
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, 
        where('author', '==', review.author),
        where('foodid', '==', fid),
        where('date', '>', td)
    );
    const qSnap = await getDocs(q);

    if (!qSnap.empty) {
        console.log('AUTHOR ALREADY SUBMITTED REVIEW')
        return false;
    }

    const newReview = {
        ...review,
        foodid: fid
    }
    const rid = hexID();
    const reviewRef = doc(db, 'reviews', rid)
    await setDoc(reviewRef, newReview);
    console.log('upload')
    return true;
}

// Get reviews for display in ReviewList
// - location is the dining hall to fetch reviews for
// - if location is blank, return all reviews
export const getReviews = async (location) => {
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    const ref = collection(db, 'reviews');

    let q;
    if (!location)
        q = query(ref, where('date', '>', td));
    else {
        q = query(ref, 
            where('date', '>', td),
            where('location', '==', location)
        );
    }
    const qSnap = await getDocs(q);
    const reviews = [];
    qSnap.forEach((doc) => {
        reviews.push(doc.data());
    });
    console.log(reviews);
    return reviews;
}

// Below: API helper functions

// validFood returns true if a food object 
// is valid, and false if it is not
const validFood = (food) => {
    if (
        !food ||
        !food.name ||
        !food.location ||
        !food.type
    ) {
        console.log('INVALID FOOD OBJECT')
        return false;
    }
    return true;
}

// validFood returns true if a review object 
// is valid, and false if it is not
const validReview = (review) => {
    if (
        !review ||
        !review.author ||
        !review.rating ||
        !review.date ||
        !review.food
    ) {
        console.log('INVALID REVIEW OBJECT')
        return false;
    }
    return true;
}
