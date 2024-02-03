/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  return {
    columns: [
      { Header: "id", accessor: "id", width: "5%", align: "center" },
      { Header: "datetime", accessor: "datetime", width: "10%", align: "left" },
      { Header: "sponsor", accessor: "sponsor", width: "15%", align: "left" },
      { Header: "phase", accessor: "phase", width: "10%", align: "left" },
      { Header: "start year", accessor: "startYear", width: "8%", align: "center" },
      { Header: "start month", accessor: "startMonth", width: "8%", align: "center" },
      { Header: "enrollment", accessor: "enrollment", width: "10%", align: "center" },
      { Header: "conditions", accessor: "conditions", width: "10%", align: "left" },
      { Header: "predicted status", accessor: "predictedStatus", width: "10%", align: "center" },
      {
        Header: "predicted status without combine",
        accessor: "predictedStatusWithoutCombine",
        width: "10%",
        align: "center",
      },
    ],

    rows: [
      {
        id: 1,
        datetime: "2024-02-03 09:30:00",
        sponsor: "ABC Corporation",
        phase: "Phase 1",
        startYear: 2023,
        startMonth: "January",
        enrollment: 100,
        conditions: "Normal",
        predictedStatus: "Success",
        predictedStatusWithoutCombine: "Success",
      },
      {
        id: 2,
        datetime: "2024-02-04 14:15:00",
        sponsor: "XYZ Ltd",
        phase: "Phase 2",
        startYear: 2022,
        startMonth: "March",
        enrollment: 75,
        conditions: "High",
        predictedStatus: "Pending",
        predictedStatusWithoutCombine: "Pending",
      },
      {
        id: 3,
        datetime: "2024-02-05 11:45:00",
        sponsor: "LMN Corporation",
        phase: "Phase 3",
        startYear: 2021,
        startMonth: "July",
        enrollment: 120,
        conditions: "Low",
        predictedStatus: "Failure",
        predictedStatusWithoutCombine: "Failure",
      },
    ],
  };
}
