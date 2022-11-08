export const sameDate = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    )
}

export const foodID = (str) => {
    let docID = '';
    for (let i = 0; i < str.length; i++) {
        docID += str[i].replace(/[^A-Z0-9]/ig, '-');
        if (i !== str.length-1)
            docID += '-'
    }
    return docID;
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

export const reviews = [
    {
        location: 'Epicuria',
        body: 'Post 1 blah blah'
    },
    {
        location: 'De Neve',
        body: 'Post 2 blah blah'
    },
    {
        location: 'Bruin Plate',
        body: 'Post 3 blah blah'
    },
    {
        location: 'Rendezvous',
        body: 'Post 4 blah blah'
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