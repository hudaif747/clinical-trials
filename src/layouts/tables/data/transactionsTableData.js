import axios from "axios";
import dayjs from "dayjs";

export default async function data() {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  try {
    // Make the GET request to fetch data
    const response = await axios.get(`${apiUrl}/get_history`);

    const getMonthName = (numericMonth) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const index = parseInt(numericMonth, 10) - 1; // Adjust for 0-based index
      return months[index] || "";
    };

    // Check if the response is successful (status code 200)
    if (response.status === 200) {
      // Extract the data from the response
      const fetchedData = response.data;

      // Map the fetched data to match the structure of your rows
      const mappedData = fetchedData.map((item) => ({
        id: item.id,
        datetime: dayjs(item.datetime).format("YYYY-MM-DD"),
        sponsor: item.sponsor,
        phase: item.phase,
        startYear: item.start_year,
        startMonth: getMonthName(item.start_month),
        enrollment: item.enrollment,
        conditions: item.condition,
        predictedStatus: item.predicted_status,
        predictedStatusWithoutCombine: item.predicted_status_without_combine,
      }));

      // Return the updated data structure with columns and mapped rows
      return {
        columns: [
          { Header: "ID", accessor: "id", width: "5%", align: "center" },
          { Header: "Date", accessor: "datetime", width: "10%", align: "left" },
          { Header: "Sponsor", accessor: "sponsor", width: "15%", align: "left" },
          { Header: "Phase", accessor: "phase", width: "10%", align: "left" },
          { Header: "Start Year", accessor: "startYear", width: "8%", align: "center" },
          { Header: "Start Month", accessor: "startMonth", width: "8%", align: "center" },
          { Header: "Enrollment", accessor: "enrollment", width: "10%", align: "center" },
          { Header: "Conditions", accessor: "conditions", width: "10%", align: "left" },
          {
            Header: "Predicted Status",
            accessor: "predictedStatus",
            width: "10%",
            align: "center",
          },
          {
            Header: "Predicted Status Without Combine",
            accessor: "predictedStatusWithoutCombine",
            width: "10%",
            align: "center",
          },
        ],
        rows: mappedData,
      };
    } else {
      // Handle other status codes if needed
      console.error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    // Handle errors from the Axios request
    console.error("Error fetching data:", error.message);
  }

  // Return a default structure in case of an error
  return {
    columns: [],
    rows: [],
  };
}
