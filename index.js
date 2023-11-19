const axios = require('axios');
const cheerio = require('cheerio');

async function searchRecipes(url) {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const recipes = [];
    $('.recipeCard').slice(0, 10).each((index, element) => {
      const name = $(element).find('.name').text().trim();
      const image = $(element).find('.recipeCard__image img').data('src');
      const anchor = $(element).find('a').attr('href');
      const info = [];
      $(element).find('.infos').children().each((index, element) => {
        info.push($(element).text().trim().replace(/(\n|\t)/g, ''));
      });

      recipes.push({
        name,
        image,
        anchor,
        info,
      });
    });

    return {
      recipes,        
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return error;
  }
}

async function scrapeRecipe(url) {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const ingredients = [];
    $('.recipeDetail__ingredients li').each((index, element) => {
      ingredients.push($(element).text().trim());
    });

    const steps = [];
    $('.recipeDetail__stepItem div').each((index, element) => {
      steps.push($(element).text().trim());
    });

    return {
      ingredients,
      steps,
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return error;
  }
}

const searchRecipesUrl = 'https://www.recetasnestle.com.ve/busca/resultado?q=berenjena%20carne';
searchRecipes(searchRecipesUrl).then((data) => {
  console.log(data.recipes);
});

// const recipeUrl = 'https://www.recetasnestle.com.ve/recetas/carne-molida';
// scrapeRecipe(recipeUrl).then((data) => {
// //   console.log(data.title);
// //   console.log(data.imageUrl);
//   console.log(data.ingredients);
//   console.log(data.steps);
// });
