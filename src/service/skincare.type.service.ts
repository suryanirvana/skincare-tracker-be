import log from "../logger";
import PostgreDB from "../db/data-source"

import SkincareType from '../model/skincare.type.model';

const skincareTypeRepository = PostgreDB.getRepository(SkincareType)

export async function readSkincareType() {
    try {
        const skincareTypes = await skincareTypeRepository.find()
        
        log.info("Successfully retrieve skincare type data")
        return [skincareTypes]
    } catch (e) {
        throw e
    }
}