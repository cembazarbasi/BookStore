import axios from 'axios';
import React, { useState } from 'react';
import '../css/Signup.css'

export const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [uppercaseValid, setUppercaseValid] = useState(false);
    const [numberValid, setNumberValid] = useState(false);
    const [specialCharValid, setSpecialCharValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);   
    const [successMessage, setSuccessMessage] = useState(false); 
    const [passwordClicked, setPasswordClicked] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        };
      
        try {
            const response = await axios.post('http://localhost:8080/sign-up', {
                name,
                email,
                password,
            });
            console.log('Signup successful:', response.data);
            setSuccessMessage(true);
        } catch (error) {
            console.error('Signup failed:', error);
            if (error.response.status === 409) {
                setError('Email already exists. Please use a different email.');
            } else {
                setError('Signup failed. Please try again.');
            }
        }
    }
    
    const handlePasswordChange = (e) => {          
        const newPassword = e.target.value.trim(); 
        if (newPassword === '') {
            
            setPassword('');
            setError('');
            setPasswordValid(false);
            setUppercaseValid(false);
            setNumberValid(false);
            setSpecialCharValid(false);
            setPasswordMatch(false);
        } else if (newPassword.includes(' ')) {
            
            setError('Password cannot contain spaces');
        } else {
           
            setError('');
            setPassword(newPassword);
            validateUppercase(newPassword);
            validateNumber(newPassword);
            validateSpecialChar(newPassword);
            validatePasswordMatch(newPassword, confirmPassword);
        }        
    }
    

    const handleConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value.trim();

        if (confirmPassword === '') {
            setPassword('');
            setConfirmPassword('');
            setError('');
            setPasswordValid(false);
            setUppercaseValid(false);
            setNumberValid(false);
            setSpecialCharValid(false);
            setPasswordMatch(false);
        
        } else {                         
            setConfirmPassword(confirmPassword);
            validatePasswordMatch(password, confirmPassword);
        }        
        
    }

    const validatePasswordMatch = (password, confirmPassword) => {
        setPasswordMatch(password === confirmPassword);
    }

    const validateUppercase = (value) => {
        const uppercaseRegex = /[A-Z]/;
        setUppercaseValid(uppercaseRegex.test(value));
    }

    const validateNumber = (value) => {
        const numberRegex = /[0-9]/;
        setNumberValid(numberRegex.test(value));
    }

    const validateSpecialChar = (value) => {
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        setSpecialCharValid(specialCharRegex.test(value));
    }

    const validatePassword = () => {
        setPasswordValid(uppercaseValid && numberValid && specialCharValid);
        if (confirmPassword) {
            setPasswordMatch(confirmPassword === password);
        }
    }
    
    const handlePasswordMatch = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setPasswordMatch(confirmPasswordValue === password);
    }

    const handlePasswordClick = () => {
        setPasswordClicked(true);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword); 
    }

    return (
        
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                { successMessage && <div class="alert alert-success" role="alert">You have successfully created an account!</div>}
                {error && <div class="alert alert-danger" role="alert">This email is already in use!</div>}
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel2">SIGN UP</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form onSubmit={handleSignup}>
                    <div class="mb-3 text-start">
                                <label for="exampleInputName1" class="form-label ">Full Name*</label>
                                <input type="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                            </div>
                            <div class="mb-3 text-start">
                                <label for="exampleInputEmail1" class="form-label ">Email*</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3 text-start ">
                                <label for="exampleInputPassword1" class="form-label">Password*</label>
                                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => {handlePasswordChange(e)}} required onClick={handlePasswordClick} className={`form-control ${uppercaseValid && numberValid && specialCharValid ? 'is-valid' : ''}`} id="exampleInputPassword1" />
                                { passwordClicked && <div className='mt-1 ms-1'>                                
                                    <div className={`feedback ${uppercaseValid ? 'text-success' : 'text-danger'}`}>At least one uppercase letter</div>
                                    <div className={`feedback ${numberValid ? 'text-success' : 'text-danger'}`}>At least one number</div>
                                    <div className={`feedback ${specialCharValid ? 'text-success' : 'text-danger'}`}>At least one special character</div>
                                </div>}
                            </div>
                            <div class="mb-3 text-start">
                                <label for="exampleInputPassword1" class="form-label">Confirm Password*</label>
                                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => {handleConfirmPasswordChange(e)}} required className={`form-control ${passwordMatch ? 'is-valid' : ''}`} id="exampleInputPassword2" />
                                {!passwordMatch && (password !== '' && confirmPassword !== '') && <div className="feedback text-danger mt-1 ms-1" style={{fontSize:'12px'}}>Passwords don't match!</div>}
                            </div>
                            <div class="mb-3 form-check text-start fw-light">
                                <input type="checkbox" className="form-check-input " id="exampleCheck1" onChange={handleShowPassword} />
                                <label class="form-check-label" for="exampleCheck1">Show password</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100" disabled={!passwordMatch || (!uppercaseValid && !numberValid && !specialCharValid) || name === '' || email === ''}>Create Account</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <p style={{ fontWeight: "150" }}>If you already have an account please</p>
                        <button className="btn btn-outline-primary" type="button" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" role="button">Log In</button>
                    </div>
                </div>
            </div>
        </div>     
    )
}