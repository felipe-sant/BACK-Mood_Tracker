import { AIService } from "../src/services/AI.service"

describe("Testando serviços de IA", () => {
    const aiService = new AIService()

    it("predict", async () => {
        const res = await aiService.predict("O serviço foi muito bom", false)
        expect(res.intention).toBe("positive")
    })
})