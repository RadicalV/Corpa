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
import corporationApi from "../../api/corporationApi";
import EditCorporation from "../corporation modals/EditCorporation";

interface Props {
  name: string;
  description: string;
  id: string;
  creatorId: string;
  ceo: boolean;
  setRefetch: () => void;
}

const CorporationCard = (props: Props) => {
  const { name, description, id, creatorId, ceo, setRefetch } = props;
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "300px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "left" }}>
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate(`/corporations/${id}/branches`, {
                  state: {
                    creatorUserId: creatorId,
                    name: name,
                  },
                });
              }}
            >
              View branches
            </Button>
          </Box>
          {ceo && (
            <Box
              sx={{ display: "flex", justifyContent: "right", opacity: "0.85" }}
            >
              <IconButton
                color="info"
                onClick={() => {
                  NiceModal.show(EditCorporation, {
                    name: name,
                    description: description,
                    id: id,
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
                    itemType: "corporation",
                    children: "branches and workers",
                    confirm: () => {
                      corporationApi.deleteCorporation(id).then(() => {
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

export default CorporationCard;
