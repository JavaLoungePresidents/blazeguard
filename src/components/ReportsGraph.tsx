//Saymon
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Container, Row, Col } from "react-bootstrap";

const graphTitle = "Count(Amount of Fires) Vs. Days";
let data = {
  latitude: 42.12345678,
  longitude: -73.98765432,
};

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

    return Mydata;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function groupChartDataByDay(chartData: any[]) {
  const groupedData: any[] = [];
  const dayCounts: { [key: string]: number } = {};

  chartData.forEach((item) => {
    const date = new Date(item.report_datetime);
    const day = date.getDate().toString().padStart(2, "0");

    if (dayCounts.hasOwnProperty(day)) {
      dayCounts[day]++;
    } else {
      dayCounts[day] = 1;
    }
  });
  for (const day in dayCounts) {
    if (dayCounts.hasOwnProperty(day)) {
      groupedData.push({ day, count: dayCounts[day] });
    }
  }
  groupedData.sort((a, b) => (a.day < b.day ? -1 : 1));
  return groupedData;
}

interface Coordinates {
  coordinates: {
    lat: number;
    lng: number;
  };
}

function ReportsGraph({ coordinates }: Coordinates) {
  const [chartData, setChartData] = useState<{ Day: string; count: number }[]>([]);

  useEffect(() => {
    data.latitude = coordinates.lat;
    data.longitude = coordinates.lng;
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
                <Area type="monotone" dataKey="count" stroke="#f00f1e" fill="#000" />
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

export default ReportsGraph;
