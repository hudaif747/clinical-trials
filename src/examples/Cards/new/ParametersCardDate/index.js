/**  This is going to be the parameters card in the dashboar*/
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ParametersSelection from "additional-components/ParametersSelect";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

function ParametersCardDate({
  color,
  title,
  count,
  percentage,
  icon,
  description,
  selectedDate,
  updateDate,
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["month", "year"]}
                defaultValue={dayjs(selectedDate)}
                sx={{
                  ".MuiInputBase-input": { padding: "5px 10px 5px 10px" },
                }}
                onChange={(event) => {
                  updateDate(dayjs(event).format("YYYY-MM"));
                }}
              />
            </LocalizationProvider>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          {/* <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography> */}
          {/* &nbsp;{percentage.label} */}
          {description}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ParametersCardDate
ParametersCardDate.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ParametersCardDate
ParametersCardDate.propTypes = {
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
  selectedDate: PropTypes.string,
  updateDate: PropTypes.func,
};

export default ParametersCardDate;
