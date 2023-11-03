import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import { useFullscreen } from "../../../retro/hooks/useFullscreen";
import { usePokerContext } from "../../context/PokerContext";
import { CallToActionButton } from "../../../common/components/buttons/CallToActionButton";
import { PokerUnitInput } from "../PokerUnitInput";
import { usePokerUnit } from "../../hooks/usePokerUnit";

export function EstimationUnitSetupDialog({ isOpen, close }: DialogProps) {
  const { handleSetPokerUnit } = usePokerContext();
  const { pokerUnit, unitRange, handleUnitChange, handleFibRangeChange } = usePokerUnit();
  const fullScreen = useFullscreen();

  function handleSubmit() {
    handleSetPokerUnit({ unitType: pokerUnit, unitRangeHigh: unitRange });
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
        <PokerUnitInput
          pokerUnit={pokerUnit}
          unitRange={unitRange}
          onFibRangeChange={handleFibRangeChange}
          onUnitChange={handleUnitChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <CallToActionButton onClick={handleSubmit}>Save</CallToActionButton>
      </DialogActions>
    </Dialog>
  );
}
