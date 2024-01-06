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





  // const [data, setData] = React.useState(DataTable);


  let { postId } = useParams();
  // const { id } = props; 

  const [assesss, setAssesss] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
  const [showName, setShowName] = useState();
  const [isAdd, setIsAdd] = useState("none");
  const [isUpdateDelete, setIsUpdateDelete] = useState("");
  const inputSelect = useRef(null);



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

  const navigate = useNavigate();

  const fetchAssesss = async (postId) => {


    try {
        const result = await axios.get('/api/assesss')
        setStudents(await result.data)
        setAssesss(result.data.filter(assess => assess.studentid === postId))

    }
    catch {


    }
  }




  useState(async () => {

    fetchAssesss(postId)

  },);

  return (



    <MainLayout>
      <button className='btn' onClick={() => console.log(assesss, students)}>wtf</button>

      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'>

            <DataTable
              title="Student's profile"
              direction="auto"
              pagination
              responsive
              columns={columns}
              data={assesss}
              defaultSortFieldId={3}
              fixedHeader
              fixedHeaderScrollHeight="800px"
              highlightOnHover
              pointerOnHover
              selectableRows
              selectableRowsHighlight
              selectableRowsSingle
              striped
            />
          </div>
        </div>
      </div>

    </MainLayout>

  )
}

export default ReportPage