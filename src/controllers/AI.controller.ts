import { Request, Response } from 'express'
import getErrorMessage from '../utils/getMessageError'
import { AIService } from '../services/AI.service'

class AIController {
    private aiService: AIService

    constructor() {
        this.aiService = new AIService()
    }

    /**
     * `GET | http://0.0.0.0:0000/api/ai/predict`
     * @param req Possui parametros de Query (text)
     * @returns Retorna qual humor mais provavel do texto
     * @description Rota de predict de humor com base de IA
     */
    async predict(req: Request, res: Response): Promise<void> {
        try {
            const text = req.query.text as string
            if (!text) {
                res.status(400).json({ message: req.t("text_is_required") })
                return
            }
            if (typeof text !== "string") {
                res.status(400).json({ message: req.t("text_not_is_string") })
                return
            }

            const result = await this.aiService.predict(text)
            res.status(200).json(result)
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }

    /**
     * `GET | http://0.0.0.0:0000/api/ai`
     * @description Teste de funcionamento da rota.
     */
    async __test__(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({
                message: req.t("successful_route_connection")
            })
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }
}

export default AIController