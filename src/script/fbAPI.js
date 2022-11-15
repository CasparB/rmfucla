import { db } from './firebase';
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
    docID,
    hexID
} from './helpers';

// Add food to item to Foods database
// - if item exists, see if date is new
// - if date is not new, return false 
export const addFood = async (food) => {
    if (!validFood(food))
        return false;

    const id = docID( [food.name, food.location, food.type] );
    const ref = doc(db, 'foods', id);
    const docSnap = await getDoc(ref);

    var data;
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    if (docSnap.exists()) {
        data = docSnap.data();
        const mostRecentUploadDate = data.dates[data.dates.length-1].toDate();
        if (sameDate(mostRecentUploadDate, td)) {
            console.log('FOOD ALREADY UPLOADED TODAY');
            return false;
        }
        const dates = data.dates.concat( [ td ] )
        await updateDoc(ref, { dates: dates });
    } else {
        const newFood = {
            ...food,
            reviews: [],
            dates: [ td ]
        }
        await setDoc(ref, newFood);
    }
    return true;
}

// Add review to food in the Reviews database
// - if food does not exist, return false
// - if user review already exist today, return false
// Add short form review to the Foods database

// BUG: Short form reviews can be added multiple times
export const addReview = async (review) => {
    if (!validReview(review) || !validFood(review.food))
        return false;
    
    const fid = docID( [review.food.name, review.food.location, review.food.type] );
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

    const data = foodDocSnap.data();
    const reviews = data.reviews.concat( [
        {
            date: review.date,
            rating: review.rating
        }
    ] );
    await updateDoc(foodRef, { reviews: reviews });

    const newReview = {
        ...review,
        foodid: fid
    }
    const rid = hexID();
    const reviewRef = doc(db, 'reviews', rid)
    await setDoc(reviewRef, newReview);

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
    return reviews;
}

// Get foods for display in DiningHallPage
// - location is the dining hall to fetch foods for
// - if location is blank, return all foods
export const getFoods = async (location) => {
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    const ref = collection(db, 'foods');

    let q;
    if (!location)
        q = query(ref, where('dates', 'array-contains', td));
    else {
        q = query(ref, 
            where('dates', 'array-contains', td),
            where('location', '==', location)
        );
    }
    const qSnap = await getDocs(q);
    const foods = [];
    qSnap.forEach((doc) => {
        foods.push(doc.data());
    });
    console.log(foods);
    return foods;
}

export const doMenuSync = async () => {
    const ref = doc(db, 'config', 'sync-dates');
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) {
        console.log('DATABASE ERROR: NO sync-dates DOC');
        return false;
    }
    const data = docSnap.data();
    const latest = data.dates[data.dates.length-1].toDate();
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    return latest < td;
}

// validFood returns true if a food object 
// is valid, and false if it is not
export const validFood = (food) => {
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
export const validReview = (review) => {
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
