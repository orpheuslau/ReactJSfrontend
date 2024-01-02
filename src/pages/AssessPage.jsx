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
      <Survey></Survey>
    <h5><div className="mt-3">Student Assessment form</div></h5>

    <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'>

            <div className='text-start'>Filter by Class :

              <select ref={inputSelect} onChange={classsearch} onMouseDown={fetchStudents} on={() => console.log("clicked")}>

                <option value="All">All</option>
                <option value="1A">1A</option>

                <option value="4C">4C</option>

                <option value="4A">4A</option>


              </select>

            </div>



          </div>

          {/*  reserved!     <div className='col-sm-4'>
            <div className='text-end'><input ref={inputText} type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
  </div>*/}
        </div>
        </div>
    </MainLayout>
  )
}

export default AssessPage