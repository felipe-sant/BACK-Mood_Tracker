import { Request, Response } from "express";
import { DatabaseService } from "../services/Database.service";
import getErrorMessage from "../utils/getMessageError";

class HistoricalController {
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const pageString = req.query.page
            if (!pageString) {
                res.status(400).json({ message: req.t("page_is_required") })
                return
            }
            const page = Number(pageString)
            if (isNaN(page)) {
                res.status(400).json({ message: req.t("page_not_is_number") })
                return
            }
            const limit = 10
            
            const response = await this.databaseService.getManyText(page, limit)

            res.status(200).json(response)
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }
}

export default HistoricalController