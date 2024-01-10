import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Chart } from "react-google-charts";
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function AnalysisPage() {
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

    
      console.log(students)

 const data = [["Class", "Score"]].concat( students.map((content, index)=>
 {
    return([content.studentclassid, content.page1Total]) 

}))

const data2 = [["Class", "Score"]].concat( students.map((content, index)=>
{
   return([content.studentclassid, content.pageALLTotal]) 

}))
   

     
 console.log(data)
 

    
    const options = {
        title:
          "Correlation between life expectancy, fertility rate " +
          "and population of some world countries (2010)",
       
      };


      //console.log(data)

  return (
    <MainLayout >
         <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data2}
      options={options}
    />
      <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
    </MainLayout>
  )
}

export default AnalysisPage