import { Router } from 'express'

import * as favoritesController from '../controllers/favorites'

export const favoritesRouter = Router()

favoritesRouter.get('/', favoritesController.listFavorites)
favoritesRouter.get('/is-favorite', favoritesController.findFavorite)
favoritesRouter.post('/create', favoritesController.createFavorite)
favoritesRouter.delete('/delete', favoritesController.deleteFavorite)
