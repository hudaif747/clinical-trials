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
  prediction: {
    predictions_combined: {
      failed: 0.87,
      success: 0.13,
    },
    predictions_without_combined: {
      active_not_recruiting: 0,
      completed: 0.01,
      enrolling_by_invitation: 0.12,
      not_yet_recruiting: 0.11,
      recruiting: 0,
      suspended: 0.02,
      terminated: 0.01,
      unknown_status: 0,
      withdrawn: 0.73,
    },
  },
  graphData: {
    line_graph: {
      mon: 3,
      tue: 3,
      wed: 6,
      thurs: 7,
      fri: 5,
      sat: 8,
      sun: 8,
    },
    bar_graph: {
      completed: 3,
      enrolling_by_invitation: 3,
      recruiting: 6,
      withdrawn: 7,
      not_yet_recruiting: 5,
      terminated: 8,
      suspended: 8,
      active_not_recruiting: 3,
      unknown_status: 3,
    },
  },
};

// Action Types
const UPDATE_PREDICTION_TITLE = "UPDATE_PREDICTION_TITLE";
const UPDATE_PREDICTION_SUMMARY = "UPDATE_PREDICTION_SUMMARY";
const UPDATE_SPONSOR = "UPDATE_SPONSOR";
const UPDATE_PHASE = "UPDATE_PHASE";
const UPDATE_ENROLLMENT = "UPDATE_ENROLLMENT";
const UPDATE_CONDITION = "UPDATE_CONDITION";
const UPDATE_DATE = "UPDATE_DATE";
const UPDATE_PREDICTIONS = "UPDATE_PREDICTIONS";
const UPDATE_GRAPHDATA = "UPDATE_GRAPHDATA";
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

    // update predictions
    case UPDATE_PREDICTIONS:
      return {
        ...state,
        prediction: action.payload,
      };
    // update graph data
    case UPDATE_GRAPHDATA:
      return {
        ...state,
        graphData: action.payload,
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

  // update predictions
  const updatePredictions = (predictions) => {
    const transformedObj = {};

    // Transform keys in predictions_combined
    transformedObj["predictions_combined"] = {
      failed: predictions["predictions_combined"]["Failed"],
      success: predictions["predictions_combined"]["Success"],
    };

    // Transform keys in predictions_without_combined
    transformedObj["predictions_without_combined"] = {
      active_not_recruiting: predictions["predictions_without_combined"]["Active, not recruiting"],
      completed: predictions["predictions_without_combined"]["Completed"],
      enrolling_by_invitation:
        predictions["predictions_without_combined"]["Enrolling by invitation"],
      not_yet_recruiting: predictions["predictions_without_combined"]["Not yet recruiting"],
      recruiting: predictions["predictions_without_combined"]["Recruiting"],
      suspended: predictions["predictions_without_combined"]["Suspended"],
      terminated: predictions["predictions_without_combined"]["Terminated"],
      unknown_status: predictions["predictions_without_combined"]["Unknown status"],
      withdrawn: predictions["predictions_without_combined"]["Withdrawn"],
    };
    dispatch({ type: UPDATE_PREDICTIONS, payload: transformedObj });
  };

  const updateGraphData = (graphData) => {
    function transformKeys(obj) {
      const transformed = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const transformedKey = key.toLowerCase().replace(/ /g, "_").replace(/,/, "");
          transformed[transformedKey] = obj[key];
        }
      }
      return transformed;
    }

    // Transforming each key in the 'line_graph' and 'bar_graph' objects
    if (graphData.line_graph) {
      graphData.line_graph = transformKeys(graphData.line_graph);
    }
    if (graphData.bar_graph) {
      graphData.bar_graph = transformKeys(graphData.bar_graph);
    }

    dispatch({ type: UPDATE_GRAPHDATA, payload: graphData });
  };

  const submit = () => {
    // console.log("current context state: ", state);
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
        updatePredictions,
        updateGraphData,
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
