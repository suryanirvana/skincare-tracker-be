import express from "express"
import "reflect-metadata"

import config from "./Common/config/config";
import connect from "./Common/db/connect";
import log from "./Common/logger";
import { connectRedis } from "./Common/redis";
import routes from "./routes";

const port = config.port as number
const host = config.host as string

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`)

    connect()

    connectRedis()

    routes(app)
})
