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
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import doughnutChartData1 from "layouts/dashboard/data/doughnutChartData1";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

// Dashboard components
import ParametersCard from "examples/Cards/new/ParametersCard";
import ParametersCardDate from "examples/Cards/new/ParametersCardDate";
import doughnutDataTransformer from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs/doughnutDataTransformer";
import { useDataContext } from "context/dataContext";
import { useEffect, useMemo, useState } from "react";
import parametersArray from "../../static/parameters.json";
import ParametersCardInput from "examples/Cards/new/ParametersCardInput";
import ParametersCardTextArea from "examples/Cards/new/ParametersCardTextArea";
import MDButton from "components/MDButton";
import { useAppDataContext } from "context/appDataContext";
import axios from "axios";
import MDSnackbar from "components/MDSnackbar";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const { state: dataContext } = useDataContext();
  const { state: appDataContext } = useAppDataContext();

  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSB = () => setSuccessSB(false);

  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);

  const [donutLoading, setDonutLoading] = useState(false);
  const [chartData1, setChartData1] = useState(
    convertPredictionsToChartDataForChart1(appDataContext.prediction.predictions_without_combined)
  );
  const [chartData2, setChartData2] = useState(
    convertPredictionsToChartDataForChart2(appDataContext.prediction.predictions_combined)
  );
  const { sales, tasks } = reportsLineChartData;
  // const donutChartData = useMemo(() => {
  //   return doughnutDataTransformer(dataContext);
  // }, [dataContext]);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("active");
    if (isAuthenticated == "false" || isAuthenticated === null) {
      navigate("/authentication/sign-in");
    }
  });

  const {
    updatePredictionTitle,
    updatePredictionSummary,
    updateSponsor,
    updatePhase,
    updateCondition,
    updateEnrollment,
    updateDate,
    updatePredictions,
    submit,
  } = useAppDataContext();

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content="Prediciton results succesfully fetched!"
      // dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Failed to fetch."
      content="Failed to fetch prediction. Displaying previous prediction."
      // dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const apiUrl = process.env.REACT_APP_API_ENDPOINT;

  const getPredictions = () => {
    setDonutLoading(true);
    const requestBody = dataTransformer(appDataContext);
    axios
      .post(`${apiUrl}/get_predictions`, requestBody)
      .then((response) => {
        // Handle the response data
        setSuccessSB(true);
        updatePredictions(response.data);
        setDonutLoading(false);
      })
      .catch((error) => {
        // Handle errors
        setErrorSB(true);
        console.error("Error making predictions:", error);
        setDonutLoading(false);
      });
  };

  const dataTransformer = (inputObject) => {
    const sponsor = inputObject.sponsor;
    const phase = inputObject.phase;
    const [startYear, startMonth] = inputObject.startDate.split("-"); // Extracting year and month from startDate
    const enrollment = inputObject.enrollment;
    const condition = inputObject.condition;

    // Creating the desired output object
    const outputObject = {
      rows: [sponsor, phase, startYear, startMonth, enrollment, condition],
    };
    return outputObject;
  };

  useEffect(() => {
    setChartData1(
      convertPredictionsToChartDataForChart1(appDataContext.prediction.predictions_without_combined)
    );
    setChartData2(
      convertPredictionsToChartDataForChart2(appDataContext.prediction.predictions_combined)
    );
  }, [appDataContext.prediction]);

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
                onClick={() => {
                  getPredictions();
                }}
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
                  chart1={chartData1}
                  chart2={chartData2}
                  loading={donutLoading}
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
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Dashboard;

// Utilities;

const convertPredictionsToChartDataForChart1 = (predictions) => {
  const labels = Object.keys(predictions).map((key) => {
    // Transform key by removing underscores and capitalizing first letters
    const transformedKey = key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());
    return transformedKey;
  });

  const datasets = {
    label: "All Probabilities",
    data: Object.values(predictions),
  };

  // // Map the percentages to the corresponding labels
  // labels.forEach((label) => {
  //   datasets.data.push(predictions[label.toLowerCase()]);
  // });

  return { labels, datasets };
};
const convertPredictionsToChartDataForChart2 = (predictions) => {
  const labels = ["Success", "Failed"];
  const datasets = {
    label: "Success Probabilities",
    data: [],
  };

  // Map the probabilities to the corresponding labels
  datasets.data.push(predictions.success); // Success
  datasets.data.push(predictions.failed); // Failed

  return { labels, datasets };
};
