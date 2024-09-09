/* eslint-disable react-hooks/exhaustive-deps */
import { get, post } from "api/api"
import { useEffect, useState } from "react"
import { getAllProvinces, getDistrictsByProvince, getWardsByDistrict } from "../address"
import { getAllProduct, getDetailProduct } from "../products"
import { getAllUserApi, getDetailUser } from "../users"

export const useProductDetail = (_id) => {
    const [data, setData] = useState({})

    async function fetchData() {
        const response = await post(getDetailProduct, { _id: _id })
        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (_id) fetchData()
    }, [_id])
    return data
}

export const useListProduct = (params) => {
    const [data, setData] = useState([])
    async function fetchData() {
        try {
            const result = await get(getAllProduct);
            setData(result);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [JSON.stringify(params)])

    return data
}
export const useListUsers = (params) => {
    const [data, setData] = useState([])
    async function fetchData() {
        try {
            const result = await get(getAllUserApi);
            setData(result);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [JSON.stringify(params)])

    return data
}

export const useUserDetail = (_id) => {
    const [data, setData] = useState({})

    async function fetchData() {
        const response = await post(getDetailUser, { _id: _id })
        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (_id) fetchData()
    }, [_id])
    return data
}

export const useListProvinces = (params) => {
    const [data, setData] = useState([])
    async function fetchData() {
        try {
            const result = await get(getAllProvinces);
            setData(result);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [JSON.stringify(params)])

    return data
}

export const useListDistrics = (name) => {
    const [data, setData] = useState([])
    async function fetchData() {
        const response = await post(getDistrictsByProvince, { name: name })
        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (name) fetchData()
    }, [name])
    return data
}

export const useListWards = (name) => {
    const [data, setData] = useState([])
    async function fetchData() {
        const response = await post(getWardsByDistrict, { name: name })
        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (name) fetchData()
    }, [name])
    return data
}