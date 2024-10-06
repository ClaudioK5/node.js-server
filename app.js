import express from 'express'
import {StatusCodes} from 'http-status-codes'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import compression from 'compression'
import cors from 'cors'
import pino from 'pino'

import appRoutes from "./routes"


const app = express()

const port = 3000;
app.use(cors())
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


app.use(compression())
app.use(express.json())
app.use(helmet())
app.use(limiter)


app.use('/v1', appRoutes)



app.listen(port, () => {
    console.log(`hey go to localhost: http://localhost:${port}`)
})