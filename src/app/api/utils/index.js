/* eslint-disable react-hooks/exhaustive-deps */
import { get, post } from "api/api"
import { debounce } from "lodash"
import { useEffect, useRef, useState } from "react"
import { getAllProvinces, getDistrictsByProvince, getWardsByDistrict } from "../address"
import { getCartList } from "../cart"
import { listGroupChatApi } from "../chat/groupchat"
import { listMessageApi } from "../chat/message"
import { getListOrder } from "../orders"
import { getAllProduct, getDetailProduct } from "../products"
import { getAllUserApi, getDetailUser, getListMailLog } from "../users"

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

export const useListCart = (userId) => {
    const [data, setData] = useState([])

    async function fetchData() {
        const response = await post(getCartList, { userId: userId })

        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (userId) fetchData()
    }, [userId])
    return data
}

export const useListLogMail = (userId) => {
    const [data, setData] = useState([])

    async function fetchData() {
        const response = await post(getListMailLog, { userId: userId })

        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (userId) fetchData()
    }, [userId])
    return data
}

export const useListOrder = (userId) => {
    const [data, setData] = useState([])

    async function fetchData() {
        const response = await post(getListOrder, { userId: userId })

        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (userId) fetchData()
    }, [userId])
    return data
}

//----------------------------------Chat--------------------------------------
//================================Message=====================================
export const useListMessage = (room_id) => {
    const [data, setData] = useState([])

    async function fetchData() {
        const response = await post(listMessageApi, { room_id: room_id })

        if (response.status) setData(response.data)
    }
    useEffect(() => {
        if (room_id) fetchData()
    }, [room_id])

    return data
}
//================================GroupChat===================================

export const useListBoxChat = (params) => {
    const [data, setData] = useState([]);
    const prevParamsRef = useRef();

    const fetchData = debounce(async () => {
        try {
            const response = await get(listGroupChatApi, { ...params });
            setData(response);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }, 300);  // Độ trễ 300ms cho debounce

    useEffect(() => {
        if (JSON.stringify(prevParamsRef.current) !== JSON.stringify(params)) {
            fetchData();
            prevParamsRef.current = params;
        }
    }, [params]);

    return data;
};