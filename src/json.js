export const json = {
    "completedHtmlOnCondition": [
     {
      "expression": "{nps-score} <= 6 or {rebuy} = false",
      "html": {
       "default": "Thanks for your feedback! We highly value all ideas and suggestions from our customers, whether they're positive or critical. In the future, our team might reach out to you to learn more about how we can further improve our product so that it exceeds your expectations.",
             }
     },
     {
      "expression": "{nps-score} = 6 or {nps-score} = 7",
      "html": {
       "default": "Thanks for your feedback. Our goal is to create the best possible product, and your thoughts, ideas, and suggestions play a major role in helping us identify opportunities to improve.",
             }
     },
     {
      "expression": "{nps-score} >= 8",
      "html": {
       "default": "Thanks for your feedback. It's great to hear that you're a fan of our product. Your feedback helps us discover new opportunities to improve it and make sure you have the best possible experience.",
             }
     }
    ],
    "pages": [
      {
        "name": "page1",
        "title": "Cognitive Development",
        "elements": [
          {
            "type": "rating",
            "name": "nps-score1",
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
            "name": "nps-score2",
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
            "expression": "{nps-score1}+{nps-score2}"
          },
          {
            "type": "rating",
            "name": "nps-score3",
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
            "name": "nps-score4",
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
            "name": "nps-score5",
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
                      "html": "<h4>Sub-total : {page1Total}</h4>",
          },
          {
            "type": "expression",
            "name": "page1Total",
            "title": "Sub-total",
            "expression": "{nps-score1}+{nps-score2}+{nps-score3}+{nps-score4}+{nps-score5}",
            "visible": false,
          }
          
        ]
      },
      {
        "name": "page2",
        "elements": [
          {
            "type": "boolean",
            "name": "rebuy",
            "title": {
              "default": "Would you buy our product again?",
              
            }
          },
        ]
      },
      {
        "name": "page3",
        "elements": [
          {
            "type": "comment",
            "name": "disappointing-experience",
           // "visibleIf": "{nps-score} <= 5",
            "title": {
              "default": "How did we disappoint you and what can we do to make things right?",
              
            },
            "maxLength": 300
          },
          {
            "type": "comment",
            "name": "improvements-required",
           // "visibleIf": "{nps-score} >= 6",
            "title": {
              "default": "What can we do to make your experience more satisfying?",
              
            },
            "maxLength": 300
          },
          {
            "type": "checkbox",
            "name": "promoter-features",
           // "visibleIf": "{nps-score} >= 9",
            "title": {
              "default": "Which of the following features do you value the most?",
              
            },
            "description": {
              "default": "Please select no more than three features.",
              
            },
            "isRequired": true,
            "choices": [
              {
                "value": "performance",
                "text": "Performance"
              },
              {
                "value": "stability",
                "text": {
                  "default": "Stability",
                  
                }
              },
              {
                "value": "ui",
                "text": {
                  "default": "User interface",
                  
                }
              },
              {
                "value": "complete-functionality",
                "text": {
                  "default": "Complete functionality",
                  
                }
              },
              {
                "value": "learning-materials",
                "text": {
                  "default": "Learning materials (documentation, demos, code examples)",
                  
                }
              },
              {
                "value": "support",
                "text": {
                  "default": "Quality support",
                  
                }
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
              "default": "Would you mind providing us a brief testimonial for the website?",
              
            },
            "choices": [
              {
                "value": "yes",
                "text": {
                  "default": "Sure!",
                  
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
            "type": "text",
            "name": "email",
            "visibleIf": "{testimonial} = 'yes'",
            "title": {
              "default": "What is your email address?",
              
            },
            "validators": [
              {
                "type": "email"
              }
            ],
            "placeholder": {
              "default": "Enter your email here",
              
            }
          }
        ]
      }
    ],
    "showPrevButton": true,
    "showQuestionNumbers": "off",
    "completeText": {
     "fr": "Envoyer"
    },
    "widthMode": "static",
    "width": "1000px"
   };