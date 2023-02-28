import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DialogProps } from "../../../common/types/commonTypes";
import Participants from "../header/Participants";
import { useRetroContext } from "../../context/RetroContext";
import { isEmpty } from "lodash";
import { WaitingList } from "./WaitingList";

export function ParticipantsDialog({ isOpen, close }: DialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { retroState } = useRetroContext();

  const isDividerVisible = !isEmpty(retroState.waitingList) && !isEmpty(retroState.participants);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={isOpen}
      onClose={close}
      aria-labelledby="participants-dialog"
      PaperProps={{
        sx: {
          maxHeight: "60%",
        },
      }}
    >
      {!isEmpty(retroState.waitingList) && (
        <>
          <DialogTitle id="participants-dialog">Waiting for approval</DialogTitle>
          <DialogContent>
            <WaitingList />
          </DialogContent>
        </>
      )}
      {isDividerVisible && <Divider />}
      {!isEmpty(retroState.participants) && (
        <>
          <DialogTitle id="participants-dialog">Participants</DialogTitle>
          <DialogContent>
            <Participants />
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
