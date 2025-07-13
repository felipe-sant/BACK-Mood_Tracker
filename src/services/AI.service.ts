import { Client } from "@gradio/client"
import ResponsePredict from "../types/ResponsePredict"
import { DatabaseService } from "./Database.service"
import DatabaseFrases from "../types/DatabaseFrases"
import { Request } from "express"

/* 
    Problemas com @radio/client em conjunto com o Jest
    Testes unitarios não disponiveis. 
*/
export class AIService {
    private static project_url: string = "felipe-sant/mood-tracker"
    private databaseService: DatabaseService

    constructor() {
        this.databaseService = new DatabaseService()
    }

    /**
     * Função de conexão com a IA utilizando o `@gradio/client`
     * @param {string} text - Texto a ser identificado.
     * @returns {PredictResponse} Retorna o humor da frase
     * @description Identifica o humor do texto enviado para a função.
     */
    async predict(text: string): Promise<ResponsePredict> {
        const client = await Client.connect(AIService.project_url)
        const res = (await client.predict("/predict", {
            texto: text
        })).data as Array<string>

        this.databaseService.saveText(text)
        
        const predictText = res[0] as "positive" | "neutral" | "negative"

        let score: -1 | 0 | 1 = 0
        if (predictText === "positive") {
            score = 1
        } else if (predictText === "negative") {
            score = -1
        }

        const predict: ResponsePredict = {
            intention: predictText,
            intentionNumber: score
        }

        const frase = await this.databaseService.findText(text) as DatabaseFrases | undefined
        if (!frase) throw new Error("'frase' not found")
        this.databaseService.setPredict(frase._id, predict)
        
        return predict
    }
}