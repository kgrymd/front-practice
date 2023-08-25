import React, { useState } from 'react';
import axios from 'axios';



// async function getCsrfToken() {
//     const { data } = await axios.get('http://localhost/api/csrf-token');
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = data.token; // 大文字で 'X-CSRF-TOKEN'
// }

async function getCsrfToken() {
    const { data } = await axios.get('http://localhost/api/csrf-token', { withCredentials: true });
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.token;
}



function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // パスワード確認用のフィールド
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await getCsrfToken(); // トークン取得
    //         await axios.post('http://localhost/register', formData);
    //         setMessage('User registered successfully');
    //     } catch (error) {
    //         console.error(error);
    //         setMessage('Registration failed');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await getCsrfToken(); // トークン取得
            await axios.post('http://localhost/register', formData, { withCredentials: true });
            setMessage('User registered successfully');
        } catch (error) {
            console.error(error);
            setMessage('Registration failed');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleChange} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" name="password_confirmation" onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default Register;
