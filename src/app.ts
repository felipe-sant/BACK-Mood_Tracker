import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import i18next from "./configs/i18n.config.js"
import * as i18nextMiddleware from "i18next-http-middleware"
import requestLogger from './middlewares/requestLogger.middleware.js'
import iaRoutes from "./routes/AI.routes.js"
import historicalRoutes from "./routes/Historical.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(i18nextMiddleware.handle(i18next))

app.get('/', (_, res) => { res.redirect('/docs/routes.html') })
app.use('/api', iaRoutes)
app.use('/api', historicalRoutes)

app.use('/docs', express.static(path.join(__dirname, "../__docs__")))

export default app