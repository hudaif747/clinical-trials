import React, { createContext, useReducer, useContext } from "react";
import parametersArray from "../static/parameters.json";
import PropTypes from "prop-types";

// Create a new Date object
var today = new Date();

// Get the components of the date
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, "0"); // Zero-padding for single-digit months

// Combine the components into the desired format
var formattedDate = `${year}-${month}`;

// Initial State
const initialState = {
  predictionTitle: "Prediction Title",
  predictionSummary: "Prediction Summary",
  sponsor: parametersArray.sponsor[0],
  phase: parametersArray.phase[0],
  startDate: formattedDate,
  enrollment: "6000",
  condition: parametersArray.condition[0],
};

// Action Types
const UPDATE_PREDICTION_TITLE = "UPDATE_PREDICTION_TITLE";
const UPDATE_PREDICTION_SUMMARY = "UPDATE_PREDICTION_SUMMARY";
const UPDATE_SPONSOR = "UPDATE_SPONSOR";
const UPDATE_PHASE = "UPDATE_PHASE";
const UPDATE_ENROLLMENT = "UPDATE_ENROLLMENT";
const UPDATE_CONDITION = "UPDATE_CONDITION";
const UPDATE_DATE = "UPDATE_DATE";
// Add other action types as needed

// Reducer function
const appDataReducer = (state, action) => {
  switch (action.type) {
    // update prediction title
    case UPDATE_PREDICTION_TITLE:
      return {
        ...state,
        predictionTitle: action.payload,
      };
    // update prediction summary
    case UPDATE_PREDICTION_SUMMARY:
      return {
        ...state,
        predictionSummary: action.payload,
      };
    // update spopnsor value
    case UPDATE_SPONSOR:
      return {
        ...state,
        sponsor: action.payload,
      };
    // update PHASE value
    case UPDATE_PHASE:
      return {
        ...state,
        phase: action.payload,
      };
    // update CONDITION value
    case UPDATE_CONDITION:
      return {
        ...state,
        condition: action.payload,
      };
    // update ENROLLMENT value
    case UPDATE_ENROLLMENT:
      return {
        ...state,
        enrollment: action.payload,
      };
    // update DATE value
    case UPDATE_DATE:
      return {
        ...state,
        startDate: action.payload,
      };
    default:
      return state;
  }
};

// Context
const AppDataContext = createContext();

// Custom Hook to use the AddData Context
const useAppDataContext = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppDataContext must be used within an AppDataProvider");
  }
  return context;
};

// Context Provider
const AppDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  // update prediction title
  const updatePredictionTitle = (newTitle) => {
    dispatch({ type: UPDATE_PREDICTION_TITLE, payload: newTitle });
  };

  // update prediction summary
  const updatePredictionSummary = (newSummary) => {
    dispatch({ type: UPDATE_PREDICTION_SUMMARY, payload: newSummary });
  };

  // update sponsor
  const updateSponsor = (sponsor) => {
    dispatch({ type: UPDATE_SPONSOR, payload: sponsor });
  };

  // update phase
  const updatePhase = (phase) => {
    dispatch({ type: UPDATE_PHASE, payload: phase });
  };

  // update condition
  const updateCondition = (condition) => {
    dispatch({ type: UPDATE_CONDITION, payload: condition });
  };

  // update enrollment
  const updateEnrollment = (enrollment) => {
    dispatch({ type: UPDATE_ENROLLMENT, payload: enrollment });
  };

  // update date
  const updateDate = (date) => {
    dispatch({ type: UPDATE_DATE, payload: date });
  };

  const submit = () => {
    console.log("current context state: ", state);
  };

  return (
    <AppDataContext.Provider
      value={{
        state,
        updatePredictionTitle,
        updatePredictionSummary,
        updateSponsor,
        updatePhase,
        updateCondition,
        updateEnrollment,
        updateDate,
        submit,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

// Typechecking props for the AppDataProvider
AppDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppDataProvider, useAppDataContext };
