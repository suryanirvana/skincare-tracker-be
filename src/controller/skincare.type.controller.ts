import { Request, Response } from 'express';

import config from '../../config/config';
import log from '../logger';

import { success, error } from '../response/response';
import { readSkincareType } from '../service/skincare.type.service';

export async function readSkincareTypeHandler(req: Request, res: Response) {
    try {
        const skincareList = await readSkincareType()

        log.info(`Request to ${config.skincareType}/read: ` + 200)
        return res.json(success(skincareList[0], `Successfully retrieve ${skincareList[1]} skincare type data`))
    } catch (e) {
        log.error(`Request to ${config.skincareType}/read: ${e['code']} - ${e['message']}`)
        return res.json(error(e['code'], e['message']))
    }
}