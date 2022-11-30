import { db } from './firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  arrayUnion,
  orderBy,
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

    let types = [];
    for (var i = 0; i < food.type.length; i++)
        types.push(food.type[i]);
    const id = docID( [food.name, food.location].concat(types) );
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
export const addReview = async (review) => {
    if (!validReview(review) || !validFood(review.food))
        return false;
    let types = [];
    for (var i = 0; i < review.food.type.length; i++)
        types.push(review.food.type[i]);
    const fid = docID( [review.food.name, review.food.location].concat(types) );
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
        foodid: fid,
        likes: []
    }
    const rid = hexID();
    const reviewRef = doc(db, 'reviews', rid)
    await setDoc(reviewRef, newReview);

    return true;
}

// Get reviews for display in ReviewList
// - accepts options object
//      - options.location is the dining hall to fetch reviews for (fetch from all locations if blank)
//      - options.author is the author to fetch reviews from (fetch from all authors if blank)
//      - options.from is the date to fetch reviews from (fetch today's reviews if blank)
export const getReviews = async (options) => {
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    const ref = collection(db, 'reviews');

    let q;
    if (!options)
        q = query(ref, orderBy('date'), where('date', '>', td));
    else {
        const constraints = [];
        if (options.location)
            constraints.push( where('location', '==', options.location) );
        if (options.author)
            constraints.push( where('author', '==', options.author) );
        if (options.from && isValidDate(options.from))
            constraints.push( where('date', '>', options.from) );
        
        else 
            constraints.push( where('date', '>', td) );

        q = query(ref, orderBy('date', 'desc'), ...constraints);
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
    return foods;
}

// Check whether the menus have been synced with
// our database today. Return true if the current
// user should perform a menu sync, false if not
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

// Update the config db, setting last sync to today
export const didMenuSync = async () => {
    const td = new Date();
    td.setHours(0, 0, 0, 0);
    const ref = doc(db, 'config', 'sync-dates');
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) {
        console.log('DATABASE ERROR: NO sync-dates DOC');
        return false;
    }
    const data = docSnap.data();
    await updateDoc(ref, { dates: arrayUnion(td) });
}

// Gets short form reviews (just the reviewer and date)
// stored in 'foods' db
export const getShortFormReviews = async (food) => {
    if (!validFood(food))
        return false;
    let types = [];
    for (var i = 0; i < food.type.length; i++)
        types.push(food.type[i]);
    const id = docID( [food.name, food.location].concat(types) );
    const ref = doc(db, 'foods', id);
    const docSnap = await getDoc(ref);
    if (!docSnap.exists()) {
        console.log('FOOD DOES NOT EXIST');
        return false;
    }
    const data = docSnap.data();
    if (!data.reviews)
        return [];
    return data.reviews;
}

// Add/remove like for a given review
export const performLikeAction = async (user, review) => {
    if (!validReview(review) || !user)
        return false;
    let types = [];
    for (var i = 0; i < review.food.type.length; i++)
        types.push(review.food.type[i]);
    const fid = docID( [review.food.name, review.food.location].concat(types) );
    const ref = collection(db, 'reviews');
    const q = query(ref,
        where('author', '==', review.author), 
        where('foodid', '==', fid));

    const qSnap = await getDocs(q);
    if (qSnap.empty) {
        console.log('REVIEW DOES NOT EXIST');
        return false;
    }
    qSnap.forEach((doc) => {
        const data = doc.data();
        let likes = [];
        if (data.likes && data.likes.includes(user)) {
            const index = data.likes.indexOf(user);
            likes = data.likes;
            likes.splice(index, 1);
        } else
            likes = data.likes.concat( [ user ] );
        updateDoc(doc.ref, { likes: likes });
    });
    return true;
}

// Gets likes for a given review
export const getLikes = async (review) => {
    if (!validReview(review))
        return false;
    let types = [];
    for (var i = 0; i < review.food.type.length; i++)
        types.push(review.food.type[i]);
    const fid = docID( [review.food.name, review.food.location].concat(types) );
    const ref = collection(db, 'reviews');
    const q = query(ref,
        where('author', '==', review.author), 
        where('foodid', '==', fid));
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
        console.log('REVIEW DOES NOT EXIST');
        return false;
    }
    let data;
    qSnap.forEach((doc) => {
        data = doc.data();
    });
    return data.likes;
}

// validFood returns true if a food object 
// is valid, and false if it is not
export const validFood = (food) => {
    if (
        !food ||
        !food.name ||
        !food.location ||
        !food.type ||
        !(food.type.length)
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
        !review.food ||
        !validFood(review.food)
    ) {
        console.log('INVALID REVIEW OBJECT')
        return false;
    }
    return true;
}

const isValidDate = (d) => {
    return d instanceof Date && !isNaN(d);
}
