//imports.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

//write headers
writeStream.write('Hall, Meals');

//Every hall urls to parse from. 
const currentUclamenusURLS = ['https://menu.dining.ucla.edu/Menus/DeNeve/Today','https://menu.dining.ucla.edu/Menus/BruinPlate/Today','https://menu.dining.ucla.edu/Menus/Epicuria/Today', 'https://menu.dining.ucla.edu/Menus/Rendezvous/Today', 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'];
const currentUclaOtherMenuURLS = ['http://menu.dining.ucla.edu/Menus/HedrickStudy','http://menu.dining.ucla.edu/Menus/EpicAtAckerman', 'http://menu.dining.ucla.edu/Menus/BruinCafe', 'http://menu.dining.ucla.edu/Menus/Drey', 'http://menu.dining.ucla.edu/Menus/DeNeveLateNight'];

//urls to parse from that change daily (gets tomorrow's food)
const tomorrowUclamenusURLS = ['https://menu.dining.ucla.edu/Menus/DeNeve/Tomorrow','https://menu.dining.ucla.edu/Menus/BruinPlate/Tomorrow','https://menu.dining.ucla.edu/Menus/Epicuria/Tomorrow', 'https://menu.dining.ucla.edu/Menus/Rendezvous/Tomorrow', 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Tomorrow'];


//global data structures / variables. 
const API_KEY = '35L-american-aussies';
const render = true;

function cafeteriaFood(list){
  //parsing in the HTML website. 
  for(let index = 0; index < list.length; index++){
    const test = axios(list[index], {params: {
      'url': list[index],
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
          $(elem).find('.recipelink').each((i, el) => {
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

}

function otherFoods(list){
  for(let index = 0; index < list.length; index++){
    const test = axios(list[index], {params: {
      'url': list[index],
      'api_key': API_KEY,
      'render': render
    }})
      .then(response => {
        let totalInfo = [];
        let data = {};
        let foods = [];
        const html = response.data; 
        const $ = cheerio.load(html)
        const info = list[index].split('/');
        const name = (info[info.length-1]);
        $('.menu-block').each((i, elem) => {
          foods = [];
          $(elem).find('.recipelink').each((i, el) => {
            foods.push( $(el).text());
          });
          let sections = $(elem).find('h2').text();
          if(sections.length === 0){
            sections = $(elem).find('h3').text();
          }
          data = {
            diningHallLocation: name,
            foodSections: sections,
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
}


//Drivers
cafeteriaFood(currentUclamenusURLS);
cafeteriaFood(tomorrowUclamenusURLS);
otherFoods(currentUclaOtherMenuURLS);