import FrasesDatabase from "../types/database/FrasesDatabase.js"
import HistoricalResponse from "../types/HistorialResponse.js"
import PredictResponse from "../types/PredictResponse.js"
import { DatabaseService } from "./Database.service.js"

export class HistoricalService {
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    /**
     * Função para pegar o histórico dos textos.
     * @param {number} page Página dos dados.
     * @returns {HistoricalResponse} Retorna um objeto com a página, numero de linhas e dados.
     * @description Retorna o histórico de textos com base na página escolhida
     */
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

    /**
     * Função que salva um objeto frase no banco de dados
     * @param {string} text Texto a ser salvo no histórico.
     * @param {PredictResponse} predict Intenção a ser colocada na frase.
     * @description Salva um novo histórico de texto com predict imbutido.
     */
    async saveNewText(text: string, predict: PredictResponse): Promise<void> {
        await this.databaseService.saveText(text)
        
        const frase = await this.databaseService.findText(text) as FrasesDatabase | undefined
        if (!frase) throw new Error("'frase' not found")

        await this.databaseService.setPredict(frase._id, predict)
    }
}