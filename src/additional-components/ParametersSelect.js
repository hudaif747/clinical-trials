import { MenuItem } from "@mui/material";
import MDSelect from "components/new/MDSelect";
import { useState } from "react";

function ParametersSelection() {
  const [parameterValue, setParameterValue] = useState("Parameter 1");

  const handleChange = (event) => {
    setParameterValue(event.target.value);
  };

  return (
    <MDSelect
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={parameterValue}
      fullWidth
      onChange={handleChange}
      sx={{ padding: "5px" }}
    >
      <MenuItem value={"Parameter 1"}>Parameter 1</MenuItem>
      <MenuItem value={"Parameter 2"}>Parameter 2 </MenuItem>
      <MenuItem value={"Parameter 3"}>Parameter 3</MenuItem>
    </MDSelect>
  );
}

export default ParametersSelection;
