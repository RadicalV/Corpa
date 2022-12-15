import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteItem from "../DeleteItem";
import NiceModal from "@ebay/nice-modal-react";
import { useAppSelector } from "../../store";
import { selectUser } from "../../slices/userSlice";
import workerApi from "../../api/workerApi";
import EditWorker from "../worker modals/EditWorker";

interface Props {
  name: string;
  surname: string;
  phoneNumber: string;
  position: string;
  corporationId: string;
  creatorId: string;
  branchId: string;
  workerId: string;
  setRefetch: () => void;
}

const WorkerCard = (props: Props) => {
  const {
    name,
    surname,
    phoneNumber,
    position,
    corporationId,
    creatorId,
    branchId,
    workerId,
    setRefetch,
  } = props;
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ width: "300px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">
            {name} {surname}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{position}</Typography>
            <Typography variant="body2">{phoneNumber}</Typography>
          </Box>
        </CardContent>
        <CardActions>
          {user.role === "CEO" && user.id === creatorId && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                opacity: "0.85",
                width: "100%",
              }}
            >
              <IconButton
                color="info"
                onClick={() => {
                  NiceModal.show(EditWorker, {
                    name: name,
                    surname: surname,
                    phoneNumber: phoneNumber,
                    position: position,
                    corporationId: corporationId,
                    branchId: branchId,
                    workerId: workerId,
                    confirm: () => {
                      setRefetch();
                    },
                  });
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  NiceModal.show(DeleteItem, {
                    itemType: "worker",
                    children: "",
                    confirm: () => {
                      workerApi
                        .deleteWorker(corporationId, branchId, workerId)
                        .then(() => {
                          setRefetch();
                          NiceModal.hide(DeleteItem);
                        });
                    },
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default WorkerCard;
