import React from "react"
import { Paper, TextField, Box, Button, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from "@material-ui/styles";

// Returns date as a "yyyy-mm-dd" format
function getDate() {
  const today = new Date()
  return (
    today.getFullYear() + "-" + 
    String(today.getMonth()+1).padStart(2, "0") + "-" + 
    String(today.getDate()).padStart(2, "0")
  );
}

const useStyles = makeStyles(theme => ({
  menu: {
    width: "75%",
  },
  hideInput: {
    display: "none"
  },
  save: {
    marginTop: theme.spacing(5)
  }
}))

export default function Menu(props) {
  const classes = useStyles();

  // Hook for menu settings
  // TODO: start newTitle from current title (API call)
  const [settings, setSettings] = React.useState({
    newTitle: "Apple Blossom Preschool",
    startDate: "2020-01-01",
    endDate: getDate(),
    randomized: true,
  })

  // Handle newTitle change
  const handleNewTitleChange = (event) => {
    setSettings({...settings, [event.target.name]: event.target.value })
    console.log(settings)
  }

  // Handle randomized change
  const handleRandomizedChange = (event) => {
    setSettings({...settings, [event.target.name]: event.target.checked})
  }

  // Handle import child button clicked
  function handleImportChildClick() {

  }

  // Handle import staff button clicked
  function handleImportStaffClick() {

  }

  function handleExportClick() {
    
  }

  // Handle edit questions button clicked
  function handleEditQuestionsClicked() {
    
  }
  // Handle save button clicked
  function handleSaveClick(settings) {
    console.log(settings);
    window.location.reload();
  }

  const boxMargin = 3
  return (
    <Paper className={classes.menu}>
    
    {/* Import Buttons */}
    <Box m={boxMargin} display="flex" justifyContent="space-evenly">
      {/* Import Child List */}
      <input
        className={classes.hideInput}
        id="import-child-list"
        single
        type="file"
        accept=".csv, .xlsx, .xls"
      />
      <label htmlFor="import-child-list">
        <Button 
          startIcon={<CloudUploadIcon />}
          variant="contained"
          color="secondary"
          component="span"
          onClick={() => handleImportChildClick()}
        >
          Import Child List
        </Button>
      </label>

      {/* Import Staff List */}
      <input
        className={classes.hideInput}
        id="import-staff-list"
        single
        type="file"
        accept=".csv, .xlsx, .xls"
      />
      <label htmlFor="import-staff-list">
        <Button 
          startIcon={<CloudUploadIcon />}
          variant="contained"
          color="secondary"
          component="span"
          onClick={() => handleImportStaffClick()}
        >
          Import Staff List
        </Button>
      </label>
    </Box>

    {/* Export Answers */}
    <Box m={boxMargin} display="flex" justifyContent="space-evenly">
      <TextField
        id="start-date"
        name="startDate"
        label="Start Date" 
        type="date"
        value={settings.startDate}
        onChange={handleNewTitleChange}
      />
      <TextField
        id="end-date"
        name="endDate"
        label="End Date" 
        type="date"
        value={settings.endDate}
        onChange={handleNewTitleChange}
      />
      <Button 
        variant="contained"
        color="secondary"
        onClick={() => handleExportClick()}
      >
        Export Answers
      </Button>
    </Box>

    {/* Update Title */}
    <Box m={boxMargin} display="flex" justifyContent="space-evenly" component="form">
      <TextField 
        id="new-title" 
        name="newTitle"
        label="App Title" 
        value={settings.newTitle}
        onChange={handleNewTitleChange}
        variant="outlined"
        noValidate fullWidth
      />
    </Box>

    {/* Edit Questions */}
    <Box m={boxMargin} display="flex" justifyContent="space-evenly">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => handleEditQuestionsClicked()}
      >
        Edit Questions
      </Button>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox 
              color="secondary" 
              checked={settings.randomized}
              onChange={handleRandomizedChange}
              name="randomized"
            />
          }
          label="Randomize Questions?"
          labelPlacement="start"
        />
      </FormGroup>
    </Box>

    {/* Save Button */}
    <Box m={boxMargin} align="center" className={classes.save}>
      <Button 
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => handleSaveClick(settings)}
      >
        Save
      </Button>
    </Box>

    </Paper>
  )
}