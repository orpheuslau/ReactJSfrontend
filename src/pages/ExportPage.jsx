import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { ComponentToPrint } from '../components/ComponentToPrint';
//import { Auth } from '../components/Auth';
//import { useReactToPrint } from 'react-to-print';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
//import { click } from '@testing-library/user-event/dist/click';
//import ViewProfile from '../components/ViewProfile';
import { Button, Modal } from 'react-bootstrap';
import Assessment from '../components/SurveyComponent'
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';




const ExportPage = () => {

  const [students, setStudents] = useState([]);
  const [assesss, setAssesss] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
  const [showName, setShowName] = useState();
  const [isAdd, setIsAdd] = useState("none");
  const [isUpdateDelete, setIsUpdateDelete] = useState("");
  const inputSelect = useRef(null);
  // reserved! const inputText = useRef(null);

  const class1digit = ["1", "2", "3", "4"];
  const class2digit = ["A", "B", "C", "D", "E"];
  var classlist = [];
  var k = 1;
  class1digit.map((d1, index) => {
    class2digit.map((d2, index2) => {
      classlist[k] = [d1 + class2digit[index2]]
      k += 1
    })
  })


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
      name: 'Image',
      Text: "Image",
      wiith: 150,
      cell: (record) => {
        return (
          <img
            width="50%" height="auto" src={record.image}></img>
        );
      },
    },
    {
      name: "Report",
      key: "action",
      text: "Action",
      className: "action",
      width: 200,
      align: "left",
      sortable: false,

      cell: (record) => {
        return (
          <button className="btn btn-sm bg-secondary text-white" onClick={() =>
            handleExport(record._id)
          }>Export</button>
        );
      },
    },
  ];


  function handleExport(stdid) {
    const wb = XLSX.utils.book_new();

    const selAssesss = assesss.filter(assess => assess.studentid === stdid)
    if (selAssesss == "")
      return toast.warning(`No assessment record found`)
    const result = selAssesss.map(row => ({
      class: row.studentclassid,
      name: row.studentname,
      class_no: row.studentclassno,
      assessment_date: row.assessmentdate,
      p1score1: row.p1score1,
      p1score2: row.p1score2,
      p1score3: row.p1score3,
      p1score4: row.p1score4,
      p1score5: row.p1score5,
      page1Total: row.page1Total,
      p2score1: row.p2score1,
      p2score2: row.p2score2,
      p2score3: row.p2score3,
      page2Total: row.page2Total,
      p2satisfactory: row.p2satis,
      p3score1: row.p3score1,
      p3score2: row.p3score2,
      p3score3: row.p3score3,
      page3Total: row.page3Total,
      pageALLTotal: row.pageALLTotal,
      p3satisfactory: row.p3satis,
      optionalcomment: row.testimonial,
      suppInfo: row.suppInfo,
      virtue_Value: row.vfeature[0] + "," + row.vfeature[1] + "," + row.vfeature[2]
    }))


    const ws = XLSX.utils.json_to_sheet(result);
    //console.log(assesss);
    //console.log(temp);

    XLSX.utils.book_append_sheet(wb, ws, "Assessment");
    XLSX.writeFile(wb, `${result[0].name}_export.xlsx`);
    toast.success("Assessment export successful")

  };

  /* reserved
  createTheme('solarized', {
    text: {
      primary: '#FF8b66',
      secondary: '#FF8b66',
    },
    background: {
      default: '#FFFFEE',
    },
    context: {
      background: '#FFFFFF',
      text: '#FFFFFF',
    },
    divider: {
      default: '#FFFFFF',
    },
    action: {
      button: 'rgba(0,1,0,.54)',
      hover: 'rgba(55,1,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },);
*/


  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const result = await axios.get('https://api2.orpheuslau.dev/api/students')
      setStudents(await result.data);
      const result2 = await axios.get('hhttps://api2.orpheuslau.dev/api/assesss')
      setAssesss(await result2.data);
      //setAssesss(result2.data.filter(assess => assess.studentid === "658fa3389d27312da355c790"))
    }
    catch (error) {
      navigate('/login')
    }
  }


  useEffect(() => {
    fetchStudents();
  }, []);




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


      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'>

            <div className='text-end'>Filter by Class :

              <select ref={inputSelect} onChange={classsearch} onMouseDown={fetchStudents}>

                <option value="All">All</option>
                {classlist.map((content, key) =>
                  <option value={content}>{content}</option>
                )}



              </select>

            </div>



          </div>

          {/*  reserved!     <div className='col-sm-4'>
            <div className='text-end'><input ref={inputText} type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
  </div>*/}
        </div>




        <div className='row'>
          <div className='col-lg-8'>
            <DataTable
              title="Export assessment"
              direction="auto"
              pagination
              responsive
              columns={columns}
              data={students}
              defaultSortFieldId={1}
              fixedHeader
              fixedHeaderScrollHeight="800px"
              highlightOnHover
              pointerOnHover
              //contextActions={contextActions}
              //onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              // selectableRows
              selectableRowsHighlight
              selectableRowsSingle
              striped
            />
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="row col-8 justify-content-end">
          <div className="col-2 text-white btn btn-sm bg-success" onClick={() => {
            setShowViewConfirmation(true)
            setShowName("a new entry");
            setIsAdd("")
            setIsUpdateDelete("none")
          }
          }>
            Add Profile
          </div>
        </div>
        </div>*/}



    </MainLayout>




  )
}

export default ExportPage