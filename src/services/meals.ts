import axios from 'axios'
import * as cheerio from 'cheerio'

const nestleUrl = 'https://www.recetasnestle.com.ve'

export async function searchRecipes(ingredients) {
  const url = nestleUrl + '/busca/resultado?q=' + ingredients

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const recipes = []
  $('.recipeCard').slice(0, 10).each((index, element) => {
    const name = $(element).find('.name').text().trim()
    const image = $(element).find('.recipeCard__image img').data('src')
    const anchor = $(element).find('a').attr('href')
    const info = []
    $(element).find('.infos').children().each((index, element) => {
      info.push($(element).text().trim().replace(/(\n|\t)/g, ''))
    })

    recipes.push({
      name,
      image,
      anchor,
      info
    })
  })

  return recipes
}

export async function scrapeRecipe(recipe) {
  const url = nestleUrl + recipe

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const ingredients = []
  $('.recipeDetail__ingredients li').each((index, element) => {
    ingredients.push($(element).text().trim())
  })

  const steps = []
  $('.recipeDetail__stepItem h2').each((index, element) => {
    const stepTitle = $(element).text().trim()
    if (stepTitle.includes('PASO')) {
      const stepText = $(element).siblings('ul').find('div').text().trim()
      steps.push(stepText)
    }
  })

  return {
    ingredients,
    steps
  }
}
