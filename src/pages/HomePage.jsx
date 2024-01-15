import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Chart } from "react-google-charts";
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {

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

  const [assesss, setAssesss] = useState([]);
  const [students, setStudents] = useState([]);
  const [score, setScore] = useState([]);
  const navigate = useNavigate();


  const fetchAssesss = async () => {
    try {
      const result = await axios.get('https://api2.orpheuslau.dev/api/assesss')
      setAssesss(await result.data);
      const result2 = await axios.get('https://api2.orpheuslau.dev/api/students')
      setStudents(await result2.data);
    }
    catch {
      navigate('/login')
    }
  }


  useEffect(() => {
    fetchAssesss();
  }, []);

  var temp = [];
  var temp2 = [];
  var temp3 = [];
  var temp4 = [];
  var tmp = 0;
  var satis2_T = 0
  var satis2_F = 0
  var satis2 = []
  var satis3_T = 0
  var satis3_F = 0
  var satis3 = []
  var sex_M = 0
  var sex_F = 0
  var sex = []



  classlist.map((item, key) => { //initiatelize the array value to zero
    temp[item] = ""
  })



  const classscore = (assesss.map((content, index) => {
    classlist.map((classcontent, key) => {
      if (content.studentclassid === classcontent[0]) { //calculate the accumulated socre of each class
        temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])
      }
    })
    classlist.map((item, index) => { //trasnform the array into proper format for google chart
      temp2[index] = [item.toString(), temp[item]]
    })
    temp3 = temp2.filter(element => element)// remove empty element in array, if any
    return temp3
  }));

  const satispage2 = (assesss.map((content, index) => {
    classlist.map((classcontent, key) => {
      if (content.studentclassid === classcontent[0]) { //calculate the accumulated socre of each class
        if (content.p2satis === "true")
          satis2_T = satis2_T + 1
        else
          satis2_F = satis2_F + 1
        //temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])
      }
    })
    satis2 = [["True", satis2_T], ["False", satis2_F]]
    return satis2
  }));


  const satispage3 = (assesss.map((content, index) => {
    classlist.map((classcontent, key) => {
      if (content.studentclassid === classcontent[0]) { //calculate the accumulated socre of each class
        if (content.p3satis === "true")
          satis3_T = satis3_T + 1
        else
          satis3_F = satis3_F + 1
        //temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])
      }
    })
    satis3 = [["True", satis3_T], ["False", satis3_F]]
    return satis3
  }));


  const sexdist = (students.map((content, index) => {
    if (content.sex === "M")
      sex_M = sex_M + 1
    else
      sex_F = sex_F + 1
    //temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])

    sex = [["Male", sex_M], ["Female", sex_F]]
    return sex
  }));


  const data = [["Class", "Total Score"]].concat(temp3)




  const data2 = [["Answer", "frequency"]].concat(satis2)
  const data3 = [["Answer", "frequency"]].concat(satis3)
  const data4 = [["Answer", "frequency"]].concat(sex)

  const data5 = [["Name", "Part 1 score", "Part 2 score", "Part 3 score"]].concat(assesss.map((content, index) => {
    return ([content.studentname + " (" + content.studentclassid + ")", content.page1Total, content.page2Total, content.page3Total])

  }))

  const data1 = [["Name", "Total Assessment score", "Part 1 score", "Part 2 score", "Part 3 score"]].concat(assesss.map((content, index) => {
    return ([content.studentname + " (" + content.studentclassid + ")", content.pageALLTotal, content.page1Total, content.page2Total, content.page3Total])

  }))


  const options1 = {
    title: "Individual student assessment score",

    bubble: { textStyle: { fontSize: 11 } }
  };

  const options2 = {
    title: "In general, the student's emotion and social development is satisfactory ?",
  };

  const options3 = {
    title:
      "In general, the student's physical and artistic development is satisfactory ?"
  };

  const options4 = {
    title:
      "Sex distribution in students"
  };


  const options5 = {
    title: "Assessment score distribution in Part 1, Part 2 and Part 3",
    hAxis: { title: "Part 1 Score" },
    vAxis: { title: "Part 2 Score" },
    bubble: { textStyle: { fontSize: 10 } },
    colorAxis: { colors: ["red", "purple"] },
  };

  const options6 = {
    title: "Total assessment score by class",
    hAxis: { title: "Class" },
    vAxis: { title: "Total Score" },
    bubble: { textStyle: { fontSize: 11 } }

  };




  return (
  
        <Chart
          width={"100%"}
          height={500}
          chartType="BarChart"
          //loader={<div>Loading Chart</div>}
          data={data1}
          options={options1}
          rootProps={{ "data-testid": "6" }}
          chartPackages={["corechart", "controls"]}
          render={({ renderControl, renderChart }) => {
            return (
              <div>
                <div className='row'>{renderControl(() => true)}</div>
                <div className='row'>{renderChart()}</div>

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
        />
        

  )
}

export default HomePage



