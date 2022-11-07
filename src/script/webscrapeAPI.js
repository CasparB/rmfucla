//imports.
const axios = require('axios');
const cheerio = require('cheerio');

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
    let halldata = [];
    const html = response.data; 
    const $ = cheerio.load(html)
    $('.col-header').each(function(i, elem) {
      halldata.push($(this).text());
    })

    return halldata;
  }).catch(console.error);

const logResponse = async () => {
  console.log( await test );
}