import React from "react";
import { Skeleton } from "@material-ui/lab";

export default function BlurredItem() {
  return <Skeleton variant="rect" width={360} height={180} animation={false} />;
}
