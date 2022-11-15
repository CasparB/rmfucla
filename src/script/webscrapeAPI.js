//imports.
import axios, * as others from 'axios';
const cheerio = require('cheerio');

//global data structures / variables. 


export const cafeteriaFood = async () => {
  //parsing in the HTML website. 
  //Every hall urls to parse from. 
  const API_KEY = '35L-american-aussies';
  const render = true;
const list = ['https://menu.dining.ucla.edu/Menus/DeNeve/Today','https://menu.dining.ucla.edu/Menus/BruinPlate/Today','https://menu.dining.ucla.edu/Menus/Epicuria/Today', 'https://menu.dining.ucla.edu/Menus/Rendezvous/Today', 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'];
  const halls_food = []
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
      return ( await test );
    }

    halls_food.push(logResponse());

  }
  return halls_food;
}

export const otherFoods = async () => {
  const API_KEY = '35L-american-aussies';
  const render = true;
  const list = ['http://menu.dining.ucla.edu/Menus/HedrickStudy','http://menu.dining.ucla.edu/Menus/EpicAtAckerman', 'http://menu.dining.ucla.edu/Menus/BruinCafe', 'http://menu.dining.ucla.edu/Menus/Drey', 'http://menu.dining.ucla.edu/Menus/DeNeveLateNight'];
  const hall_food = [];
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
      return ( await test );
    }

    hall_food.push(logResponse());

  }
  return hall_food;
}


export const get_times = async () => {
  function cast(str){
    str = str.split(' ');
    let v1 = str[0];
    let v2 = str[3];
    let vs = v1.split(':');
    let v2s = v2.split(':');
    let ans1 = parseInt(v1);
    let ans2 = parseInt(v2);
    if(vs.length != 1){
      ans1 += 0.5;
    }
    if(v2s.length != 1){
      ans2 += 0.5;
    }
    return [ans1, ans2];
  }
  const API_KEY = '35L-american-aussies';
  const render = true;
    const link = "http://menu.dining.ucla.edu/Hours";
    const test = axios(link, {params: {
      'url': link,
      'api_key': API_KEY,
      'render': render
    }})
      .then(response => {
        let done = 0;
        let hours = [];
        const html = response.data; 
        const $ = cheerio.load(html);
        let location;
        let breakfast;
        let lunch;
        let dinner;
        let extended_dinner;
        $('tr').each((io, elem) => {
        if(io<10 && io!=0){
          $(elem).find('td').each((i, el) => {
            if(i == 0){
              location = $(el).find('.hours-location').text()
            }else if(i == 1){
                let str = $(el).find('.hours-range').text();
                if(str == ''){
                  breakfast = [];
                }else{
                  const ans = cast(str);
                  breakfast = ans;
                }
            }else if(i == 2){
              let str = $(el).find('.hours-range').text();
                if(str == ''){
                  lunch = [];
                }else{
                  const ans = cast(str);
                  lunch = ans;
                }
              }else if(i == 3){
                let str = $(el).find('.hours-range').text();
                if(str == ''){
                  dinner = [];
                }else{
                  const ans = cast(str);
                  dinner = ans;
                }
              }else if(i == 4){
                let str = $(el).find('.hours-range').text();
                if(str == ''){
                  extended_dinner = [];
                }else{
                  const ans = cast(str);
                  extended_dinner = ans;
                }
            }
          });
          const obj = {
            location: location,
            breakfast: breakfast,
            lunch:  lunch,
            dinner: dinner,
            extended_dinner: extended_dinner,
          };
            hours.push(obj);

      }
        });
    
    return hours;

      }).catch(console.error);

    const logResponse = async () => {
      return( await test );
    }

    return logResponse();
}
