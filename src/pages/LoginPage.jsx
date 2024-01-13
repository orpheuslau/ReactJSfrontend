/**
 * Imports React hooks for state management, Axios for API calls, 
 * React Router for navigation, layout component, and hook for programmatic navigation.
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


/**
 * Login component handles user authentication.
 * 
 * Allows user to input username and password.
 * On form submit, authenticates user credentials via API call. 
 * Manages login state, error messages, and loading state.
 * Navigates to /pos on successful login.
*/
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('');

  /**
   * Set random background color on mount.  
   * 
   * Generate array of color hex values.
   * Get random index using Math.random() and array length.
   * Set bgColor state to random color from array.
  */
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

  /**
   * Handle form submit event for login.
   * 
   * Prevent default form submission.
   * Validate username and password are not empty.
   * Set loading state.
   * Make API call to /login with credentials.
   * Handle success and error response:
   * - On success, navigate to /pos
   * - On error, set error message  
   * Set loading state back to false if login is unsuccessful.
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setError("Please fill out all required fields")
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post("https://node-api-bxak.onrender.com/api/login", { username: username, password: password });
      setError(response.data.message)
      setIsLoading(false);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('role', response.data.role);
      //localStorage.setItem('c', response.data.name);
      //console.log(response.data.classid);
      //localStorage.setItem('classid', response.data.classid);
      navigate("/student");
    } catch (error) {
      setError('Username and/or password are incorrect')
      setIsLoading(false);
    }
  };

  return (
    /**
     * Login page UI component.
     * 
     * Renders a login form with username and password inputs,
     * submit button, and email links.
     * 
     * Handles form submission to make login API request.
     * Displays error message on failed login.
     * Navigates to /pos page on successful login.
     */
    <section className="vh-100 gradient-custom bgColor" style={{ background: bgColor }}>
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
                        onChange={(event) => setUsername(event.target.value)} />
                      <label className="form-label" for="typeText">Username</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input className="form-control form-control-lg"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                      <label className="form-label" for="typePasswordX">Password</label>
                    </div>
                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="mailto:support@asdfds.com">Forgot password?</a></p>
                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                    {error && <div><p></p><strong>{error}</strong></div>}
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    
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