import { DatabaseService } from "../src/services/Database.service.js"
import FrasesDatabase from "../src/types/database/FrasesDatabase.js"
import GetManyTextResponse from "../src/types/GetManyTextResponse.js"
import PredictResponse from "../src/types/PredictResponse.js"

describe("Testando serviços de Database", () => {
    const databaseService = new DatabaseService()

    it("saveText, findText", async () => {
        const text = "texto de teste para salvamento"
        await databaseService.saveText(text)
        const res = await databaseService.findText(text) as FrasesDatabase | undefined
        expect(res?.text).toBe(text)
    })

    it("getManyText", async () => {
        const limit = 10
        const res = await databaseService.getManyText(limit) as GetManyTextResponse
        expect(res.rowsCount).toBeLessThanOrEqual(limit)
    })

    it("setPredict", async () => {
        const _id = 1
        const text = "texto de teste para salvamento"
        const predict: PredictResponse = {
            intention: "neutral",
            intention_number: 0
        }
        await databaseService.setPredict(_id, predict)
        const res = await databaseService.findText(text, _id) as FrasesDatabase | undefined
        expect(res?.intention).toBe(predict.intention)
        expect(res?.intention_number).toBe(predict.intention_number)
    })
})