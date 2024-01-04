export const json = {
  "title": "Annual Assessment",
  "name":"assesstitle",
  "description": "Student :  {assesstitle}, {page2} ({page1})",
    "pages": [
      {
        "name": "page1",
        "title": "Cognitive Development",
        "elements": [
          {
            "type": "rating",
            "name": "p1score1",
            "isRequired": true,
            "title": {
              "default": "(1) How likely the student can understand verbal instruction and communication ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p1score2",
            "isRequired": true,
            "title": {
              "default": "(2) How likely the student can speak clearly ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            },
            "expression": "{p1score1}+{p1score2}"
          },
          {
            "type": "rating",
            "name": "p1score3",
            "isRequired": true,
                        "title": {
              "default": "(3) How likely the student can distinguish between common colour in daily life ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p1score4",
            "isRequired": true,
            "title": {
              "default": "(4) How likely the student can group objects with same quantity ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p1score5",
            "isRequired": true,
            "title": { 
              "default": "(5) How likely the student feel interested to listen to story or song ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "html",
            "name": "htmlpage1Total",
                      "html": "<h5>sub-total score : {page1Total}<h5>",
          },
          {
            "type": "expression",
            "name": "page1Total",
            "title": "Sub-total",
            "expression": "{p1score1}+{p1score2}+{p1score3}+{p1score4}+{p1score5}",
            "visible": false,
          }
          
        ]
      },
      {
        "name": "page2",
        "title": "Emotion and Social development",
        "elements": [
          {
            "type": "rating",
            "name": "p2score1",
            "isRequired": true,
            "title": {
              "default": "(1) How likely the student bahave joyfully during class ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p2score2",
            "isRequired": true,
            "title": {
              "default": "(2) How likely the student can concentrate in learning and playing games ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p2score3",
            "isRequired": true,
            "title": {
              "default": "(3) How likely the students will pick up after themselves ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
         
          {
            "type": "boolean",
            "name": "p2satis",
            "title": {
              "default": "In general, the student's emotion and social development is satisfactory ?",
              
            }
          },
          {
            "type": "html",
            "name": "htmlpage2Total",
                      "html": "<h5>sub-total score : {page2Total}</h5>",
          },
          {
            "type": "expression",
            "name": "page2Total",
            "title": "Sub-total",
            "expression": "{p2score1}+{p2score2}+{p2score3}",
            "visible": false,
          }
        ]
      },
      {
        "name": "page3",
        "title": "Physical and artistic development",
        "elements": [
          {
            "type": "rating",
            "name": "p3score1",
            "isRequired": true,
            "title": {
              "default": "(1) How likely the student shows proper balance and coordination in daily activity?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p3score2",
            "isRequired": true,
            "title": {
              "default": "(2) How likely the student can sing a simple song ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
          {
            "type": "rating",
            "name": "p3score3",
            "isRequired": true,
            "title": {
              "default": "(3) How likely the student can paint with different colour ?",
              
            },
            "rateMin": 1,
            "rateMax": 5,
            "minRateDescription": {
              "default": "Very unlikely",
              
            },
            "maxRateDescription": {
              "default": "Very likely",
              
            }
          },
         
          {
            "type": "boolean",
            "name": "p3satis",
            "title": {
              "default": "In general, the student's physical and artistic development is satisfactory ?",
              
            }
          },
          {
            "type": "checkbox",
            "name": "vfeature",
           // "visibleIf": "{nps-score} >= 9",
            "title": {
              "default": "Which of the following virtue and value do the student acquire?",
              
            },
            "description": {
              "default": "Please select no more than three features.",
              
            },
            "isRequired": true,
            "choices": [
              {
                "value": "Honesty",
                "text": "Honesty"
              },
              {
                "value": "Respect",
                "text": "Respect",                
              },
              {
                "value": "Caring",
                "text": "Caring",
                            },
              {
                "value": "Patience",
                "text": "Patience",
              },
              {
                "value": "Friendship",
                "text": "Friendship",
              },
              {
                "value": "Initiative",
                "text": "Initiative",
              }
            ],
            "showOtherItem": true,
            "otherPlaceholder": {
              "default": "Please specify...",
              
            },
            "otherText": {
              "default": "Other features",
              
            },
            "colCount": 2,
            "maxSelectedChoices": 3
          },
          {
            "type": "radiogroup",
            "name": "testimonial",
            "title": {
              "default": "Would you please further elaborate with an occaion or observation ?",
              
            },
            "choices": [
              {
                "value": "yes",
                "text": {
                  "default": "Yes",
                  
                }
              },
              {
                "value": "no",
                "text": {
                  "default": "No",
                  
                }
              }
            ]
          },         
          {
            "type": "comment",
            "name": "Supplementary information",
            "visibleIf": "{testimonial} = 'yes'",
           /* "title": {
              "default": "What is your email address?",
              
            },*/
            "maxLength": 300,
          
            "placeholder": {
              "default": "Your elaboration",
              
            }
          },
          {
            "type": "html",
            "name": "htmlpage3Total",
                      "html": "<h5>sub-total score : {page3Total}</h5>",
          },
          {
            "type": "expression",
            "name": "page3Total",
            "title": "Sub-total",
            "expression": "{p3score1}+{p3score2}+{p3score3}",
            "visible": false,
          },
          {
            "type": "html",
            "name": "htmlpageALLTotal",
                      "html": "<h4>Total score: {pageALLTotal}</h4>",
          },
          {
            "type": "expression",
            "name": "pageALLTotal",
            "title": "Total",
            "expression": "{page1Total}+{page2Total}+{page3Total}",
            "visible": false,
          },
                   ]
      },
      {
        "name": "page4",
        "title": "Sign Off",
        "elements": [ {
          "type": "text",
          "name": "assessmentdate",
          "title": "Assessment Date",            
                      "defaultValueExpression": "today()",
                  "inputType": "date",
          "placeholder": "Assessment date"
         },
         {
          "type": "html",
          "name": "htmlpage4",
                    "html": "<h5 style=color:darkred>Assessed by : {page3}</h5>",
        },
        ]

      }
  
    ],
    "showPrevButton": true,
    "showQuestionNumbers": "off",
    "showProgressBar": "bottom",
    "completeText": "Submit",
    "widthMode": "static",
    "width": "1000px",
    "completedHtml": "<h3><font color=green>Assessment successfully submitted!</font></h3>",
    "showPreviewBeforeComplete": "showAllQuestions",
   };