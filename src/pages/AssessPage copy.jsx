import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Survey from '../components/SurveyComponent'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

function AssessPage() {

  const [students, setStudents] = useState([]);
  const inputSelect = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const result = await axios.get('api/students')
      setStudents(await result.data);
    }
    catch {
      navigate('/login')

    }
  }


  function classsearch(event) {


    if (event.target.value !== 'All') {
      const newData = students.filter(row => {

        return row.classid && row.classid.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setStudents(newData);

    }
    else {
      fetchStudents()
    }

  }


  return (
    <MainLayout>

      <h5><div className="mt-3">Student Assessment form</div></h5>
      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-2'>
            <div className='text-start mb-3'>Class :
              <select ref={inputSelect} onChange={classsearch} onMouseDown={fetchStudents} on={() => console.log("clicked")}>
                <option value="All">All</option>
                <option value="1A">1A</option>
                <option value="4C">4C</option>
                <option value="4A">4A</option>
              </select>
            </div>
          </div>

          <div className='col-sm-6'>
            <div className='text-start mb-3'>Student name and class no. :
              <select ref={inputSelect}>

                         
             {students.map((student, key)=>
             
             <option value="{student._id}">{student.name} ({student.classno})</option>)}
             
                                     
                         
             
              </select>
            </div>
          </div>

          {/*  reserved!     <div className='col-sm-4'>
            <div className='text-end'><input ref={inputText} type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
  </div>*/}
        </div>
      </div>
      <Survey />
    </MainLayout>
  )
}

export default AssessPage