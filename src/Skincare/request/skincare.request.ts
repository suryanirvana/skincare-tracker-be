import { object, string, number } from "yup"

const upsertPayload = {
    body: object({
        skincareID: number(),
        skincareName: string().required("Skincare Name is required"),
        skincareBrand: string().required("Skincare Brand is required"),
        skincareType: string().required("Skincare Type is required")
    })
}

const readPayload = {
    body: object({
        datetime: string().required("Current Datetime is required")
    })
}

const deletePayload = {
    body: object({
        skincareID: number().required("Skincare ID is required")
    })
}

const upsertSkincareRequest = object({
    ...upsertPayload
})

const readSkincareRequest = object({
    ...readPayload
})

const deleteSkincareRequest = object({
    ...deletePayload
})

export { upsertSkincareRequest, readSkincareRequest, deleteSkincareRequest }