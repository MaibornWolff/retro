import React, { useContext, useState } from "react";
import BuildIcon from "@material-ui/icons/Build";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useMediaQuery,
  useTheme,
  Button,
  InputLabel,
  Select,
  FormControl,
  Typography,
  Slider,
  makeStyles,
} from "@material-ui/core";

import { PokerContext } from "../../context/PokerContext";
import { POKER_ROLE_MODERATOR } from "../../utils/poker.utils";
import { SET_POKER_UNIT } from "../../constants/event.constants";
import {
  POKER_UNIT_FIBONACCI,
  POKER_UNIT_TSHIRT,
  POKER_UNIT_NATURAL_NUMBERS,
} from "../../constants/poker.constants";

function getValueText(value: number) {
  return `${value}`;
}

const useStyles = makeStyles((theme) => ({
  unitSelector: {
    marginBottom: theme.spacing(1),
  },
}));

const PokerPointsSetupButton = React.forwardRef((_props: any, ref: any) => {
  const [open, setOpen] = useState(false);
  const [pokerUnit, setPokerUnit] = useState("");
  const [unitRange, setUnitRange] = useState<number>(0);
  const { pokerState, socket, pokerId } = useContext(PokerContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    resetState();
    setOpen(false);
  }

  function resetState() {
    setPokerUnit("");
    setUnitRange(0);
  }

  function handleUnitChange(event: React.ChangeEvent<{ value: unknown }>) {
    setPokerUnit(event.target.value as string);
  }

  function handleFibRangeChange(event: any, newValue: number | number[]) {
    setUnitRange(newValue as number);
  }

  function handleSubmit() {
    socket.emit(SET_POKER_UNIT, pokerUnit, unitRange, pokerId);
    closeDialog();
  }

  return (
    <>
      <MenuItem
        ref={ref}
        aria-label="Change Poker Unit"
        color="primary"
        onClick={openDialog}
        disabled={pokerState.role !== POKER_ROLE_MODERATOR}
      >
        <ListItemIcon>
          <BuildIcon fontSize="small" />
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
          <FormControl fullWidth className={classes.unitSelector}>
            <InputLabel id="poker-unit-select-label">Poker Unit</InputLabel>
            <Select
              labelId="poker-unit-select-label"
              id="poker-unit-select"
              value={pokerUnit}
              onChange={handleUnitChange}
            >
              <MenuItem value={POKER_UNIT_FIBONACCI}>Fibonacci</MenuItem>
              <MenuItem value={POKER_UNIT_TSHIRT}>T-Shirt Size</MenuItem>
              <MenuItem value={POKER_UNIT_NATURAL_NUMBERS}>
                Natural Numbers
              </MenuItem>
            </Select>
          </FormControl>
          {pokerUnit === POKER_UNIT_TSHIRT ? null : (
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
