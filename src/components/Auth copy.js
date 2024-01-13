import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Auth() {

    const navigate = useNavigate();

    useEffect(() => {
      //const token = localStorage.getItem('token');
      const token = localStorage.getItem('token');   
      console.log(localStorage.getItem('token'))
  
      if(!token) {
        navigate('/login'); 
      }
  
      try {
       /* console.log("before decode")
        const payload = decodeJWT(token);
        if(!payload.isAdmin) {
          throw new Error('Unauthorized');
        }*/
        
      } catch {
        console.log("oh no")
        navigate('/login');
      }
  
    }, []);


  return (
    <div>auth</div>
  )
}

export default Auth;