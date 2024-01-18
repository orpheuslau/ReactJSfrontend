import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import Assessment from '../components/SurveyComponentEdit'


function ReportPage(props) {

  let { stdID } = useParams();
  const [assesss, setAssesss] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(DataTable);
  const [showViewConfirmation, setShowViewConfirmation] = useState(false);
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

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);


  const contextActions = React.useMemo(() => {
    const handleView = () => {
      setToggleCleared(!toggleCleared);
      setData(selectedRows[0]);
      setShowViewConfirmation(true);
      setIsAdd("none");
      setIsUpdateDelete("")
    };

    return (
      <input className='btn btn-danger' type="button" value="View" key="view" onClick={() => handleView()
      } />

    );
  }, [data, selectedRows, toggleCleared]);


  const fetchAssesss = async (stdID) => {

    try {
      const result = await axios.get('https://back.orpheuslau.dev/api/assesss', { withCredentials: true })
      setStudents(await result.data)
      setAssesss(result.data.filter(assess => assess.studentid === stdID))
    }
    catch {
    }

  }

  useState(async () => {
    fetchAssesss(stdID)
  },);


  return (
    <MainLayout>
      <div className="container mt-3" >
        <div className="row">
          <div className='col-sm-8'>
            <DataTable
              title="Assessment -> Assessment record"
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
      <Modal className="modal-lg" show={showViewConfirmation} onHide={!showViewConfirmation} backdrop="static"
        keyboard={false}>
        <Modal.Body>
          <Assessment
            AssessResult={data}
            username={localStorage.getItem("username")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowViewConfirmation(false)
            fetchAssesss(stdID)
            setData("")
            setSelectedRows("")
          }
          }>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row col-8 justify-content-start">
          <div className="col-2 text-white btn btn-sm bg-success" onClick={() => {
            navigate('/assessment')
          }
          }>
            Back
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default ReportPage