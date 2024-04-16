import React from "react";
import axios from "axios";


export const Logout = () => {        

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/logout');
            localStorage.removeItem('jwt');   
            localStorage.removeItem('role'); 
            localStorage.removeItem('userId'); 
            window.location.href = '/';            
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
    
    const handleLogoutClick = () => {
        handleLogout(); 
    };

    return(
        <div className="">
            <a className="nav-link active text-danger" onClick={handleLogoutClick} role="button">Log out</a>            
        </div>
    )
}