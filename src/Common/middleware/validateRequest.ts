import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"
import log from "../logger"
import { badRequest } from "../response/response"


const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        })

        return next()
    } catch (e) {
        log.error(`Validate request error: ${e.errors}`)
        return res.json(badRequest(e.errors))
    }
}

export default validate
