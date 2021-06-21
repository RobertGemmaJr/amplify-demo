import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

import ResetButton from "./ResetButton"

const useStyles = makeStyles(theme => ({
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
}))

export default function Summary(props) {
  const classes = useStyles()
  const { setContent, person, response } = props


  return (
    <Paper className={classes.paper}>
    <ResetButton setContent={setContent}/>
  </Paper>
  )
}