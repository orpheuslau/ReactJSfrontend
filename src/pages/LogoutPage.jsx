import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';



function LogoutPage(){

const navigate = useNavigate();


    try{

        const result = axios.get('api/login')
      
        localStorage.removeItem('username')
    }

    catch(err){
        console.log(err);
        //navigate('/test')
    }

    return (
       
        <div>LogoutPage</div>
        
      )
}

 


export default LogoutPage