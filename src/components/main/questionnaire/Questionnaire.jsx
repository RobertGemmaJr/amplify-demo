import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Content } from "../../../models";
import { createResponse } from "../../../api";
import Paper from "../../Paper"
import Question from "./Question";

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    '& > *': {
      fontWeight: "bold",
    },
    text: {
      margin: theme.spacing(3),
      fontSize: 30,
      fontWeight: "bold",
      alignContent: "center",
    },
    answer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
  
      '& > *': {
        margin: theme.spacing(2, 5),
      },
    },
  }
}))


// Returns true if all of the user responses match the question's expectedResponse
function checkPassed(questions, responses) {
  var passed = true;

  questions.forEach((q, idx) => {
    if(q.expectedResponse !== responses[idx]) {
      passed = false; 
      return;
    }
  })
  return passed;
}


export default function Questionnaire(props) {
    const classes = useStyles();
    const { 
      setContent, handleResetClick, person, questions, form, responses, 
      setResponses, setSubmission,
    } = props;

    // Hook for indexing the questions array
    const [i, setI] = React.useState(0);

    // Generate the submission and move to Summary page
    function generateSubmission() {
      const strQuestions = []
      questions.forEach(q => { strQuestions.push(q.question) })

      // Save submission to database
      const submissionId = createResponse({
      personID: person.id,
      formType: form.ptype,
      time: form.time,
      questions: strQuestions,
      responses: responses,
      passed: checkPassed(questions, responses)  
      })

      setSubmission(submissionId)
      setI(0);
      setContent(Content.SUMMARY)
    }

    // Handle clicks that submits answer to a single question
    function handleClick(response) {
      setResponses(responses.concat(response))
      setI(i + 1);
    }

    return (
      <Paper handleResetClick={handleResetClick} person={person}>
        {/* Ask all questions and then generate the submission */}
        {i < questions.length ? 
          <Question 
            className={classes.question}
            key={questions[i].index}  
            q={questions[i]}
            handleClick={handleClick}
          />
        : 
          generateSubmission()
        }
      </Paper>
    )
}