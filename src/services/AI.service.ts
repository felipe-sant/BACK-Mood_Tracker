import PredictResponse from "../types/PredictResponse"
import { DatabaseService } from "./Database.service"
import { HistoricalService } from "./Historical.service"

/* 
    Problemas com @radio/client em conjunto com o Jest
    Testes unitarios não disponiveis. 
*/
export class AIService {
    private static clientPromise: ReturnType<typeof import("@gradio/client").Client.connect> | null = null;
    private static project_url: string = "felipe-sant/mood-tracker"

    private historicalService: HistoricalService

    constructor() {
        this.historicalService = new HistoricalService()
    }

    /**
     * Função de conexão com a IA utilizando o `@gradio/client`.
     * @param {string} text - Texto a ser identificado.
     * @returns {PredictResponse} Retorna o humor da frase.
     * @description Identifica o humor do texto enviado para a função.
     */
    async predict(text: string): Promise<PredictResponse> {
        if (!AIService.clientPromise) {
            const { Client } = await import("@gradio/client");
            AIService.clientPromise = Client.connect(AIService.project_url);
        }

        const client = await AIService.clientPromise

        const res = (await client.predict("/predict", {
            texto: text
        })).data as Array<string>

        const predictText = res[0] as "positive" | "neutral" | "negative"

        let score: -1 | 0 | 1 = 0
        if (predictText === "positive") {
            score = 1
        } else if (predictText === "negative") {
            score = -1
        }

        const predict: PredictResponse = {
            intention: predictText,
            intentionNumber: score
        }

        this.historicalService.saveNewText(text, predict)
        
        return predict
    }
}