import PredictResponse from "../types/PredictResponse.js"
import { HistoricalService } from "./Historical.service.js"

export class AIService {
    private static clientPromise: Promise<import("@gradio/client").Client> | null = null;
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
    async predict(text: string, save: boolean = true): Promise<PredictResponse> {
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
            intention_number: score
        }

        if (save) this.historicalService.saveNewText(text, predict)
        
        return predict
    }
}