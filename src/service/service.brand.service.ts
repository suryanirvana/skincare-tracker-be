import log from "../logger";
import PostgreDB from "../db/data-source"

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