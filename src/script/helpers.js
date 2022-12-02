let history = [];
export default history;

export const sameDate = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export const average = (arr) => {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i].rating;
    }
    sum /= arr.length;
    return sum.toFixed(1);
}

export const docID = (str) => {
    let id = '';
    for (let i = 0; i < str.length; i++) {
        id += str[i].replace(/[^A-Z0-9]/ig, '-').replace(/-{2,}/g,"-");
        if (i !== str.length-1)
            id += '-'
    }
    return id;
}

export const hexID = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 32; i++ ) {
    	result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
	return result;
}

const date = new Date().toDateString().split(' ');
var dateFormat = date[2] + ' ' + date[1] + ' ' + date[3];
export const reviews = [
    {
        author: 'borborickzhu@g.ucla.edu',
        rating: 4,
        dateof: dateFormat,
        food: {
            name: 'Grilled Chicken',
            loc: 'B-Plate'
        },
        imageSrc: '../assets/images/pasta.jpeg'
    },
    {
        author: 'casparbroekhuizen@g.ucla.edu',
        rating: 3,
        dateof: dateFormat,
        food: {
            name: 'Grilled Pork',
            loc: 'De Neve'
        },
        imageSrc: '../assets/images/pasta.jpeg'
    },
    {
        author: 'michaelreed@g.ucla.edu',
        rating: 2,
        dateof: dateFormat,
        food: {
            name: 'Grilled Beef',
            loc: 'Epicuria'
        },
        imageSrc: '../assets/images/pasta.jpeg'
    },
    {
        author: 'akashbanerjee@g.ucla.edu',
        rating: 1,
        dateof: dateFormat,
        food: {
            name: 'Grilled Shrimp',
            loc: 'Rendezvous'
        },
        imageSrc: '../assets/images/pasta.jpeg'
    }
]

export const dininghalls = [
    {
        name: 'Epicuria'
    },
    {
        name: 'Bruin Plate'
    },
    {
        name: 'Rendezvous'
    },
    {
        name: 'De Neve'
    }
]