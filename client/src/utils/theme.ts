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
          divider: "#383838",
          text: {
            primary: "#000000",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#000000",
          },
          divider: "#808080",
          background: {
            default: "#272727",
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
  },
});
