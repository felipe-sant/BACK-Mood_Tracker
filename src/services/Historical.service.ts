import FrasesDatabase from "../types/database/FrasesDatabase"
import HistoricalResponse from "../types/HistorialResponse"
import PredictResponse from "../types/PredictResponse"
import { DatabaseService } from "./Database.service"

export class HistoricalService {
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    async getHistorical(page: number): Promise<HistoricalResponse> {
        const limit = 10
        const offSet = (page * limit) - limit
        const res = await this.databaseService.getManyText(limit, offSet)
        return {
            page: page,
            rowsCount: res.rowsCount,
            data: res.data
        }
    }

    async saveNewText(text: string, predict: PredictResponse): Promise<void> {
        await this.databaseService.saveText(text)
        
        const frase = await this.databaseService.findText(text) as FrasesDatabase | undefined
        if (!frase) throw new Error("'frase' not found")

        await this.databaseService.setPredict(frase._id, predict)
    }
}