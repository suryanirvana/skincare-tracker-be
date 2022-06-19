import { Express, Request, Response } from "express"

import config from "../config/config"
import log from "./logger"
import validateRequest from "./middleware/validateRequest"
import { success } from "./response/response"

import { 
    upsertSkincareHandler,
    readSkincareHandler,
    deleteSkincareHandler
} from "./controller/skincare.controller"
import { 
    upsertSkincareRequest,
    readSkincareRequest,
    deleteSkincareRequest
} from "./request/skincare.request"
import { readSkincareTypeHandler } from "./controller/skincare.type.controller"
import { readSkincareBrandHandler } from "./controller/skincare.brand.controller"

export default function(app: Express) {

    // Healthcheck
    app.get(config.healtcheck, (req: Request, res: Response) => {
        log.info(`Request to ${config.healtcheck}: ` + 200)
        res.json(success({}, 'Healthcheck OK'))
    })

    // Upsert Skincare Data
    // POST /api/skincare/create
    app.post(
        `${config.skincare}/upsert`,
        validateRequest(upsertSkincareRequest), 
        upsertSkincareHandler
    )

    // Read Skincare Data
    // POST /api/skincare/read
    app.post(
        `${config.skincare}/read`,
        validateRequest(readSkincareRequest), 
        readSkincareHandler
    )

    // Read Skincare Type Data
    // POST /api/skincare/type/read
    app.post(
        `${config.skincareType}/read`,
        readSkincareTypeHandler
    )

    // Read Skincare Brand Data
    // POST /api/skincare/brand/read
    app.post(
        `${config.skincareBrand}/read`,
        readSkincareBrandHandler
    )

    // Delete Skincare Data
    // POST /api/skincare/delete
    app.post(
        `${config.skincare}/delete`,
        validateRequest(deleteSkincareRequest), 
        deleteSkincareHandler
    )
}