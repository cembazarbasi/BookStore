import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'


export const Login = () => {

    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password,
            });
            console.log('Response data:', response.data);
            const { role, jwt, userId } = response.data;
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);
            localStorage.setItem('jwt', jwt);
            window.location.reload();
        } catch (error) {
            if (error.response.status === 403) {
                setError('Invalid email or password. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    

    return (
        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {error && <div class="alert alert-danger" role="alert">{error}</div>}
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">LOG IN</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleLogin}>
                            <div class="mb-3 text-start">
                                <label for="exampleInputEmail1" class="form-label ">Email</label>
                                <input value={username} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required />
                            </div>
                            <div class="mb-3 text-start">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword" required />
                            </div>
                            <div class="mb-3 form-check text-start fw-light">
                                <input type="checkbox" className="form-check-input " id="exampleCheck1" onChange={handleShowPassword} />
                                <label class="form-check-label" for="exampleCheck1">Show password</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <p style={{ fontWeight: "150" }}>Don't have an account?</p>
                        <button className="btn btn-outline-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" role="button">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}