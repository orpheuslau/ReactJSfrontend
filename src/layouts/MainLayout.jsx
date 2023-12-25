import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({ children }) {
    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-info">
                    <div className="container mt-3">
                        <Link to="/" className="navbar-brand text-white nav-item flex-grow-2">Case Management Online System (CMOS)</Link>

                        <button className="btn btn-light btn-sm d-flex justify-content-end">Logout</button><div></div>
  
       
                    </div>
                </nav>
            </header>
            <main>
                <div className="container-xxl mt-3">
                    {children}
                </div>
                <ToastContainer/>
            </main>
        </div>
    )
}

export default MainLayout