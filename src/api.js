import { Predicates, SortDirection } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Setting, Person, Question, Submission } from './models';

/********** CREATE **********/

export async function createPerson(person) {
  const res = await DataStore.save(
    new Person({
      companyID: person.companyID,
      type: person.type,
      fName: person.fName,
      lName: person.lName,
    })
  )
  return res;
}

export async function createSubmission(submission) {
  const res = await DataStore.save(
    new Submission({
      "personID": submission.personID,
      "createdAt": submission.createdAt,
      "formType": submission.formType,
      "time": submission.time,
      "questions": submission.questions,
      "responses": submission.responses,
      "temperature": submission.temperature,
      "passed": submission.passed,
    })
  )
  return res;
}


/********* READ **********/

// Returns all models of type Setting
// There should be exactly 1 per user
export async function getSettings() {
  var models = await DataStore.query(Setting);

  // TODO: Move this to the auth sign-up listener
  if (!models.length) {
    await DataStore.save(
      new Setting({
        "title": "Change Title in Menu",
        "randomizeQuestions": true,
        "recordTemperature": true,
        "keepTemperature": true,
        "tempTolerance": 2,
      })
    );
    models = await DataStore.query(Setting)    
  } else if (models.length > 1) {
    console.error("Too many settings! Using first object", models)
  }
  return models[0];
}

// Returns all models of type Setting
export async function getPeople() {
  return await DataStore.query(Person);
}

// Returns a single person by id
export async function getPerson(id) {
  return await DataStore.query(Person, id);
}

// Returns all models of type Question
// Questions are sorted by index
export async function getQuestions() {
  const models = await DataStore.query(Question, Predicates.ALL, {
    sort: q => q.index(SortDirection.ASCENDING)
  });
  return models
}

// Returns a single question by id
export async function getQuestion(id) {
  return await DataStore.query(Question, id);
}

// Returns all models of type Response dated between the start and end date
export async function getSubmissions(startDate, endDate) {
  return await DataStore.query(Submission)
}


/********* UPDATE *********/

export async function updateSettings(original, newSettings) {
  return await DataStore.save(Setting.copyOf(original, updated => {
    updated.title = newSettings.title;
    updated.randomizeQuestions = newSettings.randomizeQuestions;
    updated.recordTemperature = newSettings.recordTemperature;
    updated.keepTemperature = newSettings.keepTemperature;
    updated.tempTolerance = newSettings.tempTolerance;
  }));
  // return res
}