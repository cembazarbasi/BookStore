import './css/Navbar.css';
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Logout } from "./components/Logout";

export const Navbar = () => {

    const jwtToken = localStorage.getItem('jwt');
    const userRole = localStorage.getItem('role');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand me-5" href="#">Bookstore</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">                        
                        {userRole === 'ADMIN' &&
                            <li className="nav-item  mx-5">
                                <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
                            </li>
                        }
                        {!jwtToken && (
                            <li className="nav-item">
                                <a className="nav-link active" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Log in / Sign up</a>
                                <Login />
                                <Signup />
                            </li>
                        )}
                        {jwtToken && (
                            <li className="nav-item">
                                <Logout />
                            </li>
                        )}
                    </ul>                    
                </div>
            </div>
        </nav>
    )
}