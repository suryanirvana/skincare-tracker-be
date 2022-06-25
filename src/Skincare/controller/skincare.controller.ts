import { Request, Response } from "express"

import config from "../../Common/config/config";
import log from "../../Common/logger";

import { success, error } from "../../Common/response/response";
import { 
    upsertSkincare, 
    readSkincare, 
    deleteSkincare 
} from "../service/skincare.service";

export async function upsertSkincareHandler(req: Request, res: Response) {
    try {
        const skincare = await upsertSkincare(req)

        log.info(`Request to ${config.skincare}/upsert: ` + 200)
        return res.json(success(skincare, "Successfully create skincare data"))
    } catch (e) {
        log.error(`Request to ${config.skincare}/upsert: ${e['code']} - ${e['message']}`)
        return res.json(error(e['code'], e['message']))
    }
}

export async function readSkincareHandler(req: Request, res: Response) {
    try {
        const skincareList = await readSkincare(req)

        log.info(`Request to ${config.skincare}/read: ` + 200)
        return res.json(success(skincareList[0], `Successfully retrieve ${skincareList[1]} skincare data`))
    } catch (e) {
        log.error(`Request to ${config.skincare}/read: ${e['code']} - ${e['message']}`)
        return res.json(error(e['code'], e['message']))
    }
}

export async function deleteSkincareHandler(req: Request, res: Response) {
    try {
        const skincareID = await deleteSkincare(req)

        log.info(`Request to ${config.skincare}/delete: ` + 200)
        return res.json(success({}, `Successfully delete skincare data with ID ${skincareID}`))
    } catch (e) {
        log.error(`Request to ${config.skincare}/delete: ${e['code']} - ${e['message']}`)
        return res.json(error(e['code'], e['message']))
    }
}
