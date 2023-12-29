import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MainLayout({ children }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    return (
        <div>
            <header>
                <nav className="navbar navbar-light p-3 mb-2 p-3 mb-2 bg-success text-white">
                    <div className="container mt-3">
                        <div className="row col-12">
                            <div className='col-6'>
                                <Link to="/land" className="navbar-brand text-white nav-item">Case Management Online System (CMOS)</Link>
                            </div>
                            <div className='col-1'>
                                <div className="navbar-text h6 text-warning"> User name: {username}
                                </div>
                            </div>
                            <div className='col-1'>
                                <button className="btn btn-light bt-sm" onClick={() => { navigate(`/logout`) }}>Logout</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    {children}
                </div>
                <ToastContainer />
            </main>
        </div>
    )
}

export default MainLayout