import { AIService } from "../src/services/AI.service.js"

describe("Testando serviços de AI", () => {
    const aiService = new AIService()

    it("predict", async () => {
        const res = await aiService.predict("O serviço foi muito bom", false)
        expect(res.intention).toBe("positive")
    }, 10000)
})