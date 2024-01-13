import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';





function LogoutPage() {
    const [bgColor, setBgColor] = useState('');

    useEffect(() => {
        const colors = [
          '#f44336',
          '#e91e63',
          '#9c27b0',
          '#f41fb4',
          '#a09688',
          '#00bcd4',
          '#109668',
          '#10acd4',
          '#8c17b0',
          '#a4e336',
          '#e91e63'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBgColor(randomColor);
      }, []);
    

    

    try {

        const result = axios.get('api/login')
        localStorage.removeItem('username')


    }

    catch (err) {
        console.log(err);
        //navigate('/test')
    }


    return (
        <section className="vh-100 gradient-custom bgColor" style={{ background: bgColor }} >
      
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white border-radius: 1rem">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">

                  <br />
                      
                     
                    <h2 className="fw-bold mb-2 text-uppercase">CMOS</h2>
                    <br />
                      <br />
                      
                                           <p className="text-white-50  mt-5 h1">Logged out !</p>
                                           <p className="text-white-50 mb-5 h5">Thank you for using CMOS</p>
                      <br />
                      <br />
                      <br />
                      
                      <Link to="/login">
                      <button className="btn btn-outline-light btn-lg px-5" type="submit">Login again</button>
                      
                      </Link>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                   
                   
                  </div>
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    );
};




export default LogoutPage