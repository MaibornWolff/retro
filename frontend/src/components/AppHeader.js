import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";

// import SettingsButton from "./SettingsButton";
// import CreateBoardButton from "./CreateBoardButton";
// import { Navbar, NavbarBrand } from "./styled";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const AppHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Retro
          </Typography>
          <Button color="inherit">
            New Board
            <AddIcon className={classes.rightIcon} />
          </Button>
          <Button color="inherit">
            Settings
            <SettingsIcon className={classes.rightIcon} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
// <Navbar className="navbar is-primary" aria-label="main navigation">
//   <div className="navbar-brand">
//     <div className="navbar-item">
//       <NavbarBrand>Retro</NavbarBrand>
//     </div>
//   </div>

//   <div className="navbar-end">
//     <div className="navbar-item">
//       <div className="field is-grouped">
//         <CreateBoardButton />
//         <SettingsButton />
//       </div>
//     </div>
//   </div>
// </Navbar>

export default withStyles(styles)(AppHeader);
