import React from "react";
import { Hub } from "@aws-amplify/core";
import { DataStore } from "@aws-amplify/datastore";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AuthState } from '@aws-amplify/ui-components';
import { CssBaseline, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";

import { Content, Ptype, Time } from "../models";
import { getSettings, getPeople, getQuestions } from "../api";
import Header from "./header/Header"
import Main from "./main/Main"
import Footer from "./footer/Footer"

const useStyles = makeStyles(theme => ({
  root : {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}))

/*********** GLOBALS  *********/

const initialFormState = { time: Time.MORNING, ptype: Ptype.NONE }

/**
 * 
 * @TODO Menu
 * Write a description of what the Home and Reset buttons do in <Menu>
 * Ability to view children and staff in <Menu> - this would use a material-ui <DataGrid>
 * Import buttons should display the file name after being selected
 * 
 * 
 * @TODO Miscellaneous
 * Header(text and buttons), title, subtitle, etc. should scale down on xs devices
 * Images on <Home> page are cropped.
 * 
 */
function App() {
  const classes = useStyles();

  // Listener for DataStore events
  // Ensures sync process is complete before queries
  const dataStoreListener = async (data) => {
    const { payload: { event } } = data;
    // console.log("DataStore event", event);

    // Get user data when synced and signed in
    if (event === "ready" && AuthState.SignedIn) {
      console.log("DataStore READY");

      const s = await getSettings()
      setSettings(s)

      const p = await getPeople()
      setAllPeople(p)
      setPeople(p)

      const q = await getQuestions()
      setAllQuestions(q)
      setQuestions(q)

      setLoading(false)
    }
  };

  // Listener for authentication events
  const authListener = async (data) => {
    const { payload: { event } } = data;
    console.log("Auth event", event);

    switch (event) {
      case 'signUp':
        // Create settings here not in query
        break;
      case 'signIn':
        await DataStore.clear()
        await DataStore.start();
        break;
      case 'signOut':
        await DataStore.clear();
        break;
      default: 
        break;
    }
  }

  // DataStore API calls on initial render
  // Listener ensures sync process completes before first query
  React.useEffect(() => {
    Hub.listen('auth', authListener);
    Hub.listen("datastore", dataStoreListener);

    DataStore.clear();
    DataStore.start();
  }, [])

  // Hook for app loading state
  const [loading, setLoading] = React.useState(true);

  // Hook for user's data
  const [settings, setSettings] = React.useState(0);
  const [allPeople, setAllPeople] = React.useState(0);
  const [allQuestions, setAllQuestions] = React.useState(0);

  // Hook for user's people
  const [people, setPeople] = React.useState([]);
  // Hook for user's questions
  const [questions, setQuestions] = React.useState([]);

  // Hook for content to be shown
  const [content, setContent] = React.useState(Content.HOME);
  // Hook for current form
  const [form, setForm] = React.useState(initialFormState)

  // Hook for the current person
  const [person, setPerson] = React.useState(null);
  // Hook for the current person's response
  const [responses, setResponses] = React.useState([]);
  // Hook for the current person's questionnaire submission
  const [submission, setSubmission] = React.useState(0);

  // HandleClick for the home button in the header
  function handleHomeClick() {
    setPeople(allPeople);
    setQuestions(allQuestions);
    setResponses([]);
    setSubmission(0);
    setForm(initialFormState);
    setContent(Content.HOME);
  }

  // HandleClick for the reset button
  function handleResetClick() {
    setPeople(allPeople);
    setQuestions(allQuestions);
    setResponses([]);
    setSubmission(0);
    form.ptype === Ptype.MANUAL ? setContent(Content.MANUAL) : setContent(Content.KEYPAD);
  }

  // HandleClick for the menu button
  function handleMenuClick() {
    setContent(Content.MENU)
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Header 
        content={content} 
        form={form} 
        homeClick={handleHomeClick} 
        menuClick={handleMenuClick}
      />
      <Main 
        loading={loading}
        settings={settings} 
        allPeople={allPeople} setAllPeople={setAllPeople} 
        allQuestions={allQuestions}
        people={people} setPeople={setPeople}
        questions={questions} setQuestions={setQuestions}
        content={content} setContent={setContent} 
        form={form} setForm={setForm}
        person={person} setPerson={setPerson}
        responses={responses} setResponses={setResponses} 
        submission={submission} setSubmission={setSubmission}
        handleResetClick={handleResetClick}
      />
      <Footer />
    </Box>
  );
}

export default withAuthenticator(App);