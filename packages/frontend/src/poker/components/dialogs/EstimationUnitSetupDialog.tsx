import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { PokerUnit, PokerUnitType } from "../../types/pokerTypes";
import { usePokerContext } from "../../context/PokerContext";

export function EstimationUnitSetupDialog({ isOpen, close }: DialogProps) {
  const { pokerState, handleSetPokerUnit } = usePokerContext();
  const [pokerUnit, setPokerUnit] = useState(pokerState.pokerUnit.unitType);
  const [unitRange, setUnitRange] = useState<number>(pokerState.pokerUnit.unitRangeHigh);
  const theme = useTheme();
  const fullScreen = useFullscreen();

  function handleUnitChange(event: SelectChangeEvent) {
    setPokerUnit(event.target.value as PokerUnitType);
  }

  function handleFibRangeChange(event: any, newValue: number | number[]) {
    setUnitRange(newValue as number);
  }

  function handleSubmit() {
    const newPokerUnit: PokerUnit = { unitType: pokerUnit, unitRangeHigh: unitRange };
    handleSetPokerUnit(newPokerUnit);
    close();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="poker-unit-dialog"
    >
      <DialogTitle id="poker-unit-dialog">Change Poker Unit</DialogTitle>
      <DialogContent>
        <TextField
          select
          id="poker-unit-select"
          value={pokerUnit}
          onChange={() => handleUnitChange}
          label="Poker Unit"
          fullWidth
          sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
        >
          <MenuItem value="fibonacci">Fibonacci</MenuItem>
          <MenuItem value="tshirt">T-Shirt Size</MenuItem>
          <MenuItem value="naturalnumbers">Natural Numbers</MenuItem>
        </TextField>
        {pokerUnit === "tshirt" ? null : (
          <FormControl fullWidth>
            <Typography id="range-slider" gutterBottom>
              Choose your maximum value
            </Typography>
            <Slider
              value={unitRange}
              onChange={handleFibRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={getValueText}
            />
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function getValueText(value: number) {
  return `${value}`;
}
