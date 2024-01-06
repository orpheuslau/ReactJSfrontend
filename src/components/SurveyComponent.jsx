import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "../index.css";
import { json } from "../json";
import { SurveyPDF } from "survey-pdf";
import { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function SurveyComponent(props) {
    const survey = new Model(json);
    const surveyJson = { /* ... */ };
    
    survey.data = {
      studentid:props.studentid,
      studentclassno:props.classno,
      studentcalssid:props.classid,
      studentname:props.name
    }
    
    const navigate = useNavigate();
    
    //console.log(props.AssessResult.studentname);
    survey.setVariable("assesstitle", props.name);
    survey.setVariable("page1", props.classno);
    survey.setVariable("page2", props.classid);
    survey.setVariable("page3", props.username);
    survey.setVariable("page4", props.studentid); 
    
     
    
    const pdfDocOptions = {
        fontSize: 12
      };

      const savePdf = function (surveyData) {
        const surveyPdf = new SurveyPDF(json, pdfDocOptions);
        surveyPdf.setVariable("assesstitle", props.name);
        surveyPdf.setVariable("page1", props.classno);
        surveyPdf.setVariable("page2", props.classid);
        surveyPdf.setVariable("page3", props.username);

        surveyPdf.data = surveyData;
        surveyPdf.save();
      };

      survey.addNavigationItem({
        id: "pdf-export",
        title: "Export report as PDF",
        action: () => savePdf(survey.data)
      });

survey.applyTheme({

    "cssVariables": {
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)",
        "--sjs-general-backcolor-dim": "rgba(243, 243, 243, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(249, 249, 249, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-primary-backcolor": "rgba(25, 179, 148, 1)",
        "--sjs-primary-backcolor-light": "rgba(25, 179, 148, 0.1)",
        "--sjs-primary-backcolor-dark": "rgba(20, 164, 139, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-base-unit": "4px",
        "--sjs-corner-radius": "4px",
        "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
        "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-shadow-small": "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-inner": "inset 0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.09)",
        "--sjs-border-default": "rgba(0, 0, 0, 0.16)",
        "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
        "--sjs-special-red": "rgba(229, 10, 62, 1)",
        "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
        "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-green": "rgba(25, 179, 148, 1)",
        "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
        "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-blue": "rgba(67, 127, 217, 1)",
        "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
        "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
        "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-article-font-xx-large-fontSize": "64px",
        "--sjs-article-font-xx-large-textDecoration": "none",
        "--sjs-article-font-xx-large-fontWeight": "700",
        "--sjs-article-font-xx-large-fontStyle": "normal",
        "--sjs-article-font-xx-large-fontStretch": "normal",
        "--sjs-article-font-xx-large-letterSpacing": "0",
        "--sjs-article-font-xx-large-lineHeight": "64px",
        "--sjs-article-font-xx-large-paragraphIndent": "0px",
        "--sjs-article-font-xx-large-textCase": "none",
        "--sjs-article-font-x-large-fontSize": "48px",
        "--sjs-article-font-x-large-textDecoration": "none",
        "--sjs-article-font-x-large-fontWeight": "700",
        "--sjs-article-font-x-large-fontStyle": "normal",
        "--sjs-article-font-x-large-fontStretch": "normal",
        "--sjs-article-font-x-large-letterSpacing": "0",
        "--sjs-article-font-x-large-lineHeight": "56px",
        "--sjs-article-font-x-large-paragraphIndent": "0px",
        "--sjs-article-font-x-large-textCase": "none",
        "--sjs-article-font-large-fontSize": "32px",
        "--sjs-article-font-large-textDecoration": "none",
        "--sjs-article-font-large-fontWeight": "700",
        "--sjs-article-font-large-fontStyle": "normal",
        "--sjs-article-font-large-fontStretch": "normal",
        "--sjs-article-font-large-letterSpacing": "0",
        "--sjs-article-font-large-lineHeight": "40px",
        "--sjs-article-font-large-paragraphIndent": "0px",
        "--sjs-article-font-large-textCase": "none",
        "--sjs-article-font-medium-fontSize": "24px",
        "--sjs-article-font-medium-textDecoration": "none",
        "--sjs-article-font-medium-fontWeight": "700",
        "--sjs-article-font-medium-fontStyle": "normal",
        "--sjs-article-font-medium-fontStretch": "normal",
        "--sjs-article-font-medium-letterSpacing": "0",
        "--sjs-article-font-medium-lineHeight": "32px",
        "--sjs-article-font-medium-paragraphIndent": "0px",
        "--sjs-article-font-medium-textCase": "none",
//        "--sjs-article-font-default-fontSize": "10px",
"--sjs-article-font-default-fontSize": "20px",
        "--sjs-article-font-default-textDecoration": "none",
        "--sjs-article-font-default-fontWeight": "400",
        "--sjs-article-font-default-fontStyle": "normal",
        "--sjs-article-font-default-fontStretch": "normal",
        "--sjs-article-font-default-letterSpacing": "0",
        "--sjs-article-font-default-lineHeight": "28px",
        "--sjs-article-font-default-paragraphIndent": "0px",
        "--sjs-article-font-default-textCase": "none",
        "--sjs-font-size": "14px",
       // "--sjs-font-headerdescription-size": "20px",
       // "--sjs-font-headertitle-size": "140px",
      },
      "isPanelless": false,
      "themeName": "default",
      "colorPalette": "light"
    });
    survey.onComplete.add( (sender, options) => {
      console.log(`this is the first line ${sender.data}`)  
      console.log(JSON.stringify(sender.data, null, 3));
      const newrecord = JSON.stringify(sender.data)


      fetch('/api/assesss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: newrecord
      })
      .then(response => {
        // handle response 
      })
      .catch(error => {
        // handle error
      });

      /*
  try {
  
  onsole.log(newrecord)
    axios.post(`api/assesss`, newr3);
    toast.success(`Profile of new student added successfully`);
    //fetchStudents()
    //navigate("/student");
    //    setData("")
    } catch (error) {
    toast.error(error.message);
  }
*/

    });
    return (<Survey model={survey} id="surveyContainer" />);
}

export default SurveyComponent;