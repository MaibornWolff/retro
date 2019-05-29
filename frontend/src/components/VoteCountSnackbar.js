import React from "react";
import { Snackbar } from "@material-ui/core";

const VoteCountSnackbar = props => {
  const { open, handleClose, autoHideDuration, id, voteCount } = props;

  const closeSnackbar = () => {
    handleClose();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={closeSnackbar}
      autoHideDuration={autoHideDuration}
      ContentProps={{
        "aria-describedby": id
      }}
      message={
        <span id="vote-count-snackbar">You have {voteCount} votes left.</span>
      }
    />
  );
};

export default VoteCountSnackbar;
