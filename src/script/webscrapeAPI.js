//imports.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//write headers
writeStream.write('Hall, Meals');

//urls to parse from. 
const uclamenusURLS = ['https://menu.dining.ucla.edu/Menus/Breakfast','https://menu.dining.ucla.edu/Menus/Lunch','https://menu.dining.ucla.edu/Menus/Dinner'];
const meals = ["Breakfast", "Lunch", "Dinner"];

//global data structures / variables. 
const API_KEY = '35L-american-aussies';
const render = true;
let menuItems = [];

//parsing in the HTML website. 
for(let index = 0; index < 3; index++){
  const test = axios(uclamenusURLS[index], {params: {
    'url': uclamenusURLS[index],
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
          tpye: meals[index]
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

}