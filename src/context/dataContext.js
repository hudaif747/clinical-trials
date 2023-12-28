// DataContext.js
import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

// Initial State
const initialState = {
  probabilities: ["Trial Succeeded", "Failed", "Withdrawn"],
  data: [250, 150, 600],
  colors: [],
};

// Action Types
const ADD_PROBABILITY = "ADD_PROBABILITY";
const ADD_DATA = "ADD_DATA";
const ASSIGN_COLORS = "ASSIGN_COLORS";

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case ADD_PROBABILITY:
      return {
        ...state,
        probabilities: [...state.probabilities, action.payload],
      };
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case ASSIGN_COLORS:
      const randomColors = generateRandomColors(state.probabilities.length);
      return {
        ...state,
        colors: randomColors,
      };
    default:
      return state;
  }
};

// function for generating random colors
const generateRandomColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    colors.push(randomColor);
  }
  return colors;
};

// Context
const DataContext = createContext();

// Custom Hook to use the Data Context
const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

// Context Provider
const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  // Assign random colors initially
  React.useEffect(() => {
    assignColors();
  }, []);

  const addProbability = (probability) => {
    dispatch({ type: ADD_PROBABILITY, payload: probability });
  };

  const addData = (datum) => {
    dispatch({ type: ADD_DATA, payload: datum });
  };

  const assignColors = () => {
    dispatch({ type: ASSIGN_COLORS });
  };

  return (
    <DataContext.Provider value={{ state, addProbability, addData }}>
      {children}
    </DataContext.Provider>
  );
};

// Typechecking props for the MaterialUIControllerProvider
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataProvider, useDataContext };
