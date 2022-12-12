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
import branchApi from "../../api/branchApi";
import EditBranch from "../branch modals/EditBranch";
import { useAppSelector } from "../../store";
import { selectUser } from "../../slices/userSlice";

interface Props {
  title: string;
  corporationName: string;
  address: string;
  corporationId: string;
  creatorId: string;
  branchId: string;
  setRefetch: () => void;
}

const BranchCard = (props: Props) => {
  const {
    title,
    corporationName,
    address,
    corporationId,
    creatorId,
    branchId,
    setRefetch,
  } = props;
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ width: "300px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2">{address}</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "left" }}>
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate(`/workers`, {
                  state: {
                    name: corporationName,
                    title: title,
                    corporationId: corporationId,
                    branchId: branchId,
                    creatorId: creatorId,
                  },
                });
              }}
            >
              View workers
            </Button>
          </Box>
          {user.role === "CEO" && user.id === creatorId && (
            <Box
              sx={{ display: "flex", justifyContent: "right", opacity: "0.85" }}
            >
              <IconButton
                color="info"
                onClick={() => {
                  NiceModal.show(EditBranch, {
                    title: title,
                    address: address,
                    corporationId: corporationId,
                    branchId: branchId,
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
                    itemType: "branch",
                    children: "workers",
                    confirm: () => {
                      branchApi
                        .deleteBranch(corporationId, branchId)
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

export default BranchCard;
