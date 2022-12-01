//imports.
import axios, * as others from 'axios';
const cheerio = require('cheerio');

//global data structures / variables. 

const condenseData = (arr) => {
  const sorted = arr.sort(function(x, y) {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  });
  let condensed = [];
  let currentName = '';
  for (var i = 0; i < sorted.length; i++) {
    if (currentName != sorted[i].name) {
      const newFood = {
        ...sorted[i],
        type: [sorted[i].type]
      }
      condensed.push(newFood);
      currentName = sorted[i].name;
    }
    else {
      if (!condensed[condensed.length-1].type.includes(sorted[i].type))
        condensed[condensed.length-1].type = condensed[condensed.length-1].type.concat(sorted[i].type);
    }
  }
  return condensed;
};

export const cafeteriaFood = async () => {
  //parsing in the HTML website. 
  //Every hall urls to parse from. 
  const API_KEY = '35L-american-aussies';
  const render = true;
  const list = ['https://menu.dining.ucla.edu/Menus/DeNeve/Today','https://menu.dining.ucla.edu/Menus/BruinPlate/Today','https://menu.dining.ucla.edu/Menus/Epicuria/Today', 'https://menu.dining.ucla.edu/Menus/Rendezvous/Today', 'https://menu.dining.ucla.edu/Menus/FeastAtRieber/Today'];
  let halls_food = [];
  for(let index = 0; index < list.length; index++){
    const test = await axios(list[index], {params: {
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
            let food_string = $(el).text();
            const words = food_string.split(" ");
            let final_string = "";
            for(let i = 0; i < words.length; i++){
              let curr_word = (words[i]).toLowerCase();
              let char = (curr_word.charAt(0)).toUpperCase();
              for(let ind = 1; ind < curr_word.length; ind++){
                char = char.concat(curr_word.charAt(ind));
              }
              final_string = final_string.concat(char);
              final_string = final_string.concat(" ");
            }
            console.log(final_string);
            const obj = {
              name: final_string,
              location: name[0].slice(0, -1),
              type: $(elem).find('.col-header').text(),
              category: '',
            }
            foods.push(obj);
          });
        });
        
    return foods;

      }).catch(console.error);
    halls_food = halls_food.concat(test);
  }
  return condenseData(halls_food);
}

