import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { Navbar } from './Navbar';
import { Admindashboard } from './components/Admindashboard';
import { Userdashboard } from './components/Userdashboard';

function App() {
  const userRole = localStorage.getItem('role'); 

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={userRole ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />         
          <Route path='/dashboard' element={userRole === 'ADMIN' ? <Admindashboard /> : <Userdashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
