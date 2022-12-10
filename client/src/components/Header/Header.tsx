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

const Header = () => {
  const [open, setOpen] = useState(false);
  const mode = useAppSelector(selectTheme).mode;
  const dispatch = useDispatch();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const auth = true;

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
              gap: 5,
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
            {auth && !isXs && (
              <Link
                href="/corporations"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                Corporations
              </Link>
            )}
          </Box>
          {!auth && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Button color="inherit" sx={{ borderRadius: 2 }}>
                Login
              </Button>
              <Button color="inherit" sx={{ borderRadius: 2 }}>
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
          {auth && isXs && (
            <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          )}
          {auth && !isXs && <DropDownMenu mode={mode} isXs={isXs} />}
        </Toolbar>
      </AppBar>
      {open && isXs && (
        <MobileMenu hidePanel={() => setOpen(false)} mode={mode} open={open} />
      )}
    </Box>
  );
};

export default Header;
