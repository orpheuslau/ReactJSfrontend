import React, { useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { Auth } from '../components/Auth';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';



function StudentPage() {

  const [students, setStudents] = useState([]);
  const [isLoading, setISloading] = useState(false);
  const [isAuth, setISauth] = useState (false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState([0]);


  const columns = [
    {
        name: 'Class',
        selector: row => row.classid,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
      name: 'Contact',
      selector: row => row.Contact,
  },
  {
    name: 'Address',
    selector: row => row.Address,
},
{
  name: 'Year',
  selector: row => row.year,
},

];

 

  const navigate = useNavigate(); 

  //let s1 = []
  //students.map((ss,index)=> s1[index]=ss)
  //console.log(s1[1], s1[3])


   
  
    const fetchStudents = async () => {
      try{
    //    const s1 = []
        const result = await axios.get('api/students')
        //console.log(result.data[1].name)  
        setStudents(await result.data);
        //s1 = result.data[0].name
        //console.log(s1)
          setISloading(false);
         
       
        //students.map((student, id)=> 
        //s1 = student.name)
          //  console.log(students[0].name)
          
          //setISauth(true)
      }
      catch{
        navigate('/login')
           //setISauth(false)
           //console.log(isAuth);
      
        }
      }
      
     
      
      
           
        useEffect(() => {
          fetchStudents();
        }, []);
      
      
    

      


  return (

    <MainLayout>
    
    <DataTable
            columns={columns}
            data={students}
        />


     
     </MainLayout>
    
  )
}

export default StudentPage