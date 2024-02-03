/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import doughnutChartData1 from "layouts/dashboard/data/doughnutChartData1";
import doughnutChartData2 from "layouts/dashboard/data/doughnutChartData2";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ParametersCard from "examples/Cards/new/ParametersCard";
import ParametersCardDate from "examples/Cards/new/ParametersCardDate";
import doughnutDataTransformer from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs/doughnutDataTransformer";
import { useDataContext } from "context/dataContext";
import React, { useMemo } from "react";
import parametersArray from "../../static/parameters.json";
import ParametersCardInput from "examples/Cards/new/ParametersCardInput";
import ParametersCardTextArea from "examples/Cards/new/ParametersCardTextArea";
import MDButton from "components/MDButton";
import { useAppDataContext } from "context/appDataContext";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { state: dataContext } = useDataContext();
  const { state: appDataContext } = useAppDataContext();
  const donutChartData = useMemo(() => {
    return doughnutDataTransformer(dataContext);
  }, [dataContext]);

  const {
    updatePredictionTitle,
    updatePredictionSummary,
    updateSponsor,
    updatePhase,
    updateCondition,
    updateEnrollment,
    updateDate,
    submit,
  } = useAppDataContext();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCardTextArea
                icon="leaderboard"
                title="Title"
                count="2,300"
                color="warning"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
                description={"Title for the prediction"}
                defaultText={appDataContext.predictionTitle}
                updateFunction={updatePredictionTitle}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCardTextArea
                color="secondary"
                icon="leaderboard"
                title="Summary"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
                description={"Summary for the prediction"}
                defaultText={appDataContext.predictionSummary}
                updateFunction={updatePredictionSummary}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCard
                color="dark"
                icon="weekend"
                title="Sponsor"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
                description={"Name of the sponsor company"}
                parametersArray={parametersArray.sponsor}
                selectedParameter={appDataContext.sponsor}
                updateParameter={updateSponsor}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCard
                icon="leaderboard"
                title="Phase"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
                description={"Current phase of the trial"}
                parametersArray={parametersArray.phase}
                selectedParameter={appDataContext.phase}
                updateParameter={updatePhase}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCardDate
                color="success"
                icon="store"
                title="Start Date"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
                description={"Start Month and Year of the trial"}
                selectedDate={appDataContext.startDate}
                updateDate={updateDate}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCardInput
                color="primary"
                icon="person_add"
                title="Enrollment"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
                description="Number of participants in the trials"
                providedInput={appDataContext.enrollment}
                inputChange={updateEnrollment}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ParametersCard
                icon="leaderboard"
                color="error"
                title="Condition"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
                description={"Type of the medical condition"}
                parametersArray={parametersArray.condition}
                selectedParameter={appDataContext.condition}
                updateParameter={updateCondition}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              pb={1.5}
            >
              <MDButton
                variant={"contained"}
                color={"info"}
                // fullWidth
                // style={{ flex: 1 }}
                size={"large"}
                onClick={submit}
              >
                Predict
              </MDButton>
            </MDBox>
          </Grid>
          {/* Placeholder card * Idea to add a transparent additional parameter card/}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <TransparentPlaceholder />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <DefaultDoughnutChart
                  icon={{ color: "warning", component: "donut_large" }}
                  title1="All Probabilities"
                  description1="Probabilities of all status"
                  title2="Success or Failure Probabilities"
                  description2="Probabilities of success and failure status"
                  height="18rem"
                  chart={doughnutChartData1}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
