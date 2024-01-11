import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Chart } from "react-google-charts";
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function AnalysisPage() {

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

  const [students, setStudents] = useState([]);
  const [score, setScore] = useState([]);
  const navigate = useNavigate();


  const fetchStudents = async () => {
    try {
      const result = await axios.get('api/assesss')
      setStudents(await result.data);
    }
    catch {
      navigate('/login')
    }
  }


  useEffect(() => {
    fetchStudents();
  }, []);

  var temp = [];
  var temp2 = [];
  var temp3 = [];
  var temp4=[];
  var tmp = 0;
  classlist.map((item, key) => { //initiatelize the array value to zero
    temp[item] = ""
  })
console.log(temp)
  

  const classscore = (students.map((content, index) => {
    classlist.map((classcontent, key) => {
      if (content.studentclassid === classcontent[0])
       { temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])
console.log(classcontent[0])       
      }
//console.log(classcontent[0],temp[classcontent[0]])

    })
    
    classlist.map((item, index)=>{
           temp2[index] = [item.toString(), temp[item]]
    }
    )
    
    temp3 = temp2.filter(element => element)
  

  

    return temp3
  }));



  const data = [["Satisfactory", "Class"]].concat(students.map((content, index) => {
    return ([content.vfeature[0], classscore])
  }))

  const data3 = [["Class", "Total Score"]].concat(temp3)
  
console.log(data3)


  const data2 = [["Name", "Total score", "Part 1 score", "Part 2 score", "Part 3 score"]].concat(students.map((content, index) => {
    return ([content.studentname, content.pageALLTotal, content.page1Total, content.page2Total, content.page3Total])

  }))

  //console.log(data2)

  const options = {
    title: "Correlation between life expectancy, fertility rate " +
      "and population of some world countries (2010)",
    hAxis: { title: "Total Score" },
    vAxis: { title: "Class" },
    bubble: { textStyle: { fontSize: 11 } }

  };

  const options2 = {
    title:

      "Correlation between life expectancy, fertility rate " +
      "and population of some world countries (2010)",
    hAxis: { title: "Score" },
    vAxis: { title: "Name" },
    bubble: { textStyle: { fontSize: 11 } }

  };


  //console.log(data)

  return (
    <MainLayout >
      <div className="container mt-3">
        <div className="row col-12 align-items-start">
          <Chart
            width={"100%"}
            height={500}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={data2}
            rootProps={{ "data-testid": "6" }}
            chartPackages={["corechart", "controls"]}
            render={({ renderControl, renderChart }) => {
              return (
                <div style={{ display: "flex" }}>
                  <div style={{ width: "25%" }}>{renderControl(() => true)}</div>
                  <div style={{ width: "75%" }}>{renderChart()}</div>
                </div>
              );
            }}
            controls={[
              {
                controlType: "StringFilter",
                options: {
                  filterColumnIndex: 0,
                  matchType: "any", // 'prefix' | 'exact',
                  ui: {
                    label: "Search by name",
                  },
                },
              },
              {
                controlType: "NumberRangeFilter",
                controlID: "score-filter",
                options: {
                  filterColumnIndex: 1,
                  ui: {
                    labelStacking: "vertical",
                    label: "Total Score Selection:",
                    allowTyping: false,
                    allowMultiple: false,
                  },
                },
              },
            ]}
          /></div>
        <div className="row col-12 align-items-start">
          <div className='col-4'>
            <Chart
              chartType="BarChart"
              data={data3}
              options={options}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className='col-4'>
            <Chart
              chartType="PieChart"
              data={data3}
              options={options}
              width={"100%"}
              height={"100%"}
            />
          </div>



        </div></div>
    </MainLayout>
  )
}

export default AnalysisPage