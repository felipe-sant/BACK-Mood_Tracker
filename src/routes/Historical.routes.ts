import { Router } from "express";
import HistoricalController from "../controllers/Historical.controller.js";

const router = Router()
const historicalController = new HistoricalController()

router.get(
    '/historical',
    historicalController.get.bind(historicalController)
)

export default router