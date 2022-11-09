//imports.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//write headers
writeStream.write('Hall, Meals');

//urls to parse from. 
const uclamenusURLS = ['https://menu.dining.ucla.edu/Menus/DeNeve/Today','https://menu.dining.ucla.edu/Menus/BruinPlate/Today','https://menu.dining.ucla.edu/Menus/Epicuria/Today'];


//global data structures / variables. 
const API_KEY = '35L-american-aussies';
const render = true;
let menuItems = [];

//parsing in the HTML website. 
for(let index = 0; index < uclamenusURLS.length; index++){
  const test = axios(uclamenusURLS[index], {params: {
    'url': uclamenusURLS[index],
    'api_key': API_KEY,
    'render': render
  }})
    .then(response => {
      let totalInfo = [];
      let data = {};
      let foods = [];
      const html = response.data; 
      const $ = cheerio.load(html)
      const locationInfo = $('#page-header').text();
      const info = locationInfo.split(',');
      const name = (info[0]).split('Menu');
      $('.menu-block').each((i, elem) => {
        foods = [];
        const hallfood = $(elem).find('.recipelink').each((i, el) => {
          foods.push( $(el).text());
        });
        data = {
          diningHallLocation: name[0],
          date: info[1]+info[2],
          mealPeriod: $(elem).find('.col-header').text(),
          foodOptions: foods,
        };
        totalInfo.push(data);
      });
      
  return totalInfo;

    }).catch(console.error);

  const logResponse = async () => {
    console.log( await test );
  }

  console.log(logResponse());

}