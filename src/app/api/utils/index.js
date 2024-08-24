import { get, post } from "api/api"
import { useEffect, useState } from "react"
import { getAllProduct, getDetailProduct } from "../products"

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
            console.log(result);
            setData(result);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [JSON.stringify(params)])
    console.log(data);

    return data
}