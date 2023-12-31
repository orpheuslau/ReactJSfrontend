import React, { useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { Auth } from '../components/Auth';
import { useReactToPrint } from 'react-to-print';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import { click } from '@testing-library/user-event/dist/click';
import ViewProfile from '../components/ViewProfile';
import { Button, Modal } from 'react-bootstrap';



function StudentPage() {

  const [students, setStudents] = useState([]);
  const [isLoading, setISloading] = useState(false);
  const [isAuth, setISauth] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState([0]);
  const [records, setRecords] = useState(students);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
  const [showName, setShowName] = useState();

  let titlename = ""
  let { id } = useParams();

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);

  }, []);




  const contextActions = React.useMemo(() => {
    const handleView = () => {

      /*if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
        setToggleCleared(!toggleCleared);
        setData(selectedRows);
      }*/
      setToggleCleared(!toggleCleared);
      setData(selectedRows[0]);
      setShowViewConfirmation(true);
      setShowName(selectedRows[0].name)




    };

    return (
      <input className='btn btn-info' type="button" value="View profile" key="view" onClick={() => handleView()
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
      name: 'Parent name',
      selector: row => row.parentname,
    },
    {
      name: 'Contact',
      selector: row => row.contact,
    },

  ];


  createTheme('solarized', {
    text: {
      //primary: '#FF8b66',
      // secondary: '#FF8b66',
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



  const navigate = useNavigate();

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


  const updateStudent = async () => {
    //e.preventDefault();
    try {
      id = data._id;
      await axios.put(`api/students/${id}`, data);
      toast.success("Student profile updated successfully");
      fetchStudents()//navigate("/student");
      setShowViewConfirmation(false)
    } catch (error) {
      toast.error(error.message);
    }
  };


  function editClick() {
    console.log(selectedRows[0].name);
    setShowViewConfirmation(true)

    return
  }

  function quicksearch(event) {
    if (event.target.value !== '') {
      const newData = students.filter(row => {
        //return row.name.includes(event.target.value)
        return row.name && row.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setStudents(newData)
    }
    else {
      fetchStudents()
    }
  }


  return (



    <MainLayout>


      <div className="container mt-3" >
        <div className='col-lg-8'>
          <div className='text-end'><input type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
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
              defaultSortFieldId={3}
              fixedHeader
              fixedHeaderScrollHeight="800px"
              //theme="solarized"
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

      <Modal show={showViewConfirmation} onHide={!showViewConfirmation} backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>Student Profile of {showName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={updateStudent}>
            <div className="form-group">
              <label for="recipient-name" className="col-form-label">Image:</label>
              <img className="card-img-top" src={data.image} />
            </div>

            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Class:</label>
              <input type="text" className="form-control" value={data.classid}
                onChange={(e) =>
                  setData({ ...data, classid: e.target.value })
                } placeholder={data.class} id="class" />
            </div>
            <div className="form-group mt-2">
              <label for="name" className="col-form-label">Student Name:</label>
              <input type="text" className="form-control" value={data.name}
                onChange={(e) =>
                  setData({ ...data, name: e.target.value })
                } placeholder={data.name} id="name" />
            </div>
            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Class no.:</label>
              <input type="text" className="form-control" value={data.classno}
                onChange={(e) =>
                  setData({ ...data, classno: e.target.value })
                } placeholder={data.classno} id="classno" />
            </div>
            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Parent's Name:</label>
              <input type="text" className="form-control" value={data.parentname}
                onChange={(e) =>
                  setData({ ...data, parentname: e.target.value })
                } placeholder={data.parentname} id="parentname" />
            </div>
            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Contact number:</label>
              <input type="text" className="form-control" value={data.contact}
                onChange={(e) =>
                  setData({ ...data, contact: e.target.value })
                } placeholder={data.contact} id="contact" />
            </div>
            <div className="form-group mt-2">
              <label for="message-text" className="col-form-label">Address:</label>
              <input type="textarea" className="form-control" value={data.address}
                onChange={(e) =>
                  setData({ ...data, address: e.target.value })
                } placeholder={data.address} id="address" />
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => updateStudent()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </MainLayout>



  )
}

export default StudentPage