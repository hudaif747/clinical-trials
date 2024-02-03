/**  This is going to be the parameters card in the dashboar*/
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function ParametersCardInput({
  color,
  title,
  count,
  percentage,
  icon,
  description,
  providedInput,
  inputChange,
}) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.6}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          {/* <MDTypography variant="h4">{count}</MDTypography> */}
          <MDBox maxWidth={"12rem"}>
            {/* <ParametersSelection parameters={parametersArray} /> */}
            <MDInput
              type="number"
              sx={{
                ".MuiInputBase-input": { padding: "5px 10px 5px 10px" },
              }}
              defaultValue={providedInput}
              onChange={(event) => {
                inputChange(event.target.value);
              }}
            />
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          {description}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ParametersCardInput
ParametersCardInput.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ParametersCardInput
ParametersCardInput.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
  description: PropTypes.string,
  providedInput: PropTypes.string,
  inputChange: PropTypes.func,
};

export default ParametersCardInput;
