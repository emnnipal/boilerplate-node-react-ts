import { Router } from 'express'
import WebController from '../controller'

export const web: Router = Router()
const controller = new WebController()

web.get('*', controller.get)
