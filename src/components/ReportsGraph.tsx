//Saymon
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Container, Row, Col } from "react-bootstrap";

//Dumb Data for testing Purpses
// const data = [
//   { hour: "1PM", count: 10 },
//   { hour: "2PM", count: 3 },
//   { hour: "3PM", count: 2 },
//   { hour: "4PM", count: 5 },
//   { hour: "5PM", count: 1 },
//   { hour: "6PM", count: 2 },
//   { hour: "7PM", count: 3 },
//   { hour: "8PM", count: 6},
//   { hour: "9PM", count: 3 },
//   { hour: "10PM", count: 4 },
//   { hour: "11PM", count: 3 },
//   { hour: "12PM", count: 5 },
// ];
const graphTitle = "Count(Amount of Fires) Vs. Days";
const data = {
  latitude: 42.12345678,
  longitude: -73.98765432,
};
//function to call the api from the backend, fetch data for the last 30 days the nearest in a 100km range
async function fetchDataFromAPI() {
  try {
    const response = await fetch("https://wetca.ca/blaze/report/reports/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const Mydata = await response.json();
    // console.log(Mydata);
    console.log("my data ");
    console.log(Mydata);
    return Mydata;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

//Function to group the data into counts per day, so if 2 fires per day,
//then only one day would be on the graph and it would display a counts value of 2
function groupChartDataByDay(chartData: any[]) {
  const groupedData: any[] = [];
  const dayCounts: { [key: string]: number } = {}; // Object to store counts by day
  console.log(groupedData);
  chartData.forEach((item) => {
    //format date and then day so it stores the entire data in their respective days
    const date = new Date(item.report_datetime);
    const day = date.getDate().toString().padStart(2, "0");
    if (dayCounts.hasOwnProperty(day)) {
      // If the day already exists in the counts, increase the count
      dayCounts[day]++;
    } else {
      // If the day doesn't exist, initialize it with a count of 1
      dayCounts[day] = 1;
    }
  });

  // Convert dayCounts into an array of { day, count } objects
  for (const day in dayCounts) {
    if (dayCounts.hasOwnProperty(day)) {
      groupedData.push({ day, count: dayCounts[day] });
    }
  }
  //since data is pushed into the stack according to how it was stored in the database
  //then
  groupedData.sort((a, b) => (a.day < b.day ? -1 : 1));
  return groupedData;
}

//the main graph, fetches data, parses it into the right format,
//and then displays everything accordingly
function MyFiresChart() {
  const [chartData, setChartData] = useState<{ Day: string; count: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const rawData = await fetchDataFromAPI();
      if (rawData) {
        const processedData = groupChartDataByDay(rawData);
        setChartData(processedData);
      }
    }

    fetchData();
  }, []);
  try {
    return (
      <Container>
        <Row>
          <span>
            <h3>{graphTitle}</h3>
          </span>
          <Col className="graphContainer">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis dataKey="count" />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#f00f1e" fill="#c73938" />
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>
    );
  } catch (error) {
    return <h3>The Graph has no data at the moment!</h3>;
  }
}

export default MyFiresChart;
