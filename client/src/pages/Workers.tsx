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
import { useLocation } from "react-router-dom";
import { selectUser } from "../slices/userSlice";
import { useAppSelector } from "../store";
import NiceModal from "@ebay/nice-modal-react";
import AddIcon from "@mui/icons-material/Add";
import { Worker } from "../types";
import workerApi from "../api/workerApi";
import WorkerCard from "../components/cards/WorkerCard";
import AddWorker from "../components/worker modals/AddWorker";

const Workers = () => {
  const location = useLocation();
  const corporationId = location.state.corporationId;
  const creatorId = location.state.creatorId;
  const branchId = location.state.branchId;
  const name = location.state.name;
  const title = location.state.title;

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useAppSelector(selectUser);

  const fetchWorkers = async () => {
    const workerData = (await workerApi.getWorkers(corporationId, branchId))
      .data;
    setWorkers(workerData);
  };

  useEffect(() => {
    setLoading(true);
    fetchWorkers();

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
        Branch{" "}
        <Box component="span" color="highlight">
          {title}
        </Box>{" "}
        workers
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
          {workers.map((worker) => (
            <Grid item xs={12} sm={6} md={4} key={worker.id}>
              <WorkerCard
                name={worker.name}
                surname={worker.surname}
                phoneNumber={worker.phoneNumber}
                position={worker.position}
                corporationId={corporationId}
                creatorId={creatorId}
                branchId={branchId}
                workerId={worker.id}
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
              NiceModal.show(AddWorker, {
                corporationId: corporationId,
                branchId: branchId,
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

export default Workers;
