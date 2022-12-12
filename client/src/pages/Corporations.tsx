import { useEffect, useState } from "react";
import { Corporation } from "../types";
import CorporationCard from "../components/cards/CorporationCard";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import corporationApi from "../api/corporationApi";

const Corporations = () => {
  const [corporations, setCorporations] = useState<Corporation[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchCorporations = async () => {
    const corporationsData = (await corporationApi.getAllCorporations()).data;
    setCorporations(corporationsData);
  };

  useEffect(() => {
    setLoading(true);
    fetchCorporations();

    setLoading(false);
  }, []);

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
        Corporations
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
                ceo={false}
                setRefetch={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Corporations;
