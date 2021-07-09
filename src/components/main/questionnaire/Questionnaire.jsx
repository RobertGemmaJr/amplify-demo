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

// Returns date as a "mm/dd/yyyy" format
function getDate() {
  const today = new Date()
  return (
    today.getFullYear() + "-" + 
    String(today.getMonth()+1).padStart(2, "0") + "-" + 
    String(today.getDate()).padStart(2, "0")
  );
}

// Returns true if all of the user responses match the question's expectedResponse
function checkPassed(questions, responses) {
  console.log("checkPassed", questions, responses)
  return true //TEMP
}

// Submits a response to the database
function submitResponses(personId, form, questions, responses, setContent) {
  const strQuestions = []
  questions.forEach(q => { strQuestions.push(q.question) })

  // Write the response to the database
  createResponse(personId, getDate(), form.ptype, form.time, questions, 
    responses, checkPassed(questions, responses))

  setContent(Content.SUMMARY);
  // responses.length = 0; 
}

// Keep track of the user's responses in an array
const responses = [];

export default function Questionnaire(props) {
    const classes = useStyles();
    const { setContent, handleResetClick, person, questions, form } = props;

    // Hook for indexing the questions array
    const [i, setI] = React.useState(0);

    // Handle clicks that submit an answer
    function handleClick(response) {
      responses.push(response)
      setI(i + 1);
    }

    return (
      <Paper handleResetClick={handleResetClick} person={person}>
        {/* Ask all questions and then submit the responses */}
        {i < questions.length ? 
          <Question 
            className={classes.question}
            key={questions[i].index}  
            q={questions[i]}
            handleClick={handleClick}
          />
        : 
          submitResponses(person.id, form, questions, responses, setContent)
        }
      </Paper>
    )
}