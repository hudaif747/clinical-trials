import PropTypes from "prop-types";
import { MenuItem } from "@mui/material";
import MDSelect from "components/new/MDSelect";
import { useState } from "react";

function ParametersSelection({ parameters, selectedParameter, updateParameter }) {
  const handleChange = (event) => {
    updateParameter(event.target.value);
  };
  return (
    <MDSelect
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedParameter}
      fullWidth
      onChange={handleChange}
      sx={{ padding: "5px" }}
    >
      {Array.isArray(parameters) && parameters.length > 0 ? (
        parameters.map((param, index) => (
          <MenuItem key={index} value={param}>
            {param}
          </MenuItem>
        ))
      ) : (
        <p>No parameters available.</p>
      )}
    </MDSelect>
  );
}

export default ParametersSelection;

ParametersSelection.propTypes = {
  parameters: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedParameter: PropTypes.string,
  updateParameter: PropTypes.func,
};
