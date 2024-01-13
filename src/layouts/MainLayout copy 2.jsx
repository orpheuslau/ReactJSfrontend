import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBox from '../components/LogoutConfirm';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { MdCarRepair } from 'react-icons/md';




function MainLayout({ children }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const menuLabel = ['Student Profile', 'Assessment', 'Export assessment', 'Admin file', 'Analysis', 'Search', 'User setup'];
    const menuLink = ['/student', '/assessment', '/export', '/admin', '/analysis', '/search', '/usersetup'];
    const [mLabel, setMlLabel] = useState([]);
    const [mLink, setMlLink] = useState([]);



    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);


    const setParm = () => {
        setMlLabel(menuLabel)
        setMlLink(menuLink)
    }


    useEffect(() => {
        setParm();
    }, []);

    return (
        <div>
            <header>
                <nav className="navbar navbar-light mb-2  bg-success">
                    <div className='container'>
                        <div className='row col-12'>
                            <div className='col col-md-auto m-3'>
                            <a href="/student"><img src='/school.png' alt='school logo' title='Home' width='100px' height='100px' /></a>
                            </div>
                            <div className='col col-md-9 my-auto align-items-center text-warning'><h4>Student Management Information System</h4></div>
                        </div>
                        <div className='row col-12'>
                            <div className='col-md-4'>
                                <Dropdown >
                                    <Dropdown.Toggle variant="success" id="drop-start" direction="end">
                                        MENU
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="light">
                                        {mLabel.map((mlcontent, index) =>
                                            <Dropdown.Item href={mLink[index]} icon={MdCarRepair}>{mlcontent}</Dropdown.Item>
                                        )}
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="" onClick={() => setShowLogoutConfirmation(true)}><strong>LOGOUT</strong></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className='col-md-4 h6 ml-auto align-self-end my-auto text-end text-white'>Welcome: {username + "  "}
                            </div>
                        </div>



                        <LogoutBox show={showLogoutConfirmation} onClose={() => setShowLogoutConfirmation(false)} />
                    </div>
                </nav>

            </header>

            <main>
                <div className="container">
                    {children}
                    <ToastContainer />
                </div>
            </main>
        </div>
    )
}

export default MainLayout