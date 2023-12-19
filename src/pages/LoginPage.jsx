import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

/**
 * Login component handles user login logic.
 * 
 * Allows user to input username and password. 
 * On submit, makes request to backend API to authenticate.
 * Stores login state and displays error on invalid login.
 * On successful login, redirects to one page.
*/
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        if (response.data.success) {
          setError('');
          window.location.href = '/';
        } else {
          setError('Invalid username or password');
        }
      });
  };





  return (


    <section className="vh-100 gradient-custom bg-primary" 
    
    style={{ background: 'linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white border-radius: 1rem">
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">CMOS</h2>
                  <form onSubmit={handleSubmit}>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-white mb-4">

                      <input className="form-control form-control-lg"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                      />
                      <label className="form-label" for="typeText">Username</label>
                    </div>

                    <div className="form-outline form-white mb-4">


                      <input className="form-control form-control-lg"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />

                      <label className="form-label" for="typePasswordX">Password</label>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="mailto:support@asdfds.com">Forgot password?</a></p>



                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                    {error && <div>{error}</div>}
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>

                  </form>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  );
}

export default Login;