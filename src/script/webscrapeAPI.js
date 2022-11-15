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
        let foods = [];
        const html = response.data; 
        const $ = cheerio.load(html)
        const locationInfo = $('#page-header').text();
        const info = locationInfo.split(',');
        const name = (info[0]).split('Menu');
        foods = [];
        $('.menu-block').each((i, elem) => {
          $(elem).find('.recipelink').each((i, el) => {
            const obj = {
              name: $(el).text(),
              location: name[0],
              type: $(elem).find('.col-header').text(),
            }
            foods.push(obj);
          });
        });
        
    return foods;

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
        let foods = [];
        const html = response.data; 
        const $ = cheerio.load(html)
        const info = list[index].split('/');
        const name = (info[info.length-1]);
        foods = [];
        $('.menu-block').each((i, elem) => {
          $(elem).find('.recipelink').each((i, el) => {
            let sections = $(elem).find('h2').text();
            if(sections.length === 0){
              sections = $(elem).find('h3').text();
            }
            const obj = {
              name: $(el).text(),
              location: name,
              type: sections,
            }
            foods.push(obj);
          });
        });
        
    return foods;

      }).catch(console.error);

    const logResponse = async () => {
      console.log( await test );
    }

    console.log(logResponse());

  }
}


//Drivers
cafeteriaFood(currentUclamenusURLS);
otherFoods(currentUclaOtherMenuURLS);