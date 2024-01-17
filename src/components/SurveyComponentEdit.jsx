import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "../index.css";
import { json } from "../json";
import { SurveyPDF } from "survey-pdf";
import { useEffect, useState, useRef } from 'react'
import { toast } from "react-toastify";


function SurveyComponent(props) {
  const survey = new Model(json);
  const surveyJson = { /* ... */ };

  //console.log(props.AssessResult.studentname);
  //survey.setVariable("assesstitle", props.AssessResult.studentname);
  survey.setVariable("page1", props.AssessResult.studentclassno);
  survey.setVariable("page2", props.AssessResult.studentclassid);
  survey.setVariable("page3", props.username);

  // survey.setVariable("p1score1.defaultValue", props.AssessResult.p1score1);
  //survey.setVariable("page1Total", props.AssessResult.page1Total);



  const pdfDocOptions = {
    fontSize: 12
  };

  const savePdf = function (surveyData) {
    const surveyPdf = new SurveyPDF(json, pdfDocOptions);
    surveyPdf.setVariable("assesstitle", props.name);
    surveyPdf.setVariable("page1", props.AssessResult.studentclassno);
    surveyPdf.setVariable("page2", props.AssessResult.studentclassid);
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
  survey.onComplete.add((sender, options) => {
    //console.log(sender.data)
    //console.log(JSON.stringify(sender.data, null, 3));
    const newrecord = JSON.stringify(sender.data)
    fetch(`api/assesss/${props.AssessResult._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newrecord
    })
      .then(response => {
        toast.success("Assessment update Successful");
      })
      .catch(error => {
        toast.error(error.message);
      });

  });
  survey.data = {
    _id: props.AssessResult._id,
    assesstitle: props.AssessResult.studentname,
    p1score1: props.AssessResult.p1score1,
    studentid: props.AssessResult.studentid,
    studentclassid: props.AssessResult.studentclassid,
    studentname: props.AssessResult.studentname,
    studentclassno: props.AssessResult.studentclassno,
    assessmentdate: props.AssessResult.assessmentdate,
    page1Total: props.AssessResult.page1Total,
    page2Total: props.AssessResult.page2Total,
    page3Total: props.AssessResult.page3Total,
    pageALLTotal: props.AssessResult.pageALLTotal,
    p1score1: props.AssessResult.p1score1,
    p1score2: props.AssessResult.p1score2,
    p1score3: props.AssessResult.p1score3,
    p1score4: props.AssessResult.p1score4,
    p1score5: props.AssessResult.p1score5,
    p2score1: props.AssessResult.p2score1,
    p2score2: props.AssessResult.p2score2,
    p2score3: props.AssessResult.p2score3,
    p2satis: props.AssessResult.p2satis,
    p3score1: props.AssessResult.p3score1,
    p3score2: props.AssessResult.p3score2,
    p3score3: props.AssessResult.p3score3,
    p3satis: props.AssessResult.p3satis,
    vfeature: props.AssessResult.vfeature,
    testimonial: props.AssessResult.testimonial,
    suppInfo: props.AssessResult.suppInfo,
  };
  survey.onValueChanged.add((sender, options) => {
    const el = document.getElementById(options.name);
    if (el) {
      el.value = options.value;
    }

  });
  return (<Survey model={survey} id="surveyContainer" />);
}

export default SurveyComponent;