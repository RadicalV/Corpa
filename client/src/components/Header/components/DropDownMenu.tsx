import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { toggleTheme } from "../../../slices/themeSlice";
import { selectUser } from "../../../slices/userSlice";
import { useAppSelector } from "../../../store";
import { User } from "../../../types";

interface DropDownMenuProps {
  mode: string;
  user: User;
}

const DropDownMenu = (props: DropDownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { mode } = props;
  const username = useAppSelector(selectUser).username;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        gap: 1,
        flexGrow: 1,
      }}
    >
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          disabled
        >
          <Typography>{username}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            dispatch(toggleTheme());
          }}
          color="inherit"
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {mode === "light" ? <LightMode /> : <DarkMode />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Typography color="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
      <Avatar
        sx={{ mr: 2, cursor: "pointer" }}
        alt="RadicalV"
        src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
        onClick={handleClick}
      ></Avatar>
    </Box>
  );
};

export default DropDownMenu;
