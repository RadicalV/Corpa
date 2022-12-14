import NiceModal from "@ebay/nice-modal-react";
import { DarkMode, LightMode } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../slices/authSlice";
import { toggleTheme } from "../../../slices/themeSlice";
import { User } from "../../../types";
import LoginModal from "../../authModals/LoginModal";
import RegisterModal from "../../authModals/RegisterModal";

interface MobileMenuProps {
  hidePanel: () => void;
  mode: string;
  user: User;
}

const MobileMenu = (props: MobileMenuProps) => {
  const { hidePanel, mode, user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <List sx={{ height: "100vh" }}>
      {user.id ? (
        <>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>{user.username}</Typography>
          </ListItem>
          <Divider />
          {user.role === "CEO" && (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  hidePanel();
                  navigate(`user/${user.id}/corporations`);
                }}
              >
                <Typography color="inherit">My corporations</Typography>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem>
            <ListItemButton
              onClick={() => {
                hidePanel();
                navigate("/corporations");
              }}
            >
              <Typography color="inherit">Corporations</Typography>
            </ListItemButton>
          </ListItem>
          {user.role === "ADMIN" && (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  hidePanel();
                  navigate("/dashboard");
                }}
              >
                <Typography color="inherit">Admin dashboard</Typography>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem>
            <ListItemButton
              onClick={() => {
                hidePanel();
                dispatch(toggleTheme());
              }}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {mode === "light" ? <LightMode /> : <DarkMode />}
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                dispatch(logout());
                hidePanel();
              }}
            >
              <Typography color="inherit">Logout</Typography>
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem>
            <ListItemButton
              onClick={() => {
                NiceModal.show(LoginModal);
              }}
            >
              Login
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                NiceModal.show(RegisterModal);
              }}
            >
              Register
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                hidePanel();
                dispatch(toggleTheme());
              }}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {mode === "light" ? <LightMode /> : <DarkMode />}
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
              </Typography>
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default MobileMenu;
