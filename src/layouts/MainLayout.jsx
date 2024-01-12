import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBox from '../components/LogoutConfirm';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { MdCarRepair } from 'react-icons/md';
import NavDropdown from 'react-bootstrap/NavDropdown';



function MainLayout({ children }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const menuLabel = ['Student Profile', 'Assessment', 'Export assessment', 'Admin file', 'Setting', 'Analysis', 'Search', 'User setup'];
    const menuLink = ['/student', '/assessment', '/export', '/admin', '/setting', '/analysis', '/search', '/usersetup'];
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


                <nav className="navbar navbar-light mb-2  bg-success text-white">
                    <div className="container mt-3">
                        <div className="row col-8 align-items-start">
                            <div className='col-6'>
                                <Link to="/student" className="navbar-brand text-warning nav-item"><h3>Student Management Online System (SMOS)</h3></Link>
                            </div>
                            <div className='col-2 offset-md-2'></div>

                        </div>

                        <div className="row col-12 mt-3">
                            <div className='col-6'>
                                <Dropdown >
                                    <Dropdown.Toggle variant="success" id="drop-start" direction="end">
                                        MENU
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu  variant="light">
                                        {mLabel.map((mlcontent, index) =>
                                            <Dropdown.Item href={mLink[index]} icon={MdCarRepair}>{mlcontent}</Dropdown.Item>

                                        )}

                                        <Dropdown.Divider />
                                        <Dropdown.Item href="" onClick={() => setShowLogoutConfirmation(true)}><strong>LOGOUT</strong></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            {/*    <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
                                        </NavDropdown>*/}

                            </div>

                            <div className='col-2 h6 align-items-end mx-5 text-info '>{username + "  "}

                                <button className="btn btn-light bt-sm" onClick={() => setShowLogoutConfirmation(true)}>Logout</button>
                                <LogoutBox show={showLogoutConfirmation}
                                    onClose={() => setShowLogoutConfirmation(false)}
                                />
                            </div>
                        </div>

                    </div>
                </nav>

            </header>


            <main>

                <div className="container">
                    {children}
                </div>

            </main>
        </div>
    )
}

export default MainLayout