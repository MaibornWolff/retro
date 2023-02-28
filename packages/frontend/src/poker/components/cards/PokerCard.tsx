import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { AddModerator, LocalPolice, MoreVert, RemoveCircle } from "@mui/icons-material";

import { CardText } from "../../../common/styled-components";
import { useUserContext } from "../../../common/context/UserContext";
import { usePokerContext } from "../../context/PokerContext";
import { isModerator } from "../../../common/utils/participantsUtils";

interface PokerCardProps {
  styleProps: { backgroundColor: string };
  userName: string;
  userId: string;
  role: string;
  FooterComponent?: React.ReactNode;
  DialogComponent?: React.ReactNode;
}

export default function PokerCard({
  styleProps,
  userId,
  userName,
  role,
  FooterComponent,
  DialogComponent,
}: PokerCardProps) {
  const { handleKickUser, handleTransferModeratorRole } = usePokerContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const { user } = useUserContext();

  function openMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function handleTransferModeratorRoleClick() {
    if (!isModerator(user)) return;

    handleTransferModeratorRole(userId);
    closeMenu();
  }

  function handleKickUserClick() {
    if (!isModerator(user)) return;

    handleKickUser(userId);
    closeMenu();
  }

  return (
    <>
      <Card
        sx={{
          margin: theme.spacing(1),
          backgroundColor: styleProps.backgroundColor,
          width: "12em",
          height: "16rem",
          display: "flex",
          flexDirection: "column",
        }}
        elevation={8}
      >
        <CardHeader
          sx={{ height: "64px" }}
          avatar={<>{role === "moderator" && <LocalPolice color="secondary" />}</>}
          action={
            <>
              {isModerator(user) && user.id !== userId && (
                <>
                  <IconButton color="secondary" aria-label="card settings" onClick={openMenu}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id="card-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                  >
                    {role !== "moderator" && (
                      <MenuItem onClick={handleTransferModeratorRoleClick}>
                        <ListItemIcon>
                          <AddModerator />
                        </ListItemIcon>
                        <ListItemText primary="Transfer Moderator Role" />
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleKickUserClick}>
                      <ListItemIcon>
                        <RemoveCircle color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Kick User" />
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          }
        />
        <CardContent
          sx={{
            width: "100%",
            flexGrow: "1",
            padding: "0px",
            paddingX: "16px",
          }}
        >
          <Typography color="secondary" align="center" variant="h6">
            <CardText>{userName}</CardText>
          </Typography>
        </CardContent>
        {FooterComponent}
      </Card>
      {DialogComponent}
    </>
  );
}
