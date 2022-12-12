import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

export const getTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#ffffff",
          },
          secondary: {
            main: "#000000",
          },
          background: {
            default: "#fafafa",
            paper: "#ffffff",
          },
          divider: "#383838",
          highlight: "#f81ce5",
          text: {
            primary: "#000000",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#000000",
          },
          secondary: {
            main: "#ffffff",
          },
          divider: "#808080",
          highlight: "#79ffe1",
          background: {
            paper: "#000000",
          },
          text: {
            primary: "#ffffff",
          },
        }),
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: "1",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::after": {
            borderColor: "#000000",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          "&.MuiGrid-item": {
            display: "flex",
            justifyContent: "center",
          },
          "&.MuiGrid-container": {
            m: 0,
            width: "1200px",
          },
        },
      },
    },
  },
});
