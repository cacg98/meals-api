import axios from 'axios'
import * as cheerio from 'cheerio'

import { redisClient } from '../config/cache'

const nestleUrl = 'https://www.recetasnestle.com.ve'

export async function searchRecipes(ingredients) {
  const url = nestleUrl + '/busca/resultado?q=' + ingredients

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const recipes = []
  $('.recipeCard').slice(0, 10).each((index, element) => {
    const name = $(element).find('.name').text().trim()
    const image = $(element).find('.recipeCard__image img').data('src')
    const anchor = $(element).find('a').attr('href').replace('/recetas/', '')
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

  const cacheResult = await redisClient.get(recipe)
  if (cacheResult) {
    // console.log('cache hit!');
    return JSON.parse(cacheResult)
  }

  const url = nestleUrl + '/recetas/' + recipe

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const name = $('.recipeDetail__intro h1').text().trim()
  const image = $('.recipeDetail__image .image picture img').attr('src')

  const difficulty = $('.recipeDetail__infoItem.recipeDetail__infoItem--difficulty')
    .contents()
    .filter(function () {
      return this.nodeType === 3
    }).text().trim()

  const serving = $('.recipeDetail__infoItem.recipeDetail__infoItem--serving span')
    .text().trim()

  const timeElements = $('.recipeDetail__infoItem.recipeDetail__infoItem--time')

  let time: cheerio.Cheerio | string = ''
  if (timeElements.length > 1) {
    time = timeElements.eq(1)
  } else if (timeElements.length === 1) {
    time = timeElements
  }

  if (typeof time !== 'string') {
    time = time
      .contents()
      .filter(function () {
        return this.nodeType === 3
      })
      .text()
      .trim()
      .replace(/(\n|\t)/g, '')
  }

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

  const result = {
    name,
    image,
    difficulty,
    serving,
    time,
    ingredients,
    steps
  }

  // console.log('cache miss!');
  await redisClient.set(recipe, JSON.stringify(result), {
    EX: 60,
    NX: true,
  })

  return result
}
