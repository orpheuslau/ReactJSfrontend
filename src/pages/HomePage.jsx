//require('dotenv').config()
import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Dropdown, Modal } from 'react-bootstrap';




function HomePage() {


  const navigate = useNavigate();

  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const colors = [
      '#f44336', 
      '#e91e63',
      '#9c27b0' 
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);




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

<!-- <div className="bg-light p-5 mt-4 rounded-3"> -->
*/

  return (
    
 

<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  
  )
}



export default HomePage