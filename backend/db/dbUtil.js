export const dbUtil = {
    getNumberRangeValidate,
    getStringLengthValidate,
}

function getStringLengthValidate(fieldName, min, max = null) {
    const message =
        max === null
            ? `${fieldName} must be at least ${min} characters long`
            : `${fieldName} must be between ${min} and ${max} characters long`

    return {
        validator: (value) =>
            value.length >= min && (max === null || value.length <= max),
        message,
    }
}

export function getNumberRangeValidate(fieldName, min, max) {
    return {
        validator: (value) => value >= min && value <= max,
        message: `${fieldName} must be between ${min} and ${max}`,
    }
}
