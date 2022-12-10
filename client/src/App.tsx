import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectTheme } from "./slices/themeSlice";
import { useAppSelector } from "./store";
import { getTheme } from "./utils/theme";
import { useMemo } from "react";
import Header from "./components/Header/Header";
import Router from "./routes";

function App() {
  const mode = useAppSelector(selectTheme).mode;
  const theme = useMemo(() => {
    return createTheme(getTheme(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router />
    </ThemeProvider>
  );
}

export default App;
