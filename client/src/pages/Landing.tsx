import { Box, Typography } from "@mui/material";

const Landing = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Typography variant="h4">Welcome to Corpa</Typography>
        <Box sx={{ maxWidth: "320px" }}>
          <Typography variant="body1">
            This is a project made for a web application design lecture in KTU
            university. To continue using this website please register or login.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Landing;
