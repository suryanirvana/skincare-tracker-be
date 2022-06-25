import log from "../../Common/logger";
import PostgreDB from "../../Common/db/data-source"

import SkincareBrand from '../model/skincare.brand.model';

const skincareBrandRepository = PostgreDB.getRepository(SkincareBrand)

export async function readSkincareBrand() {
    try {
        const skincareBrands = await skincareBrandRepository.find()
        
        log.info("Successfully retrieve skincare brand data")
        return [skincareBrands]
    } catch (e) {
        throw e
    }
}