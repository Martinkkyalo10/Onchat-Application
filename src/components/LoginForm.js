import { useState } from "react";
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = { 'Project-ID': "f930fd3c-a591-495c-b369-400adb47d71f", 'User-Name': username, 'User-Secret': password };
        try {

            //auth user with username and password
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            // if auth/reg is successful store username and password
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // then reload the page
            window.location.reload();
            setError('');
        } catch (error) {
            setError('Oops, incorrect credentials!');
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">OnChat</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span style={{ color: 'blue' }}>Chat Now</span>
                        </button>
                    </div>

                </form>
                <h2 className="error">{error}</h2>
            </div>

        </div>


    );
};

export default LoginForm;
