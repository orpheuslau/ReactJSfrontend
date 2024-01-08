import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutBox from '../components/LogoutConfirm';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';




function MainLayout({ children }) {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const menuLabel = ['Student Profile','Assessment','Export assessment','Admin file','Setting','Analysis','Search','User setup'];
    const menuLink = ['student', 'assessment','export', 'admin', 'setting', 'analysis', 'search', 'usersetup'];
const [mLabel, setMlLabel] = useState([]);
const [mLink, setMlLink] = useState([]);



    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);


    const setParm= () => {
setMlLabel(menuLabel)
setMlLink(menuLink)
    }


    useEffect(() => {
        setParm();
      }, []);

    return (
        <div>
            <header>

                {/*
            
<nav className="navbar navbar-expand-lg navbar-light bg-success">
  
  <div className="container">
    
    <a className="navbar-brand me-2" href="https://mdbgo.com/">
      <img
        src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
        height="16"
        alt="MDB Logo"
        loading="lazy"
        
      />
    </a>

        <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarButtonsExample"
      aria-controls="navbarButtonsExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    
    <div className="collapse navbar-collapse" id="navbarButtonsExample">
      
    
      

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">Student</a>
        </li>
      </ul>
      

      <div className="d-flex align-items-center">
      <div className=' navbar-text h6 text-warning me-3'>{username+ "   "}</div>
        
 
       
        <button type="button" className="btn bg-dark-subtle btn-sm text-white" onClick={() => setShowLogoutConfirmation(true)}>Logout</button>
                                <LogoutBox show={showLogoutConfirmation}
                                    onClose={() => setShowLogoutConfirmation(false)}
                                />
      </div>
    </div>
    
  </div>
  
    </nav>*/}



                <nav className="navbar navbar-light mb-2  bg-success text-white">
                    <div className="container mt-3">
                        <div className="row col-8 align-items-start">
                            <div className='col-6'>
                                <Link to="/student" className="navbar-brand text-white nav-item"><h3>Student Management Online System (SMOS)</h3></Link>
                            </div>
                            <div className='col-2 offset-md-2'></div>
                           
                        </div>

                        <div className="row col-12 mt-3">
                            <div className='col-6'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        MENU
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    {mLabel.map((mlcontent, index)=>
                                        <Dropdown.Item href={mLink[index]}>{mlcontent}</Dropdown.Item>

                                    )}

                                        
                                                                     </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className='col-2 h6 align-items-end mx-5 text-warning '>{username + "  "}

                                <button className="btn btn-light bt-sm" onClick={() => setShowLogoutConfirmation(true)}>Logout</button>
                                <LogoutBox show={showLogoutConfirmation}
                                    onClose={() => setShowLogoutConfirmation(false)}
                                />
                            </div>
                        </div>





                        {/*}
                        <div className="row col-8 mt-5">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Student Profile</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Assessment</strong></a>
                                </li><li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Export assessment</strong></a>
                                </li><li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Admin file</strong></a>
                                </li><li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Setting</strong></a>
                                </li><li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Search</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>User setup</strong></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-white" href="#"><strong>Analysis</strong></a>
                                </li>
                            </ul>
</div>*/}

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