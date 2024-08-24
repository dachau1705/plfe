import { useEffect, useState } from 'react';
import { get } from './api'; // Đường dẫn đến file api.js

export default function MyComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await get('/data'); // Thay thế '/data' bằng endpoint API của bạn
                setData(result);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}
