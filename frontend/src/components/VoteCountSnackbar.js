import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";
import { UserContext } from "../context/UserContext";

function VoteCountSnackbar(props) {
  const { id, open, handleClose, autoHideDuration } = props;
  const { userState } = useContext(UserContext);

  function closeSnackbar() {
    handleClose();
  }

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
        <span id="vote-count-snackbar">
          You have {userState.votesLeft} votes left.
        </span>
      }
    />
  );
}

export default VoteCountSnackbar;
