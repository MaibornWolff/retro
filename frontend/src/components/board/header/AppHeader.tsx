import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  Button,
  makeStyles,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import CreateColumnButton from "./CreateColumnButton";
import UnblurCardsButton from "./UnblurCardsButton";
import ExportBoardButton from "./ExportBoardButton";
import ExportTemplateButton from "./ExportTemplateButton";
import VoteCountButton from "./VoteCountButton";
import QrCodeButton from "./QrCodeButton";

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
    textTransform: "none",
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSettings = (event: any) => {
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
          <CreateColumnButton />
          <Button
            color="inherit"
            variant="text"
            className={classes.settingsButton}
            aria-label="board settings"
            aria-controls="settings-appbar"
            aria-haspopup="true"
            onClick={handleSettings}
            startIcon={<SettingsIcon />}
          >
            <Typography>Settings</Typography>
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
            <UnblurCardsButton />
            <VoteCountButton />
            <ExportBoardButton />
            <ExportTemplateButton />
            {/* <ContinueDiscussionButton /> */}
            <QrCodeButton />
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
