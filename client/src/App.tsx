import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { selectTheme } from "./slices/themeSlice";
import { useAppSelector } from "./store";
import { getTheme } from "./utils/theme";
import { useMemo } from "react";
import NiceModal from "@ebay/nice-modal-react";
import Header from "./components/Header/Header";
import Router from "./routes";
import AuthMiddleware from "./components/AuthMiddleware";

function App() {
  const mode = useAppSelector(selectTheme).mode;
  const theme = useMemo(() => {
    return createTheme(getTheme(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NiceModal.Provider>
        <AuthMiddleware>
          <>
            <Header />
            <Router />
          </>
        </AuthMiddleware>
      </NiceModal.Provider>
    </ThemeProvider>
  );
}

export default App;
