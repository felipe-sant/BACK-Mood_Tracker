import { Router } from 'express'
import AIController from '../controllers/AI.controller.js'

const router = Router()
const aiController = new AIController()

router.get(
    '/ai/predict',
    aiController.predict.bind(aiController)
)

router.get(
    '/ai',
    aiController.__test__.bind(aiController)
)

export default router