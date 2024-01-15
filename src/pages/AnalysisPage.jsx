import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Chart } from "react-google-charts";
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MdNoFood } from 'react-icons/md';

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

  const [assesss, setAssesss] = useState([]);
  const [students, setStudents] = useState([]);
  const [score, setScore] = useState([]);
  const navigate = useNavigate();


  const fetchAssesss = async () => {
    try {
      const result = await axios.get('/api/assesss')
      setAssesss(await result.data);
      const result2 = await axios.get('/api/students')
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
  var scorehighest = 0;
  var scorehighestname = "";
  var scoreTotal = [0];
  var noofassess = 0;
  var scoreavg = [0];
  var vcount = [0];
  var vcountFinal = [0];

  var vlist = ["Honesty", "Respect", "Caring", "Patience", "Friendship", "Initiative"]

  {/*
  vlist[0] = "Honesty"
  vlist[1] = "Respect"
  vlist[2] = "Caring"
  vlist[3] = "Patience"
  vlist[4] = "Friendship"
vlist[5] = "Initiative"*/}
  



const scorehigh = (assesss.map((item, index)=>{
  if (item.pageALLTotal>scorehighest)
  {
    scorehighest = item.pageALLTotal
    scorehighestname = item.studentname+"("+item.studentclassid+")"
  }
}))


  vlist.map((content, index) => {
    vcount[content] = 0; //initiatelize the array value to zero, or will encounter NaN error
    
  })


  scoreTotal["part1"] = 0 //initiatelize the array value to zero, or will encounter NaN error
  scoreTotal["part2"] = 0
  scoreTotal["part3"] = 0
  scoreTotal["total"] = 0

  const scoresum = (assesss.map((content, index) => {
    scoreTotal["part1"] = Number(scoreTotal["part1"]) + Number(content.page1Total)
    scoreTotal["part2"] = Number(scoreTotal["part2"]) + Number(content.page2Total)
    scoreTotal["part3"] = Number(scoreTotal["part3"]) + Number(content.page3Total)
    scoreTotal["total"] = Number(scoreTotal["total"]) + Number(content.pageALLTotal)
    noofassess = noofassess + 1
    scoreavg["part1"] = parseInt(scoreTotal["part1"] / noofassess /5) 
    scoreavg["part2"] = parseInt(scoreTotal["part2"] / noofassess/3)
    scoreavg["part3"] = parseInt(scoreTotal["part3"] / noofassess/3)
    scoreavg["total"] = parseInt(scoreTotal["total"] / noofassess)
    return
  }))


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
      temp2[index] = [item.toString(), temp[item], scoreavg["total"]]
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





  const vvalue = (assesss.map((content, index) => {

    vlist.map((vcontent, index) => {
      switch (content.vfeature[0]) {
        case vcontent:
          vcount[vcontent]++
      }
      switch (content.vfeature[1]) {
        case vcontent:
          vcount[vcontent]++
      }
      switch (content.vfeature[2]) {
        case vcontent:
          vcount[vcontent]++
      }
    })


    //vcountFinal = vcount.filter(element => element !==0)// remove empty element in array, if any
    console.log(vcount)

    return vcount

  }))



  const sexdist = (students.map((content, index) => {
    if (content.sex === "M")
      sex_M = sex_M + 1
    else
      sex_F = sex_F + 1
    //temp[classcontent[0]] = Number(content.pageALLTotal) + Number(temp[classcontent[0]])

    sex = [["Male", sex_M], ["Female", sex_F]]
    return sex
  }));



  const data1 = [["Name", "Total Assessment score", "Part 1 score", "Part 2 score", "Part 3 score"]].concat(assesss.map((content, index) => {
    return ([content.studentname + " (" + content.studentclassid + ")", content.pageALLTotal, content.page1Total, content.page2Total, content.page3Total])
  }))
  const data2 = [["Answer", "frequency"]].concat(satis2)
  const data3 = [["Answer", "frequency"]].concat(satis3)
  const data4 = [["Answer", "frequency"]].concat(sex)
  const data5 = [["Name", "Part 1 score", "Part 2 score", "Part 3 score"]].concat(assesss.map((content, index) => {
    return ([content.studentname + " (" + content.studentclassid + ")", content.page1Total, content.page2Total, content.page3Total])

  }))
  const data6 = [["Class", "Score of class", "Average"]].concat(temp3)


  const data7 = [["Class", "Total Score"]].concat(vlist.map((content, index) => {
    return ([content, vcount[content]])
  }))




  const options1 = {
    title: "Individual student assessment score",

    bubble: { textStyle: { fontSize: 11 } }
  };

  const options2 = {
    title: "In general, the student's emotion and social development is satisfactory ?",
    is3D: true,
  };

  const options3 = {
    title:
      "In general, the student's physical and artistic development is satisfactory ?",
    is3D: true,
  };

  const options4 = {
    title:
      "Sex distribution in students",
    is3D: true,
  };


  const options5 = {
    title: "Assessment score distribution in Part 1(hAxis), Part 2(vAxis) and Part 3(Bubble colour)",
    hAxis: { title: "Part 1 Score" },
    vAxis: { title: "Part 2 Score" },
    bubble: { textStyle: { fontSize: 10 } },
    colorAxis: { colors: ["red", "purple"] },
  };

  const options6 = {
    title: "Total assessment score by class",
    hAxis: { title: "Class" },
    vAxis: { title: "Total Score" },
    colors: ["#9dad34", "#ffab91"],
    
    seriesType: "bars",
  series: { 1: { type: "line" } },

  };

  const options7 = {
    title:
      "Virtue and value do the student acquire",
    is3D: true,
    
  };




  return (
    <div> <MainLayout />
      <div className=" text-secondary text-center mt-4 mb-2"><h5><u>Student perfromance Dashboard</u></h5></div>

      <div className='container-fluid'>
        <div className="row align-items-center m-3 mb-5">
          <div className='col-8'>
            <Chart
              width={"100%"}
              height={600}
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
          </div>
          <div className='col-4 text-center'>
            <br /><br /><br /><br /><br />
            <h1><p className='text-warning'>Highest score: {scorehighest}, {scorehighestname}</p></h1>
            <h2><p className='text-primary'>Average score: {scoreavg["total"]}</p></h2><br />
            <h6><p className='text-secondary'>Score average in Part 1: {scoreavg["part1"]}</p></h6>
            <h6><p className='text-secondary'>Score average in Part 2: {scoreavg["part2"]}</p></h6>
            <h6><p className='text-secondary'>Score average in Part 3: {scoreavg["part3"]}</p></h6><br />
          </div>
        </div>

        <div className="row col-12 mt-5">
          <div className="col-4">
            <Chart
              chartType="PieChart"
              data={data2} //page2satis
              options={options2}
              width={"100%"}
              height={"300px"}
            />
          </div>

          <div className="col-4">
            <Chart
              chartType="PieChart"
              data={data3} //page3satis
              options={options3}
              width={"100%"}
              height={"300px"}
            />
          </div>
          <div className="col-4">
            <Chart
              chartType="PieChart"
              data={data4}
              options={options4}
              width={"100%"}
              height={"300px"}
            />
          </div>
        </div>

        <div className="row col-12 mt-1 no-gutters">
          
          <div className='col-7'>
          
            

            <Chart
            chartType="ComboChart"
            data={data6}
            options={options6}
            width={"100%"}
            height={"500px"}
          />
            </div>

          <div className='col-5'>
            <Chart
              chartType="PieChart"
              data={data7}
              options={options7}
              width={"100%"}
              height={"500px"}
            /></div>


        </div>

        <div className="row col-12 mt-1 d-flex justify-content-center">
        <Chart
              chartType="BubbleChart"
              data={data5}
              options={options5}
              width={"100%"}
              height={"600px"}
            />
        </div>





      </div>

    </div>


  )
}

export default AnalysisPage