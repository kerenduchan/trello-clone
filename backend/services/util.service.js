export const utilService = {
    toNumber,
    validateMandatoryFields,
    extractFields,
    validateStringLength,
    validateNumber,
    removeNullAndUndefined,
    handleDbError,
    isValidHexColor,
}

function toNumber(s) {
    if (s === undefined || s === null || s === '') {
        return undefined
    }
    s = +s
    if (isNaN(s)) {
        return undefined
    }
    return s
}

function validateMandatoryFields(obj, mandatoryFields) {
    const missingFields = mandatoryFields.filter(
        (field) => obj[field] === undefined || obj[field] === null
    )
    if (missingFields.length) {
        throw `Missing mandatory field${
            missingFields.length > 1 ? 's' : ''
        }: ${missingFields.join(', ')}`
    }
}

function extractFields(entity, fields) {
    let res = {}
    fields.forEach((field) => {
        if (entity[field] !== undefined) {
            res[field] = entity[field]
        }
    })
    return res
}

function validateStringLength(fieldName, value, allowedLength) {
    const { min, max } = allowedLength

    if (value === undefined) {
        return
    }

    if (typeof value !== 'string') {
        throw `${fieldName} must be a string`
    }

    if (min && value.length < min) {
        throw `${fieldName} must be at least ${min} characters`
    }

    if (max && value.length > max) {
        throw `${fieldName} must be at most ${max} characters`
    }
}

function validateNumber(fieldName, value, allowedRange) {
    const { min, max } = allowedRange

    if (value === undefined) {
        return
    }

    if (typeof value !== 'number') {
        throw `${fieldName} must be a number`
    }

    if (min && value < min) {
        throw `${fieldName} must be at least ${min}`
    }

    if (max && value > max) {
        throw `${fieldName} must be at most ${max}`
    }
}

function removeNullAndUndefined(obj) {
    let res = {}
    for (let field in obj) {
        if (obj[field] !== null && obj[field] !== undefined) {
            res[field] = obj[field]
        }
    }
    return res
}

function handleDbError(err) {
    if (err.name === 'CastError') {
        if (err.kind === 'ObjectId' || err.kind === '[ObjectId]') {
            throw `Invalid ID: ${err.value}`
        }
        if (err.kind === 'Number') {
            throw `${err.path} must be a valid number`
        }
    }
    if (err.name === 'ValidationError') {
        let errors = {}

        for (const [key, value] of Object.entries(err.errors)) {
            if (value.name === 'ValidatorError') {
                errors[key] = value.message
            } else if (value.name === 'CastError') {
                if (value.kind === 'ObjectId' || value.kind === '[ObjectId]') {
                    errors[key] = `Invalid ID: ${value.value}`
                } else if (value.kind === 'Number')
                    errors[key] = `${key} must be a valid number`
            }
        }

        throw { error: 'Validation failed', errors }
    }
    throw err
}

function isValidHexColor(value) {
    return /^#[0-9A-Fa-f]{6}$/.test(value)
}
