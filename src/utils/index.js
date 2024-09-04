export const removePropObject = (object1, object2) => {
    const changedProperties = {}
    for (const key in object1) {
        if (object1.hasOwnProperty(key) && JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
            changedProperties[key] = object1[key]
        }
    }
    return changedProperties
}

export const removeUndefinedProps = (obj) => {
    for (let prop in obj) {
        if (!(obj[prop] || obj[prop] === '' || obj[prop] === 0)) {
            delete obj[prop]
        }
    }
    return obj
}