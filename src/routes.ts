import { Express, Request, Response } from "express"
import config from "../config/config"
import log from "./logger"
import { success } from "./response/response"

export default function(app: Express) {

    app.get(config.healtcheck, (req: Request, res: Response) => {
        res.json(success({}, 'Healthcheck OK'))
        log.info(`Request to ${config.healtcheck}: ` + 200)
    })

}