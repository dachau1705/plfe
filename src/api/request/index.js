
import { api } from 'api/api'
import { convertData, createFormData } from './request'

export const postData = (url, data, isUpload = false, blob = false, timeout = 600000) => {
    if (isUpload || blob) {
        const {
            file,
            files,
            image,
            avatar,
            cmt_image,
            images,
            vehicle_registration,
            insurance_photo,
            logo,
            signature,
            education_files,
            health_files,
            accessary_images,
            registryImage,
            other_image,
            ...params
        } = data
        data = createFormData(
            params,
            file,
            files,
            image,
            avatar,
            cmt_image,
            images,
            vehicle_registration,
            insurance_photo,
            logo,
            signature,
            education_files,
            health_files,
            accessary_images,
            registryImage,
            other_image,
        )
    } else data = convertData(data)
    if (blob)
        return api.post(url, data, {
            timeout,
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    else if (isUpload) return api.post(url, data, { timeout, headers: { 'Content-Type': 'multipart/form-data' } })
    else return api.post(url, data, { timeout })
}

export const getData = (url, params, blob = false, timeout = 600000) => {
    params = convertData(params)
    if (blob)
        return api.get(url, {
            params,
            timeout,
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    else return api.get(url, { params })
}

