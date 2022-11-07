//imports.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//write headers
writeStream.write('Hall, Meals');

//urls to parse from. 
const uclamenuURL = 'https://menu.dining.ucla.edu/Menus';

//global data structures / variables. 
const API_KEY = '35L-american-aussies';
const render = true;
let menuItems = [];

//parsing in the HTML website. 
const test = axios(uclamenuURL, {params: {
  'url': uclamenuURL,
  'api_key': API_KEY,
  'render': render
}})
  .then(response => {
    let foods = [];
    const html = response.data; 
    const $ = cheerio.load(html)
    $('.menu-block').each((i, elem) => {
    const hall = $(elem).text();  
    const hallfood = $(elem).find('.recipelink').each((i, el) => {
      let hallfood = {
        name: $(el).text(),
        location: $(elem).find('.col-header').text(),
        type: 
      }

      foods.push(hallfood)
    });
    });
    
return foods;

  }).catch(console.error);

const logResponse = async () => {
  console.log( await test );
}

console.log(logResponse());