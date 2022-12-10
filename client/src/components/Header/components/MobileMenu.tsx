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
import { toggleTheme } from "../../../slices/themeSlice";

interface MobileMenuProps {
  hidePanel: () => void;
  mode: string;
  open: boolean;
}

const MobileMenu = (props: MobileMenuProps) => {
  const { hidePanel, mode, open } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ceo = false;
  const admin = true;

  return (
    <List sx={{ height: "100vh" }}>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>RadicalV</Typography>
      </ListItem>
      <Divider />
      {ceo && (
        <ListItem>
          <ListItemButton
            onClick={() => {
              hidePanel();
              navigate("user/corporations");
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
      {admin && (
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
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {mode === "light" ? <LightMode /> : <DarkMode />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => {
            hidePanel();
          }}
        >
          <Typography color="inherit">Logout</Typography>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MobileMenu;
