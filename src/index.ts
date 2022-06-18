import express from "express"
import "reflect-metadata"

import config from "../config/config";
import connect from "./db/connect";
import log from "./logger";
import routes from "./routes";

const port = config.port as number
const host = config.host as string

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, () => {
    log.info(`Server listing at http://${host}:${port}`)

    connect()

    routes(app)
})
