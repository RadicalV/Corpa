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
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../../slices/themeSlice";

interface DropDownMenuProps {
  mode: string;
}

const DropDownMenu = (props: DropDownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const { mode } = props;

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
          <Typography>RadicalV</Typography>
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
        <MenuItem>
          <Typography color="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
      <Avatar
        sx={{ mr: 2, cursor: "pointer" }}
        alt="RadicalV"
        src={`https://avatars.dicebear.com/api/bottts/RadicalV.svg`}
        onClick={handleClick}
      ></Avatar>
    </Box>
  );
};

export default DropDownMenu;
