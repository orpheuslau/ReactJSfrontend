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
  const [isAuth, setISauth] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState([0]);
  const [records, setRecords] = useState(students);


  const columns = [
    {
      name: 'Class',
      selector: row => row.classid,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Class no',
      selector: row => row.classno,
      sortable: true,
    },
    {
      name: 'Parent name',
      selector: row => row.parentname,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
    },
    {
      name: 'Address',
      selector: row => row.address,
      grow: 2
    },


  ];



  const navigate = useNavigate();

  //let s1 = []
  //students.map((ss,index)=> s1[index]=ss)
  //console.log(s1[1], s1[3])




  const fetchStudents = async () => {
    try {
      const result = await axios.get('api/students')
      setStudents(await result.data);

      setISloading(false);

    }
    catch {
      navigate('/login')

    }
  }


  useEffect(() => {
    fetchStudents();
  }, []);



  function quicksearch(event) {
    if (event.target.value !=='')
    {
       const newData = students.filter(row => {
        return row.name.includes(event.target.value)
      })
      setStudents(newData)
    }
        else
        {console.log("wtf")
        fetchStudents()
  }
    }



  return (

    <MainLayout>
      <div className="container mt-3" >
      <div className='col-lg-8'>
        <div className='text-end'>Search Student's name<input type="text" onChange={quicksearch} /></div>
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            <DataTable
              title="Student's profile"
              direction="auto"
              pagination
              responsive
              columns={columns}
              data={students}
              defaultSortFieldId={1}
              fixedHeader
              fixedHeaderScrollHeight="800px"
            />
          </div>
        </div>
      </div>
    </MainLayout>


  )
}

export default StudentPage