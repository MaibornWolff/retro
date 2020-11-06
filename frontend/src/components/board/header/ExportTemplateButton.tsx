import React, { useState, useContext } from "react";
import ExportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
  MenuItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Divider,
} from "@material-ui/core";

import { UserContext } from "../../../context/UserContext";
import { BoardContext } from "../../../context/BoardContext";
import { exportBoard } from "../../../utils";
import { ROLE_MODERATOR } from "../../../utils/user.utils";

const useStyles = makeStyles((theme) => ({
  export: {
    color: theme.palette.error.main,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

export default function ExportTemplateButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exportType, setExportType] = useState("default");
  const { boardId } = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setExportType(event.target.value);
  }

  async function handleExport() {
    startLoading();
    const response = await exportBoard(boardId, "template-export", exportType);
    stopLoading();

    if (response.ok) {
      window.open(response.url);
      closeDialog();
    } else {
      console.log(response);
      alert(
        "Whoops... Seems like the export failed :(\nContact your admin and provide the console log by opening the developer tools of your browser."
      );
    }
  }

  return (
    <React.Fragment>
      <MenuItem
        aria-label="Export Board"
        color="primary"
        onClick={openDialog}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <ListItemIcon>
          <ExportIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Template Export" />
      </MenuItem>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="board-export-template-dialog"
        aria-describedby="board-export-template-dialog-description"
      >
        <DialogTitle id="board-export-template-dialog">
          Template Export
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <React.Fragment>
              <DialogContentText id="board-export-template-dialog-description">
                You are about to export the board data as JSON!
              </DialogContentText>
              <Divider className={classes.divider} />
              <FormControl component="fieldset">
                <FormLabel component="legend">Export Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="exportType"
                  name="exportType"
                  value={exportType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="default"
                    control={<Radio color="primary" />}
                    label="Without Items"
                  />
                  <FormControlLabel
                    value="withItems"
                    control={<Radio color="primary" />}
                    label="With Items"
                  />
                </RadioGroup>
              </FormControl>
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className={classes.export}
            onClick={handleExport}
            disabled={isLoading}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
