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
  const [fetchTime, setFetchTime] = useState(new Date());

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

  const [chartLoading, setChartLoading] = useState(false);
  const [barChartData, setBarChartData] = useState(
    convertBarGraphData(appDataContext.graphData.bar_graph)
  );
  const [lineChartData, setLineChartData] = useState(
    convertLineGraphData(appDataContext.graphData.line_graph)
  );
  const [errorChartSB, setErrorChartSB] = useState(false);
  const closeErrorChartSB = () => setErrorChartSB(false);

  const [updateMessage, setUpdateMessage] = useState("Updation time");

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
    updateGraphData,
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

  const renderErrorChartSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Failed to fetch Graph Chart."
      content="Failed to fetch graph charts. Displaying previous data."
      // dateTime="11 mins ago"
      open={errorChartSB}
      onClose={closeErrorChartSB}
      close={closeErrorChartSB}
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

  const getGraphData = () => {
    setChartLoading(true);
    axios
      .get(`${apiUrl}/get_graph_data`)
      .then((response) => {
        // Handle the response data
        setFetchTime(new Date());
        updateGraphData(response.data);
        setChartLoading(false);
      })
      .catch((error) => {
        // Handle errors
        setErrorChartSB(true);
        console.error("Error getting bar graph data:", error);
        setChartLoading(false);
      });
  };

  const updateFetchTime = (fetchTime) => {
    const message = timeSince(fetchTime);
    setUpdateMessage(message);
  };

  // useEffect(() => {
  //   updateFetchTime(fetchTime);
  // }, [fetchTime]);

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

  useEffect(() => {
    setBarChartData(convertBarGraphData(appDataContext.graphData.bar_graph));
    setLineChartData(convertLineGraphData(appDataContext.graphData.line_graph));
  }, [appDataContext.graphData]);

  // for checking sync time
  useEffect(() => {
    getGraphData();
    // You might also want to set up an interval to regularly update the message
    const interval = setInterval(() => {
      if (updateMessage !== "Updation time") {
        updateFetchTime(fetchTime);
      }
    }, 1000); // Update every minute

    return () => clearInterval(interval);
  }, []);

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
                  getGraphData();
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
                  title="weekly activity"
                  description={<>Predictions done on a weekly basis.</>}
                  date={updateMessage}
                  loading={chartLoading}
                  chart={lineChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Predictions overview"
                  description="Overview of the past predictions "
                  date={updateMessage}
                  loading={chartLoading}
                  chart={barChartData}
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
      {renderErrorChartSB}
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

const convertBarGraphData = (barGraphData) => {
  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) =>
    str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Extracting labels by transforming keys
  const labels = Object.keys(barGraphData).map((key) => capitalizeWords(key));

  // Extracting data in the same order as labels
  const data = Object.values(barGraphData);

  // Constructing the result object
  return {
    labels: labels,
    datasets: {
      label: "Predictions Overview",
      data: data,
    },
  };
};
const convertLineGraphData = (barGraphData) => {
  // Function to capitalize the first letter of each word
  const capitalizeWords = (str) =>
    str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Extracting labels by transforming keys
  const labels = Object.keys(barGraphData).map((key) => capitalizeWords(key));

  // Extracting data in the same order as labels
  const data = Object.values(barGraphData);

  // Constructing the result object
  return {
    labels: labels,
    datasets: {
      label: "Weekly Activity",
      data: data,
    },
  };
};

//functions to fetch sync time

const timeSince = (fetchTime) => {
  const now = new Date();
  const difference = now - fetchTime; // Difference in milliseconds
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `was updated ${hours} hour(s) ago`;
  } else if (minutes > 0) {
    return `was updated ${minutes} min(s) ago`;
  } else {
    return `was updated ${seconds} second(s) ago`;
  }
};
