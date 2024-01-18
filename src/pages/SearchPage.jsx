import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [temp, setTemp] = useState();
  const [searchholder, setSearchholder] = useState();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
  const [showName, setShowName] = useState();
  const [isAdd, setIsAdd] = useState("none");
  const [isUpdateDelete, setIsUpdateDelete] = useState("");
  const [isUpdateDeleteNameprotect, setIsUpdateDeleteNameprotect] = useState(false);
  const inputSelect = useRef(null);
  const inputText = useRef(null);

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
      setIsUpdateDeleteNameprotect(false)
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
      name: 'Contact',
      selector: row => row.contact,
    },

  ];


  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const result = await axios.get('https://back.orpheuslau.dev/api/students', { withCredentials: true })
      setStudents(await result.data);
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
        await axios.put(`https://back.orpheuslau.dev/api/students/${id}`, data, { withCredentials: true });
        toast.success(`Profile of student "${data.name}" updated successfully`);
        fetchStudents()
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
        inputText.current.value = "";
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
        await axios.post(`https://back.orpheuslau.dev/api/students`, data, { withCredentials: true });
        toast.success(`Profile of new student "${data.name}" added successfully`);
        fetchStudents()
        navigate("/student");
        setShowViewConfirmation(false)
        setData("")
        inputText.current.value = "";
      } catch (error) {
        toast.error(error.message);
      }
    };
  }

  const deleteStudent = async () => {

    if (window.confirm(`Are you sure you want to delete the profile of : "${data.name}"?`)) {
      try {
        id = data._id;
        await axios.delete(`https://back.orpheuslau.dev/api/students/${id}`, data, { withCredentials: true });
        toast.success(`Profile of student "${data.name}" deleted successfully`);
        fetchStudents()
        setShowViewConfirmation(false)
        setShowName("");
        setData("")
        inputText.current.value = "";
      } catch (error) {
        toast.error(error.message);
      }
    }
  };


  function quicksearch(event) {
    console.log(searchholder, temp)
    if (temp !== undefined) {
      console.log(temp)
      const newData = students.filter(row => {
        if (searchholder === "name") {
          return row.name && row.name.toLowerCase().includes(temp.toLowerCase())
        }
        else
          if (searchholder === "classno")
            return row.classno == temp
          else
            if (searchholder === "contact")
              return row.contact == temp
            else
              if (searchholder === "address")
                return row.address && row.address.toLowerCase().includes(temp.toLowerCase())
              else
                if (searchholder === "parentname")
                  return row.parentname && row.parentname.toLowerCase().includes(temp.toLowerCase())
      })
      setStudents(newData)

    }
    else {
      fetchStudents()
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



  function setholder(event) {
    setSearchholder(event.target.value);
    console.log(searchholder)
  }

  return (
    <MainLayout>
      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'><form>
            <div className='text-end'>Filter by
              <select ref={inputSelect} onChange={(e) => setSearchholder(e.target.value)} onMouseDown={fetchStudents}>
                <option>Choose Option</option>
                <option value="name">Name</option>
                <option value="classno">Class No.</option>
                <option value="contact">Contact number</option>
                <option value="address">Address</option>
                <option value="parentname">Parent's name</option>
              </select></div>
            <div className='text-end mt-1'><input ref={inputText} type="text" onChange={(e) =>
              setTemp(e.target.value)
            } />
              <div>
              </div> <input className='mt-1 btn btn-light' type="button" value="Submit" onClick={quicksearch} />
              <input className='btn btn-light mt-1' type="reset" value="Reset" onClick={() => {
                fetchStudents()
                setTemp("")
                setSearchholder("")

              }}></input>
            </div></form>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            <DataTable
              title="Student profile"
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
              <label for="name" className="col-form-label text-danger">* <strong>Class:</strong></label>
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
                <label for="name" className="col-form-label text-danger">* <strong>Student Name:</strong></label>
                <input type="text" className="form-control" value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  } placeholder={data.name} id="name" />
              </div>
              :
              <div className="form-group mt-2">
                <label for="name" className="col-form-label text-primary"># <strong>Student Name:</strong></label>
                <input disabled type="text" className="form-control" value={data.name}
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  } placeholder={data.name} id="name" />
              </div>
            }

            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Class no.:</label>
              <input type="text" className="form-control" value={data.classno}
                onChange={(e) =>
                  setData({ ...data, classno: e.target.value })
                } placeholder={data.classno} id="classno" />
            </div>

            <div className="form-group mt-2">
              <label for="recipient-name" className="col-form-label">Sex:</label>
              <select class="form-select" onChange={(e) =>
                setData({ ...data, sex: e.target.value })
              }>
                <option selected>{data.sex}</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
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
            inputText.current.value = "";
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