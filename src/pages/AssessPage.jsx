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



function AssessPage() {

  const [students, setStudents] = useState([]);
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

  let { id } = useParams();

  const handleRowSelected = React.useCallback(state => {

    setSelectedRows(state.selectedRows);

  }, []);


  const contextActions = React.useMemo(() => {
    const handleView = () => {


      setToggleCleared(!toggleCleared);
      setData(selectedRows[0]);
      setShowViewConfirmation(true);
      setShowName(selectedRows[0].name);
      setIsAdd("none");
      setIsUpdateDelete("")
    };

    return (
      <input className='btn btn-danger' type="button" value="Assess" key="view" onClick={() => handleView()
      } />

    );
  }, [data, selectedRows, toggleCleared]);


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
      key: "action",
      text: "Action",
      className: "action",
      width: 200,
      align: "left",
      sortable: false,
      cell: (record) => {
        return (


          <Link to={`/report/${record._id}`}>Assessment record</Link>


        );
      },
    },

  ];


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
      const result = await axios.get('https://www.orpheuslau.dev/api/students')
      setStudents(await result.data);
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
              title="Assessment"
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
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              selectableRows
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




      <Modal className="modal-lg" show={showViewConfirmation} onHide={!showViewConfirmation} backdrop="static"
        keyboard={false}>

        <Modal.Body>
          {/* <div className="row col-12 mb-4">

            <div className="form-group col-4">
              <label for="recipient-name" className="col-form-label text-muted">Student image:</label>
              <img className="card-img-top" src={data.image} />
            </div>

            <div className="form-group col-4">
              <label for="recipient-name" className="col-form-label text-muted">Class :</label>
              <input type="text" className="mb-4 form-control" placeholder={data.classid} id="class" readOnly />

              <label for="name" className="col-form-label text-muted">Student Name:</label>
              <input type="text" className="form-control" placeholder={data.name} id="name" readOnly />


            </div>

            <div className="form-group col-4">
              <label for="recipient-name" className="col-form-label text-muted">Class no.:</label>
              <input type="text" className="form-control" placeholder={data.classno} id="classno" readOnly />
            </div>

        </div>*/}
          <Assessment
            name={data.name}
            classno={data.classno}
            classid={data.classid}
            studentid={data._id}
            username={localStorage.getItem("username")}

          />
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={() => {
            setShowViewConfirmation(false)
            fetchStudents()
            setData("")
            setSelectedRows("")
            inputSelect.current.value = "All";
          }
          }>
            Exit
          </Button>



        </Modal.Footer>
      </Modal>

    </MainLayout>




  )
}

export default AssessPage