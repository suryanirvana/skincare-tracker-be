import log from '../logger';
import PostgreDB from '../db/data-source';

import Skincare from '../model/skincare.model';
import SkincareBrand from '../model/skincare.brand.model';
import SkincareType from '../model/skincare.type.model';
import { Request } from 'express';

const skincareRepository = PostgreDB.getRepository(Skincare)
const skincareBrandRepository = PostgreDB.getRepository(SkincareBrand)
const skincareTypeRepository = PostgreDB.getRepository(SkincareType)

export async function upsertSkincare(req: Request) {
    try {
        const skincareID = req.body['skincareID']

        const skincareBrandName = req.body['skincareBrand']
        const skincareBrand = await skincareBrandRepository.findOneBy({
            skincareBrandName: skincareBrandName
        })

        const skincareTypeName = req.body['skincareType']
        const skincareType = await skincareTypeRepository.findOneBy({
            skincareTypeName: skincareTypeName
        })

        var skincare = new Skincare()
        if(skincareID) {
            skincare = await skincareRepository.findOneBy({
                skincareID: skincareID
            })
        }
        skincare.skincareName = req.body['skincareName']
        skincare.skincareBrandID = skincareBrand
        skincare.skincareTypeID = skincareType
        
        await skincareRepository.save(skincare)

        log.info("Successfully upsert skincare data")
        return skincare
    } catch (e) {
        throw e
    }
}

export async function readSkincare(req: Request) {
    try {
        const datetime = new Date(req.body['datetime'])
        const hour = datetime.getHours()
        var dayOrNight = ""
        var dayNight = ""

        if(hour >= 7 && hour <=18) {
            dayOrNight = "skincareType.day = :condiiton"
            dayNight = "day-time"
        } else if (hour <= 6 || hour >= 19) {
            dayOrNight = "skincareType.night = :condiiton"
            dayNight = "night-time"
        }

        const skincareList = await skincareRepository.createQueryBuilder("skincare")
                                                    .innerJoinAndSelect("skincare.skincareBrandID", "skincareBrand")
                                                    .innerJoinAndSelect("skincare.skincareTypeID", "skincareType")
                                                    .where(dayOrNight, { condiiton: true })
                                                    .getMany()

        var skincareListDictionary: { [id: string] : [Skincare] } = {}
        for(var skincare of skincareList) {
            const skincareTypeName = skincare.skincareTypeID.skincareTypeName

            if(skincareTypeName in skincareListDictionary) {
                var skincares = skincareListDictionary[skincareTypeName]
                skincares.push(skincare)
                skincareListDictionary[skincareTypeName] = skincares
            } else {
                skincareListDictionary[skincareTypeName] = [skincare]
            }
        }

        var skincareListFinalResult: { [id: string] : Skincare } = {}
        Object.entries(skincareListDictionary).forEach(
            ([key, value]) => {
                const skincare = value[Math.floor(Math.random() * value.length)]
                skincareListFinalResult[key] = skincare
            }
        );
    
        log.info(`Successfully retrieve ${dayNight} skincare data`)
        return [skincareListFinalResult, dayNight]
    } catch (e) {
        throw e
    }
}

export async function deleteSkincare(req: Request) {
    try {
        const skincareID = req.body['skincareID']
        
        await skincareRepository.createQueryBuilder()
                            .delete()
                            .from(Skincare)
                            .where("skincareID = :skincareID", { skincareID: skincareID })
                            .execute()

        log.info(`Successfully delete skincare data with ID: ${skincareID}`)
        return skincareID
    } catch (e) {
        throw e
    }
}
