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
import { Button, Dropdown, Modal } from 'react-bootstrap';



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
  const [isAdd, setIsAdd] = useState("none");
  const [isUpdateDelete, setIsUpdateDelete] = useState("");

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
      setShowName(selectedRows[0].name);
      setIsAdd("none");
      setIsUpdateDelete("")
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

    if (!data.name || !data.classid) {
      if (!data.name)
        toast.error("Student name is requried")
      if (!data.classid)
        toast.error("Class is requried")
    }
    else {
      try {
        id = data._id;
        await axios.put(`api/students/${id}`, data);
        toast.success(`Profile of student "${data.name}" updated successfully`);
        fetchStudents()//navigate("/student");
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
      } catch (error) {
        toast.error(error.message);
      }
    }
  };


  const addStudent = async () => {
    if (!data.name || !data.classid) {
      if (!data.name)
        toast.error("Student name is requried")
      if (!data.classid)
        toast.error("Class is requried")
    }
    else {
      setToggleCleared(!toggleCleared);
      try {

        await axios.post(`api/students`, data);
        toast.success(`Profile of new student "${data.name}" added successfully`);
        fetchStudents()//navigate("/student");
        setShowViewConfirmation(false)
        setData("")
      } catch (error) {
        toast.error(error.message);
      }
    };
  }

  const deleteStudent = async () => {

    if (window.confirm(`Are you sure you want to delete the profile of : "${data.name}"?`)) {


      try {
        id = data._id;
        await axios.delete(`api/students/${id}`, data);
        toast.success(`Profile of student "${data.name}" deleted successfully`);
        fetchStudents()//navigate("/student");
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

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


  function classsearch(event) {

    
    console.log(students)
    console.log(event.target.value)
    
    if (event.target.value !== '') {
      const newData = students.filter(row => {
        //return row.name.includes(event.target.value)
        return row.classid && row.classid.toLowerCase().includes(event.target.value.toLowerCase())
      })
     
      setStudents(newData);
      console.log(students)
        }
    else {
      fetchStudents()
    }
   // event.target.value = "All"
  }




  return (



    <MainLayout>


      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-4'>

          <div>

<select onChange={classsearch}>

  <option value="1A">Fruit</option>

  <option value="4C">Vegetable</option>

  <option value="4A">Meat</option>

</select>

</div>



            {/*}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" eventKey="1A" onSelect={classsearch('1A')}>Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
  </Dropdown>*/}
          </div>

          <div className='col-sm-4'>
            <div className='text-end'><input type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
          </div>
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

      <div className="container">
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
      </div>




      <Modal show={showViewConfirmation} onHide={!showViewConfirmation} backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>Student Profile of {showName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>
            <div className="form-group">
              <label for="recipient-name" className="col-form-label">Image:</label>
              <img className="card-img-top" src={data.image} />
              <input type="text" className="form-control" value={data.image}
                onChange={(e) =>
                  setData({ ...data, image: e.target.value })
                } placeholder={data.image} id="image" />

            </div>

            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">* <strong>Class :</strong></label>
              <input type="text" className="form-control" value={data.classid}
                onChange={(e) =>
                  setData({ ...data, classid: e.target.value })
                } placeholder={data.classid} id="class" reqiuired />
            </div>


            <div className="form-group mt-2">
              <label for="name" className="col-form-label">* <strong>Student Name:</strong></label>
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
            <div className="text-danger mt-5"><small>* requried item</small></div>
          </form>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={() => {
            setShowViewConfirmation(false)
            fetchStudents()
            setData("")
            setSelectedRows("")
          }
          }>
            Cancel
          </Button>
          <Button variant="primary" style={{ display: isUpdateDelete }} onClick={() => updateStudent()}>
            Update
          </Button>
          <Button variant="danger" style={{ display: isUpdateDelete }} onClick={() => deleteStudent()}>
            Delete
          </Button>

          <Button variant="success" style={{ display: isAdd }} onClick={() => addStudent()}>
            Add
          </Button>


        </Modal.Footer>
      </Modal>

    </MainLayout>




  )
}

export default StudentPage