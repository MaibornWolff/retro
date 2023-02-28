import React, { useState } from "react";
import { Build } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";

import { usePokerContext } from "../context/PokerContext";
import { PokerUnit, PokerUnitType } from "../types/pokerTypes";
import { useUserContext } from "../../common/context/UserContext";
import { useFullscreen } from "../../retro/hooks/useFullscreen";

function getValueText(value: number) {
  return `${value}`;
}

const PokerPointsSetupButton = React.forwardRef((_props: any, ref: any) => {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const { pokerState, handleSetPokerUnit } = usePokerContext();
  const [pokerUnit, setPokerUnit] = useState(pokerState.pokerUnit.unitType);
  const [unitRange, setUnitRange] = useState<number>(pokerState.pokerUnit.unitRangeHigh);
  const theme = useTheme();
  const fullScreen = useFullscreen();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleUnitChange(event: SelectChangeEvent) {
    setPokerUnit(event.target.value as PokerUnitType);
  }

  function handleFibRangeChange(event: any, newValue: number | number[]) {
    setUnitRange(newValue as number);
  }

  function handleSubmit() {
    const newPokerUnit: PokerUnit = { unitType: pokerUnit, unitRangeHigh: unitRange };
    handleSetPokerUnit(newPokerUnit);
    closeDialog();
  }

  return (
    <>
      <MenuItem
        ref={ref}
        aria-label="Change Poker Unit"
        color="primary"
        onClick={openDialog}
        disabled={user.role !== "moderator"}
      >
        <ListItemIcon>
          <Build fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Change Poker Unit" />
      </MenuItem>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="poker-unit-dialog"
      >
        <DialogTitle id="poker-unit-dialog">Change Poker Unit</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            sx={{
              marginBottom: theme.spacing(1),
            }}
          >
            <InputLabel id="poker-unit-select-label">Poker Unit</InputLabel>
            <Select
              labelId="poker-unit-select-label"
              id="poker-unit-select"
              value={pokerUnit}
              onChange={handleUnitChange}
            >
              <MenuItem value="fibonacci">Fibonacci</MenuItem>
              <MenuItem value="tshirt">T-Shirt Size</MenuItem>
              <MenuItem value="naturalnumbers">Natural Numbers</MenuItem>
            </Select>
          </FormControl>
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
          <Button color="primary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default PokerPointsSetupButton;
