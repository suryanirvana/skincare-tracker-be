const success = (result: {}, message: string) => {
    return {
        code: 200,
        message: message,
        result
    }
}

const error = (code?: number, message?: string) => {
    return {
        code: code || 400,
        message: message || "Unknown error occurred",
    }
}

const badRequest = (message: string) => {
    return {
        code: 400,
        message: message,
    }
}

const forbidden = () => {
    return {
        code: 403,
        message: "Forbidden",
    }
}

const internal = () => {
    return {
        code: 500,
        message: "Internal server error",
    }
}

const unauthorized = () => {
    return {
        code: 401,
        message: "Unauthorized access",
    }
}

export { success, error, badRequest, forbidden, internal, unauthorized }