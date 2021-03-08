import React from "react";
import { PokerChartData } from "../../types/common.types";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import { Grid } from "@material-ui/core";

interface PokerStatsProps {
  data: PokerChartData;
}

export default function PokerStats(props: PokerStatsProps) {
  const { data } = props.data;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <BarChart
        width={600}
        height={300}
        data={data}
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
