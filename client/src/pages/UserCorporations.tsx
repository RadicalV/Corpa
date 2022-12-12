import {
  Box,
  CircularProgress,
  Fab,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import CorporationCard from "../components/cards/CorporationCard";
import { Corporation } from "../types";
import AddIcon from "@mui/icons-material/Add";
import NiceModal from "@ebay/nice-modal-react";
import AddCorporation from "../components/corporation modals/AddCorporation";

const UserCorporations = () => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchCorporations = async () => {
    const corporationsData = (await userApi.getUserCorporations()).data;
    setCorporations(corporationsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchCorporations();

    setLoading(false);
  }, [refetch]);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Typography variant="h4" textAlign="center" sx={{ pt: "20px" }}>
        Your Corporations
      </Typography>
      <Box
        sx={{
          pl: 10,
          pr: 10,
          pt: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={5}>
          {corporations.map((corporation) => (
            <Grid item xs={12} sm={6} md={4} key={corporation.id}>
              <CorporationCard
                name={corporation.name}
                description={corporation.description}
                id={corporation.id}
                creatorId={corporation.creatorUserId}
                ceo={true}
                setRefetch={() => setRefetch(!refetch)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: `${isXs ? "50%" : "20px"}`,
          transform: `${isXs ? "translate(50%)" : "0"}`,
        }}
      >
        <Fab
          color="secondary"
          onClick={() => {
            NiceModal.show(AddCorporation, {
              setRefetch: () => {
                setRefetch(!refetch);
              },
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default UserCorporations;
