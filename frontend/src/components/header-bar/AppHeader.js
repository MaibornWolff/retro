import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Menu, MenuItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

import UnblurCardsButton from "./board-settings/UnblurCardsButton";
import ExportBoardButton from "./board-settings/ExportBoardButton";
import ExportTemplateButton from "./board-settings/ExportTemplateButton";
import VoteCountButton from "./board-settings/VoteCountButton";
import ContinueDiscussionButton from "./board-settings/ContinueDiscussionButton";
import QrCodeButton from "./board-settings/QrCodeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
  },
  brand: {
    flexGrow: 1,
    fontFamily: "Permanent Marker, cursive",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  settingsButton: {
    marginRight: theme.spacing(1),
    textTransform: "none",
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" className={classes.brand}>
            <Link to="/" className={classes.link}>
              Retro
            </Link>
          </Typography>
          <Button
            variant="text"
            className={classes.settingsButton}
            aria-label="board settings"
            aria-controls="settings-appbar"
            aria-haspopup="true"
            onClick={handleSettings}
            color="inherit"
            startIcon={<SettingsIcon />}
          >
            <Typography color="inherit">Settings</Typography>
          </Button>
          <Menu
            keepMounted
            id="settings-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <UnblurCardsButton />
            </MenuItem>
            <MenuItem>
              <ExportBoardButton />
            </MenuItem>
            <MenuItem>
              <ExportTemplateButton />
            </MenuItem>
            <MenuItem>
              <VoteCountButton />
            </MenuItem>
            <MenuItem>
              <ContinueDiscussionButton />
            </MenuItem>
            <MenuItem>
              <QrCodeButton />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
