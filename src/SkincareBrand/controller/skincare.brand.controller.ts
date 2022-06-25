import { Request, Response } from 'express';

import config from '../../Common/config/config';
import log from '../../Common/logger';

import { success, error } from '../../Common/response/response';
import { readSkincareBrand } from '../service/service.brand.service';

export async function readSkincareBrandHandler(req: Request, res: Response) {
    try {
        const skincareList = await readSkincareBrand()

        log.info(`Request to ${config.skincareBrand}/read: ` + 200)
        return res.json(success(skincareList[0], `Successfully retrieve ${skincareList[1]} skincare brand data`))
    } catch (e) {
        log.error(`Request to ${config.skincareBrand}/read: ${e['code']} - ${e['message']}`)
        return res.json(error(e['code'], e['message']))
    }
}