import { Router } from 'express'

import * as mealsController from '../controllers/meals'

export const mealsRouter = Router()

mealsRouter.get('/', mealsController.getByIngredients)
mealsRouter.get('/recipe', mealsController.getRecipe)
