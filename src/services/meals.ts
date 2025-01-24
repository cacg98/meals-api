import axios from 'axios'
import * as cheerio from 'cheerio'

import { redisClient } from '../config/cache'
import { CustomError } from '../common/customError'

const nestleUrl = 'https://www.recetasnestle.com.ve'

export async function searchRecipes(ingredients: string[]) {
  const url = nestleUrl + '/busca/resultado?q=' + ingredients

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const recipes = []
  $('.cardRecipe').slice(0, 10).each((index, element) => {
    const name = $(element).find('.cardRecipe__title').text().trim()
    const image = $(element).find('.cardRecipe__image img').attr('src')
    const anchor = $(element).attr('href')
    const time = $(element).find('.infos-time span').text().trim()
    const difficulty = $(element).find('.infos-difficulty span').text().trim()
    const info = [time, difficulty]

    if (name && image && anchor) {
      recipes.push({
        name,
        image,
        anchor,
        info
      })
    }
  })

  return recipes
}

export async function scrapeRecipe(recipe: string) {

  if (!recipe.includes('/recetas/')) throw new CustomError('Bad request', 400)

  const cacheResult = await redisClient.get(recipe)
  if (cacheResult) {
    // console.log('cache hit!');
    return JSON.parse(cacheResult)
  }

  const url = nestleUrl + recipe

  const response = await axios.get(url)

  const $ = cheerio.load(response.data)

  const name = $('.recipe__texts h1').text().trim()
  const image = $('.recipe__image .image picture img').attr('src')

  const difficulty = $('.recipe__main .informations .difficulty .difficulty__text').text().trim()

  const serving = $('.recipe__main .ingredients .servings p').text().split(':')[1].trim()

  const time = $('.recipe__main .informations .time span').text().trim()

  const ingredients: string[] = []
  $('.recipe__main .ingredients ul li label span span').each((index, element) => {
    ingredients.push($(element).text().trim())
  })

  let steps: string[] = []
  $('.cookSteps__item h2').each((index, element) => {
    const stepTitle = $(element).text().trim()
    if (stepTitle.includes('PASO')) {
      const stepText = $(element).siblings('ul').find('span').text().trim()
      steps.push(stepText)
    }
  })
  if (!steps.length) {
    $('.cookSteps__item span').each((index, element) => {
      steps.push($(element).text().trim())
    })
  }
  steps = steps.map(step => {
    if (step.slice(0, 2) == step.slice(4, 6)) {
      return step.slice(4)
    }
    return step
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
    EX: 300,
    NX: true,
  })

  return result
}
