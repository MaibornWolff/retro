import React, { useState } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { Fab, withMobileDialog, withStyles } from "@material-ui/core";
import { DropzoneDialog } from "material-ui-dropzone";
import { upload } from "../../utils";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

function LoadBoardDialog(props) {
  const { classes, fullScreen, history } = props;
  const [open, setOpen] = useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  async function handleSubmit(files) {
    const response = await upload(files[0]);
    if (response.ok) {
      const json = await response.json();
      const boardId = json.boardId;
      history.push({ pathname: `/boards/${boardId}`, state: { isImport: true } });
    } else {
      alert("Something went wrong.... :(");
    }
  }

  return (
    <>
      <Fab
        size="medium"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
      >
        <ArrowUpwardIcon className={classes.icon} />
        Load Template
      </Fab>
      <DropzoneDialog
        open={open}
        fullScreen={fullScreen}
        onSave={(files) => handleSubmit(files)}
        acceptedFiles={["application/json"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={closeDialog}
        filesLimit={1}
        useChipsForPreview
      />
    </>
  );
}

export default compose(withRouter, withMobileDialog(), withStyles(styles))(LoadBoardDialog);
