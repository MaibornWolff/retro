import React from "react";
import { retroFormatConfig } from "../config/formatConfig";

export function RetroFormatOptions() {
  return (
    <>
      {Object.entries(retroFormatConfig).map(([key, { name }]) => (
        <option value={key} key={key}>
          {name}
        </option>
      ))}
    </>
  );
}
