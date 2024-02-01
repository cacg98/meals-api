import { Request, Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import * as mealsService from '../services/meals'

export const getByIngredients = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    const { ingredients } = req.query
    const recipes = await mealsService.searchRecipes(ingredients as string[])
    res.send(recipes)
})

export const getRecipe = tryCatchFn( async (req: Request, res: Response, next: NextFunction) => {
    const { anchor } = req.query
    const recipe = await mealsService.scrapeRecipe(anchor as string)
    res.send(recipe)
})
