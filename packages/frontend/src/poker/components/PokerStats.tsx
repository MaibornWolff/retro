import React, { useEffect, useState } from "react";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import { Grid } from "@mui/material";
import { usePokerContext } from "../context/PokerContext";
import { ChartData } from "../types/pokerTypes";
import { generateChartData } from "../utils/pokerUtils";

export default function PokerStats() {
  const { pokerState } = usePokerContext();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const chartData = pokerState.showResults
      ? generateChartData(pokerState.votes, pokerState.pokerUnit)
      : [];
    setChartData(chartData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokerState.showResults]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          // tick={{ fontSize: "10px", width: "50px" }}
          interval={0}
        />
        <Tooltip cursor={false} />
        <Legend />
        <Bar name="number of votes" dataKey="value" fill="#8884d8" />
      </BarChart>
    </Grid>
  );
}
