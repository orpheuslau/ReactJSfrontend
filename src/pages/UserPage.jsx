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
import { Button, Dropdown, Modal } from 'react-bootstrap';




function UserPage() {

  const [users, setUsers] = useState([]);
  const [Allusers, setAllUsers] = useState([]);
  const [allusername, setAllusername] = useState([])
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
  const [showName, setShowName] = useState();
  const [isAdd, setIsAdd] = useState("none");
  const [isUpdateDelete, setIsUpdateDelete] = useState("");
  const [isUpdateDeleteNameprotect, setIsUpdateDeleteNameprotect] = useState(false);
  const inputSelect = useRef(null);
  // reserved! const inputText = useRef(null);1

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

  const userrole = ["Admin", "User"]



  let { id } = useParams();

  const handleRowSelected = React.useCallback(state => {

    setSelectedRows(state.selectedRows);

  }, []);


  const contextActions = React.useMemo(() => {
    const handleView = () => {


      setToggleCleared(!toggleCleared);


      selectedRows[0].password = "" //make sure new password will be entered, or user will be prompted
      setData(selectedRows[0]);
      setShowViewConfirmation(true);
      setShowName(selectedRows[0].name);
      setIsAdd("none");
      setIsUpdateDelete("")
      setIsUpdateDeleteNameprotect(false)
    };

    return (
      <input className='btn btn-info' type="button" value="View profile" key="view" onClick={() => handleView()
      } />

    );
  }, [data, selectedRows, toggleCleared]);


  const columns = [

    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'User name',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Class teacher',
      selector: row => row.classid,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
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
      const result = await axios.get('api/users')
      setUsers(await result.data);
      setAllusername(await result.data.username);

    }
    catch {
      navigate('/login')

    }
  }


  useEffect(() => {
    fetchStudents();
  }, []);


  const updateStudent = async () => {

    if (!data.name || !data.classid || !data.password || !data.role) {
      if (!data.name)
        toast.error("User name is requried")
      if (!data.classid)
        toast.error("Class is requried")
      if (!data.password)
        toast.error("Password is requried")
      if (!data.role)
        toast.error("Role is requried")
    }
    else {
      try {
        id = data._id;
        await axios.put(`api/users/${id}`, data);
        toast.success(`Profile of student "${data.name}" updated successfully`);
        fetchStudents()
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
        // inputSelect.current.value = "All";
        // reserved! inputText.current.value = "";
      } catch (error) {
        toast.error(error.message);
      }
    }
  };


  const addStudent = async () => {
    if (!data.name || !data.classid || !data.password || !data.role) {
      if (!data.name)
        toast.error("User name is requried")
      if (!data.classid)
        toast.error("Class is requried")
      if (!data.password)
        toast.error("Password is requried")
      if (!data.role)
        toast.error("Role is requried")
    }
    else {
      setToggleCleared(!toggleCleared);
      try {

        await axios.post(`api/users`, data);
        toast.success(`Profile of student "${data.name}" added successfully`);
        fetchStudents()
        // navigate("/student");
        setShowViewConfirmation(false)
        setData("")
        // inputSelect.current.value = "All";
        // reserved!  inputText.current.value = "";
      } catch (error) {
        toast.error(error.message);
      }
    };
  }

  const deleteStudent = async () => {

    if (window.confirm(`Are you sure you want to delete the profile of : "${data.name}"?`)) {


      try {
        id = data._id;
        await axios.delete(`api/users/${id}`, data);
        toast.success(`Profile of student "${data.name}" deleted successfully`);
        fetchStudents()
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
        //inputSelect.current.value = "All";
        // reserved!  inputText.current.value = "";
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  /* Reserved function
  function quicksearch(event) {
    if (event.target.value !== '') {
      const newData = users.filter(row => {
        
        return row.name && row.name.toLowerCase().includes(event.target.value.toLowerCase())
      })
      setUsers(newData)

    }
    else {
      fetchStudents()
    }
  }*/



  const checkname = () => {

    if (!data.username)
      toast.error("Login name is requried")
    else
      try {
        var isAdd = false
        {
          users.map((content, index) => {
            if (data.username === content.username) {
              throw new Error('repeated login name');
            }
            else
              isAdd = true;
          }
          )
        }
      }
      catch (error) {
        toast.error("login name has been used!")
        return
      }
    if (isAdd)
      addStudent()
  }


  return (



    <MainLayout>


      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'>



          </div>

          {/*  reserved!     <div className='col-sm-4'>
            <div className='text-end'><input ref={inputText} type="text" placeholder="Filter by Student's name" onChange={quicksearch} /></div>
  </div>*/}
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            <DataTable
              title="User profile"
              direction="auto"
              pagination
              responsive
              columns={columns}
              data={users}
              defaultSortFieldId={3}
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

      <div className="container">
        <div className="row col-8 justify-content-end">
          <div className="col-2 text-white btn btn-sm bg-success" onClick={() => {
            setShowViewConfirmation(true)
            setShowName("new teacher");
            setIsAdd("")
            setIsUpdateDelete("none")
            setIsUpdateDeleteNameprotect(true)
          }
          }>
            Add User
          </div>
        </div>
      </div>




      <Modal show={showViewConfirmation} onHide={!showViewConfirmation} backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>User Profile of {showName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>
            {isUpdateDeleteNameprotect
              ?
              <div className="form-group mt-2">
                <label for="username" className="col-form-label text-danger">* <strong>Login Name:</strong></label>
                <input type="text" className="form-control" value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })

                  } placeholder={data.username} id="username" />
              </div>
              :

              <div className="form-group mt-2">
                <label for="username" className="col-form-label text-primary"># <strong>Login Name:</strong></label>
                <input disabled type="text" className="form-control" value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })

                  } placeholder={data.username} id="username" />
              </div>
            }



            <div className="form-group mt-2">
              <label for="name" className="col-form-label text-danger">* <strong>Class teacher:</strong></label>
              <select class="form-select" onChange={(e) =>
                setData({ ...data, classid: e.target.value })
              }>
                <option selected>{data.classid}</option>
                {classlist.map((content, key) =>
                  <option value={content}>{content}</option>
                )}
              </select>
            </div>



            {isUpdateDeleteNameprotect
              ?
              <div className="form-group mt-2">
                <label for="name" className="col-form-label text-danger">* <strong>User Name:</strong></label>
                <input type="text" className="form-control" value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  } placeholder={data.name} id="name" />
              </div>

              :
              <div className="form-group mt-2">
                <label for="name" className="col-form-label text-primary"># <strong>User Name:</strong></label>
                <input disabled type="text" className="form-control" value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  } placeholder={data.name} id="name" />
              </div>
            }

            {isUpdateDeleteNameprotect
              ?
              <div className="form-group mt-2">
                <label for="recipient-name" className="col-form-label text-danger">* <strong>Password:</strong></label>
                <input type="text" className="form-control" value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  } placeholder={data.password} id="password" />
              </div>
              :

              <div className="form-group mt-2">
                <label for="recipient-name" className="col-form-label text-danger">* <strong>New Password:</strong></label>
                <input type="text" className="form-control"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  } id="password" />
              </div>
            }

            {/*  <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label text-danger">* <strong>Role:</strong></label>
              <input type="text" className="form-control" value={data.role}
                onChange={(e) =>
                  setData({ ...data, role: e.target.value })
                } placeholder={data.role} id="role" />
              </div>*/}


            {isUpdateDeleteNameprotect
              ?
            <div className="form-group mt-2">
                <label for="name" className="col-form-label text-danger">* <strong>Role:</strong></label>
                <select class="form-select" onChange={(e) =>
                  setData({ ...data, role: e.target.value })
                }>
                  <option selected>{data.role}</option>
                  {userrole.map((content, key) =>
                    <option value={content}>{content}</option>
                  )}
                </select>
              </div>
              :
              <div className="form-group mt-2">
              <label for="name" className="col-form-label text-primary"># <strong>Role:</strong></label>
              <select disabled class="form-select" onChange={(e) =>
                setData({ ...data, role: e.target.value })
              }>
                <option selected>{data.role}</option>
                {userrole.map((content, key) =>
                  <option value={content}>{content}</option>
                )}
              </select>
            </div>
}

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
            {isUpdateDeleteNameprotect
              ?
              <div></div>
              :
              <div className="text-primary"><small># item cannot change</small></div>
            }
          </form>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={() => {
            setShowViewConfirmation(false)
            fetchStudents()
            setData("")
            setSelectedRows("")
            //inputSelect.current.value = "All";
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

          <Button variant="success" style={{ display: isAdd }} onClick={() =>
            checkname()
          }>
            Add
          </Button>


        </Modal.Footer>
      </Modal>

    </MainLayout>




  )
}

export default UserPage