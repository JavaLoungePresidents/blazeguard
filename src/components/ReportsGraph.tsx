import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Container, Row, Col } from "react-bootstrap";

const graphTitle = "Count (Number of Fires) vs. Days";

interface ReportsGraphProps {
  reports: any;
  fires: any;
}

function groupChartDataByDay(chartData: ReportsGraphProps) {
  const groupedData: any[] = [];
  const dayCounts: { [key: string]: number } = {};
  console.log(chartData);
  if ((chartData && chartData.reports) || chartData.fires) {
    chartData.reports.forEach((item: any) => {
      const date = new Date(item.report_datetime);
      const day = date.getDate().toString().padStart(2, "0");

      if (dayCounts.hasOwnProperty(day)) {
        dayCounts[day]++;
      } else {
        dayCounts[day] = 1;
      }
    });
    chartData.fires.forEach((item: any) => {
      const date = new Date(item.acq_date);
      const day = item.acq_date.split("-")[2];
      date.setDate(parseInt(day));

      if (dayCounts.hasOwnProperty(day)) {
        dayCounts[day]++;
      } else {
        dayCounts[day] = 1;
      }
    });
  }
  for (const day in dayCounts) {
    if (dayCounts.hasOwnProperty(day)) {
      groupedData.push({ day, count: dayCounts[day] });
    }
  }

  groupedData.sort((a, b) => parseInt(a.day) - parseInt(b.day));
  console.log(groupedData);
  return groupedData;
}

function ReportsGraph(fireData: ReportsGraphProps) {
  const [dayChartData, setDayChartData] = useState<
    { day: string; count: number }[]
  >([]);

  useEffect(() => {
    if (fireData.fires.length === 0 && fireData.reports.length === 0) {
      setDayChartData([{ day: "0", count: 0 }]);
      return;
    }
    if (fireData.reports.length === 0) return;
    setDayChartData(groupChartDataByDay(fireData));
  }, [fireData]);

  try {
    return (
      <Container>
        <Row>
          <span>
            <h3>{graphTitle}</h3>
          </span>
          <Col className="graph-container">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={dayChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis dataKey="count" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#f00f1e"
                  fill="url(#orangeGradient)"
                />
                <defs>
                  <linearGradient
                    id="orangeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ff8c00" />
                    <stop offset="100%" stopColor="#ff4500" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>
    );
  } catch (error) {
    console.error(error);
  }
}

export default ReportsGraph;
