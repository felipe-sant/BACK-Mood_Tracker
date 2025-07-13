import express from 'express'
import cors from 'cors'
import path from 'path'
import i18next from "./configs/i18n.config"
import i18nextMiddleware from "i18next-http-middleware"
import requestLogger from './middlewares/requestLogger.middleware'
import iaRoutes from "./routes/AI.routes"
import client from './db'

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(i18nextMiddleware.handle(i18next))

app.get('/', (_, res) => { res.redirect('/docs/routes.html')})
// app.get("/", async (_, res) => {
//     const result = await client.query("SELECT * FROM usuarios");
//     res.send(result.rows[0]);
// });
app.use('/api', iaRoutes)
app.use('/docs', express.static(path.join(__dirname, "../__docs__")))

export default app