export const otherFoods = async () => {
  const API_KEY = '35L-american-aussies';
  const render = true;
  const list = ['http://menu.dining.ucla.edu/Menus/HedrickStudy','http://menu.dining.ucla.edu/Menus/EpicAtAckerman', 'http://menu.dining.ucla.edu/Menus/BruinCafe', 'http://menu.dining.ucla.edu/Menus/Drey', 'http://menu.dining.ucla.edu/Menus/DeNeveLateNight'];
  const places_index = ['Hedrick Study', "Epic at Ackerman", "Bruin Cafe", "The Drey", "De Neve Late Night"];
  let halls_food = [];
  for(let index = 0; index < list.length; index++){
    const test = await axios(list[index], {params: {
      'url': list[index],
      'api_key': API_KEY,
      'render': render
    }})
      .then(response => {
        let foods = [];
        const html = response.data; 
        const $ = cheerio.load(html)
        const info = list[index].split('/');
        const name = places_index[index];
        foods = [];
        if(index == 0){
            $('.swiper-slide').each((i,e) => {
              let type_period = $(e).find('h1').text();
              if(type_period == "Café Bakery"){
                const opt = ['Breakfast', 'Lunch', 'Dinner', 'Extended Dinner'];
                for(let i = 0; i < 4; i++){
                  const o = opt[i];
                
                    $('.menu-block').each((i, elem) => {
                  $(elem).find('.recipelink').each((i, el) => {
                    let sections = $(elem).find('h2').text();
                    if(sections.length === 0){
                      sections = $(elem).find('h3').text();
                    }
                    const obj = {
                      name: $(el).text(),
                      location: name,
                      type: o,
                      category: sections,
                    }
                    foods.push(obj);
                  });
                });
          }
            }else if(type_period == "Lunch & Dinner"){
              const opt = ['Lunch', 'Dinner', 'Extended Dinner'];
              for(let i = 0; i < 3; i++){
                const o = opt[i];
              
                  $('.menu-block').each((i, elem) => {
                $(elem).find('.recipelink').each((i, el) => {
                  let sections = $(elem).find('h2').text();
                  if(sections.length === 0){
                    sections = $(elem).find('h3').text();
                  }
                  const obj = {
                    name: $(el).text(),
                    location: name,
                    type: o,
                    category: sections,
                  }
                  foods.push(obj);
                });
              });
        }
      }else if(type_period == "Beverages"){

              }else if(type_period == "Market"){
                const opt = ['Breakfast', 'Lunch', 'Dinner', 'Extended Dinner'];
                for(let i = 0; i < 4; i++){
                  const o = opt[i];
                
                    $('.menu-block').each((i, elem) => {
                  $(elem).find('.recipelink').each((i, el) => {
                    let sections = $(elem).find('h2').text();
                    if(sections.length === 0){
                      sections = $(elem).find('h3').text();
                    }
                    const obj = {
                      name: $(el).text(),
                      location: name,
                      type: o,
                      category: sections,
                    }
                    foods.push(obj);
                  });
                });
          }
              }else{
                  $('.menu-block').each((i, elem) => {
                  $(elem).find('.recipelink').each((i, el) => {
                    let sections = $(elem).find('h2').text();
                    if(sections.length === 0){
                      sections = $(elem).find('h3').text();
                    }
                    const obj = {
                      name: $(el).text(),
                      location: name,
                      type: type_period,
                      category: sections,
                    }
                    foods.push(obj);
                  });
                });
              }
            });
      }else if(index != 4){
        let type_dine = ['Lunch', 'Dinner'];
        for(let i = 0; i < 2; i++){
              const cur_type = type_dine[i]
              $('.menu-block').each((i, elem) => {
                $(elem).find('.recipelink').each((i, el) => {
                  let sections = $(elem).find('h2').text();
                  if(sections.length === 0){
                    sections = $(elem).find('h3').text();
                  }
                  const obj = {
                    name: $(el).text(),
                    location: name,
                    type: cur_type,
                    category: sections,
                  }
                  foods.push(obj);
                });
              });
        }
  }else{
    $('.menu-block').each((i, elem) => {
      $(elem).find('.recipelink').each((i, el) => {
        let sections = $(elem).find('h2').text();
        if(sections.length === 0){
          sections = $(elem).find('h3').text();
        }
        const obj = {
          name: $(el).text(),
          location: name.split(' ').slice(0, 2).join(' '),
          type: 'Extended Dinner',
          category: sections,
        }
        foods.push(obj);
      });
    });
  }
    return foods;

      }).catch(console.error);

    halls_food = halls_food.concat(test);
  }
  return condenseData(halls_food);
}


export const getTimes = async () => {
  function cast(str){
    str = str.split(' ');
    let v1 = str[0];
    let v2 = str[3];
    let vs = v1.split(':');
    let v2s = v2.split(':');
    let ans1 = parseInt(v1);
    let ans2 = parseInt(v2);
    if(vs.length !== 1){
      ans1 += 0.5;
    }
    if(v2s.length !== 1){
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
        if(io<10 && io!==0){
          $(elem).find('td').each((i, el) => {
            if(i === 0){
              location = $(el).find('.hours-location').text()
            }else if(i === 1){
                let str = $(el).find('.hours-range').text();
                if(str === ''){
                  breakfast = [];
                }else{
                  const ans = cast(str);
                  breakfast = ans;
                }
            }else if(i === 2){
              let str = $(el).find('.hours-range').text();
                if(str === ''){
                  lunch = [];
                }else{
                  const ans = cast(str);
                  lunch = ans;
                }
              }else if(i === 3){
                let str = $(el).find('.hours-range').text();
                if(str === ''){
                  dinner = [];
                }else{
                  const ans = cast(str);
                  dinner = ans;
                }
              }else if(i === 4){
                let str = $(el).find('.hours-range').text();
                if(str === ''){
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
