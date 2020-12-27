import React from "react";
import { PokerChartData } from "../../types/common.types";
import { Bar, BarChart, Legend, Tooltip, XAxis } from "recharts";
import { Grid } from "@material-ui/core";

interface PokerStatsProps {
  data: PokerChartData;
}

// TODO: get rid of mostVotedFor
// TODO: handle stats for T-Shirt voting (see if setting in backend is enough)
export default function PokerStats(props: PokerStatsProps) {
  const { pieData, mostVotedFor } = props.data;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <BarChart
        width={400}
        height={300}
        data={pieData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip cursor={false} />
        <Legend />
        <Bar name="number of votes" dataKey="value" fill="#8884d8" />
      </BarChart>
    </Grid>
  );
}
