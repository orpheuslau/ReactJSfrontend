import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';

function ReportPage(props) {
    //const { state } = useParams();
   

   
    const [assesss, setAssesss] = useState([]);
   
   // const [data, setData] = React.useState(DataTable);

    
      
    let { postId } = useParams();
   // const { id } = props; 
   console.log(postId)
    

    const columns = [
      {
        name: 'Name',
        selector: row => row.studentname,
        sortable: true,
      },
      {
        name: 'Class',
        selector: row => row.studentclassid,
        sortable: true,
      },
      {
        name: 'Class no',
        selector: row => row.studentclassno,
        sortable: true,
      },
      {
        name: 'Assessment Date',
        selector: row => row.assessmentdate,
        sortable: true,
       },
      
  
    ];

   

    const fetchAssesss = async (postId) => {
      try {
        console.log(`ID: ${postId}`)
        const result = await axios.post("/api/assesss", {studentid: postId})
        toast.success(`Profile of student updated successfully`);
        setAssesss(await result.data)

               }
      catch {
      
  
      }
    }


  /*
   
    useEffect(() => {
          fetchAssesss(postId) 
      }, []);
*/
  

  return (
 
 <div><button onClick={fetchAssesss("6592bb6ab5e289e82fe9d2df")}>click me</button></div>
    
    
             
  )
}

export default ReportPage