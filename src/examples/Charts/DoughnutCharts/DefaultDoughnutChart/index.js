/**
=========================================================
* Material Dashboard 2  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// DefaultDoughnutChart configurations
import configs from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs";
import { CircularProgress, Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import doughnutChartTable from "layouts/tables/data/doughnutChartTable";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, ChartDataLabels);

function DefaultDoughnutChart({
  icon,
  title1,
  title2,
  description1,
  description2,
  height,
  chart1,
  chart2,
  loading,
}) {
  const { data: data1, options: options1 } = configs(
    chart1.labels || [],
    chart1.datasets || {},
    chart1.cutout
  );
  const { data: data2, options: options2 } = configs(
    chart2.labels || [],
    chart2.datasets || {},
    chart2.cutout
  );

  // console.log("From chart", data);

  const { columns, rows } = doughnutChartTable();

  const renderChart = (
    <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      <Grid container display={"flex"}>
        <Grid item xs={6}>
          {title1 || description1 ? (
            <MDBox display="flex" px={description1 ? 1 : 0} pt={description1 ? 1 : 0}>
              {icon.component && (
                <MDBox
                  width="4rem"
                  height="4rem"
                  bgColor={icon.color || "dark"}
                  variant="gradient"
                  coloredShadow={icon.color || "dark"}
                  borderRadius="xl"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  mt={-5}
                  mr={2}
                >
                  <Icon fontSize="medium">{icon.component}</Icon>
                </MDBox>
              )}
              <MDBox mt={icon.component ? -2 : 0}>
                {title1 && <MDTypography variant="h6">{title1}</MDTypography>}
                <MDBox mb={2}>
                  <MDTypography component="div" variant="button" color="text">
                    {description1}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          ) : null}
          {useMemo(
            () => (
              <MDBox height={height} display="flex" justifyContent="center" alignItems="center">
                {loading ? (
                  <CircularProgress size={60} />
                ) : (
                  <Doughnut data={data1} options={options1} redraw />
                )}
              </MDBox>
            ),
            [chart1, height, loading]
          )}
        </Grid>
        <Grid item xs={6}>
          {title2 || description2 ? (
            <MDBox display="flex" px={description2 ? 1 : 0} pt={description2 ? 1 : 0}>
              {/* {icon.component && (
                <MDBox
                  width="4rem"
                  height="4rem"
                  bgColor={icon.color || "dark"}
                  variant="gradient"
                  coloredShadow={icon.color || "dark"}
                  borderRadius="xl"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  mt={-5}
                  mr={2}
                >
                  <Icon fontSize="medium">{icon.component}</Icon>
                </MDBox>
              )} */}
              <MDBox mt={icon.component ? -2 : 0}>
                {title2 && <MDTypography variant="h6">{title2}</MDTypography>}
                <MDBox mb={2}>
                  <MDTypography component="div" variant="button" color="text">
                    {description2}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          ) : null}
          {useMemo(
            () => (
              <MDBox height={height} display="flex" justifyContent="center" alignItems="center">
                {loading ? (
                  <CircularProgress size={60} />
                ) : (
                  <Doughnut data={data2} options={options2} redraw />
                )}
              </MDBox>
            ),
            [chart2, height, loading]
          )}
        </Grid>
        {/* Table for doughnut <Grid item xs={6}>
          <MDBox pt={3}>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </MDBox>
        </Grid> */}
      </Grid>
    </MDBox>
  );

  return title1 || description1 ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of DefaultDoughnutChart
DefaultDoughnutChart.defaultProps = {
  icon: { color: "info", component: "" },
  title1: "",
  description1: "",
  title2: "",
  description2: "",
  height: "19.125rem",
};

// Typechecking props for the DefaultDoughnutChart
DefaultDoughnutChart.propTypes = {
  icon: PropTypes.shape({
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
    component: PropTypes.node,
  }),
  title1: PropTypes.string,
  description1: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title2: PropTypes.string,
  description2: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart1: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  chart2: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  loading: PropTypes.bool,
};

export default DefaultDoughnutChart;
