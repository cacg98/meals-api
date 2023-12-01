import { tryCatchFn } from '../common/utils'
import * as mealsService from '../services/meals'

export const getAll = tryCatchFn( async (req, res, next) => {
    const searchRecipesUrl = 'https://www.recetasnestle.com.ve/busca/resultado?q=berenjena%20carne'
    const recipes = await mealsService.searchRecipes(searchRecipesUrl)
    res.send(recipes)
})
