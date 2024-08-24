import { useState } from 'react';
import { post } from './api'; // Đường dẫn đến file api.js

export default function MyForm() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await post('/submit-form', formData); // Thay thế '/submit-form' bằng endpoint API của bạn
            setResponseMessage('Form submitted successfully!');
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
            setResponseMessage('Failed to submit form.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
            />
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
            />
            <button type="submit">Submit</button>
            <p>{responseMessage}</p>
        </form>
    );
}
