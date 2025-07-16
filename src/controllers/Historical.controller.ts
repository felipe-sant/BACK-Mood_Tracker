import { Request, Response } from "express";
import getErrorMessage from "../utils/getMessageError";
import { HistoricalService } from "../services/Historical.service";

class HistoricalController {
    private historicalService: HistoricalService

    constructor() {
        this.historicalService = new HistoricalService()
    }

    /**
     * `GET | http://0.0.0.0:0000/api/historical`
     * @param req Possui parametros de Query (page)
     * @returns Retorna o histórico de frases.
     * @description Rota para pegar o histórico de frases, utilizando páginas que por padrão tem 10 elementos.
     */
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
            
            const response = await this.historicalService.getHistorical(page)

            res.status(200).json(response)
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error)
            res.status(500).json({ message: errorMessage })
        }
    }
}

export default HistoricalController