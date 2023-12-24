//require('dotenv').config()
import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 




function HomePage() {


  const navigate = useNavigate();

  /*
  useEffect(() => {
    //const token = localStorage.getItem('token');
    const token = localStorage.getItem('token');   
    console.log(localStorage.getItem('token'))

    if(!token) {
      navigate('/login'); 
    }

    try {
      console.log("before decode")
      const payload = decodeJWT(token);
      console.log(payload);
      
      
    } catch {
      console.log("oh no")
      navigate('/login');
    }

  }, []);*/

  //const jwt = require('jsonwebtoken');
  /*
  app.get('/user/data', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    })
});
*/

  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1> welcome to the pos</h1>
        <p>this is the first line</p>
        <p>this is the second line</p>
        <Link to="/pos" className="btn btn-primary">Click me to sell product</Link>
      </div>
    </MainLayout>
  )
}


function decodeJWT(token) {
  const payload = token.split('.')[1];
  const decoded = atob(payload);
  return JSON.parse(decoded);
}
export default HomePage