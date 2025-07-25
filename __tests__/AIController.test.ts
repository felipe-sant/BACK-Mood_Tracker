import request from 'supertest'
import app from '../src/app.js'

describe("Testando rotas http://0.0.0.0:0000/api/ai", () => {
    it("GET '/'", async () => {
        const res = await request(app).get("/api/ai")
        expect(res.status).toBe(200)
    })

    it("GET '/predict'", async () => {
        const res = await request(app).get("/api/ai/predict?save=false&text=teste")
        expect(res.status).toBe(200)
    }, 10000)
})