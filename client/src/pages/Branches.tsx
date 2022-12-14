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
import { useLocation, useParams } from "react-router-dom";
import branchApi from "../api/branchApi";
import { selectUser } from "../slices/userSlice";
import { useAppSelector } from "../store";
import { Branch } from "../types";
import BranchCard from "../components/cards/BranchCard";
import NiceModal from "@ebay/nice-modal-react";
import AddIcon from "@mui/icons-material/Add";
import AddBranch from "../components/branch modals/AddBranch";

const Branches = () => {
  const location = useLocation();
  const { corporationId } = useParams();
  const creatorId = location.state.creatorUserId;
  const name = location.state.name;

  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useAppSelector(selectUser);

  const fetchBranches = async () => {
    const branchData = (await branchApi.getAllBranches(corporationId!)).data;
    setBranches(branchData);
  };

  useEffect(() => {
    setLoading(true);
    fetchBranches();

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
        Corporation{" "}
        <Box component="span" color="highlight">
          {name}
        </Box>{" "}
        Branches
      </Typography>
      {user.role === "CEO" && user.id === creatorId && (
        <Typography variant="body1" textAlign="center">
          You are the owner of this corporation.
        </Typography>
      )}
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
          {branches.map((branch) => (
            <Grid item xs={12} sm={6} md={4} key={branch.id}>
              <BranchCard
                title={branch.title}
                corporationName={name}
                address={branch.address}
                corporationId={corporationId!}
                creatorId={creatorId}
                branchId={branch.id}
                setRefetch={() => setRefetch(!refetch)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {user.role === "CEO" && user.id === creatorId && (
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
              NiceModal.show(AddBranch, {
                corporationId: corporationId,
                setRefetch: () => {
                  setRefetch(!refetch);
                },
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      )}
    </>
  );
};

export default Branches;
