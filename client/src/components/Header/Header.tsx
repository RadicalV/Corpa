import {
  AppBar,
  Toolbar,
  Link,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { selectTheme, toggleTheme } from "../../slices/themeSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import DropDownMenu from "./components/DropDownMenu";
import HamburgerButton from "./components/HamburgerButton";
import { useState } from "react";
import MobileMenu from "./components/MobileMenu";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../slices/userSlice";
import LoginModal from "../authModals/LoginModal";
import NiceModal from "@ebay/nice-modal-react";
import RegisterModal from "../authModals/RegisterModal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const mode = useAppSelector(selectTheme).mode;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: 3,
          height: "64px",
        }}
      >
        <Toolbar sx={{ height: "64px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Link
              href="/"
              color="inherit"
              variant="h5"
              sx={{ flexGrow: 1, textDecoration: "none" }}
            >
              Corpa
            </Link>
          </Box>
          {user.id && !isXs ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                }}
              >
                <Button
                  onClick={() => {
                    navigate("/corporations");
                  }}
                  color="inherit"
                >
                  Corporations
                </Button>
                {user.role === "ADMIN" && (
                  <Button
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                    color="inherit"
                  >
                    Admin Dashboard
                  </Button>
                )}
                {user.role === "CEO" && (
                  <Button
                    onClick={() => {
                      navigate(`/user/${user.id}/corporations`);
                    }}
                    color="inherit"
                  >
                    My Corporations
                  </Button>
                )}
              </Box>
              <DropDownMenu mode={mode} user={user} />
            </>
          ) : user.id && isXs ? (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          ) : isXs ? (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Button
                color="inherit"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  NiceModal.show(LoginModal);
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                sx={{ borderRadius: 2 }}
                onClick={() => {
                  NiceModal.show(RegisterModal);
                }}
              >
                Register
              </Button>
              <IconButton
                onClick={() => {
                  dispatch(toggleTheme());
                }}
                color="inherit"
              >
                {mode === "light" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {open && isXs && (
        <MobileMenu hidePanel={() => setOpen(false)} mode={mode} user={user} />
      )}
    </Box>
  );
};

export default Header;
