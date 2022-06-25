import { Request, Response } from 'express';

import config from '../../Common/config/config';
import log from '../../Common/logger';

import { success, error } from '../../Common/response/response';
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