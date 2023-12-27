import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainLayout({ children }) {
    const username = localStorage.getItem('username');

    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-info">
                    <div className="container mt-3">
                        <div className="row col-12">
                            <div className='col-6'>
                                <Link to="/land" className="navbar-brand text-white nav-item">Case Management Online System (CMOS)</Link>
                            </div>
                            <div className='col-1'>
                                <div className="navbar-text h6"> User name: {username}
                                </div>
                            </div>
                            <div className='col-1'>
                                <button className="btn btn-light bt-sm">Logout</button>
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