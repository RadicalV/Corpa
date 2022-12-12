import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import branchApi from "../../api/branchApi";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EditBranchSchema = Yup.object({
  title: Yup.string().required(),
  address: Yup.string().required(),
});

interface Props {
  title: string;
  address: string;
  corporationId: string;
  branchId: string;
  confirm: () => void;
}

const EditBranch = NiceModal.create((props: Props) => {
  const modal = useModal();
  const [apiError, setApiError] = useState("");
  const { title, address, corporationId, branchId, confirm } = props;

  return (
    <Dialog
      open={modal.visible}
      onClose={modal.remove}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography textAlign="center">Edit branch info</Typography>
      </DialogTitle>
      <Formik
        initialValues={{ title: title, address: address }}
        validationSchema={EditBranchSchema}
        onSubmit={(values) => {
          try {
            branchApi.updateBranch(values, corporationId, branchId).then(() => {
              confirm();
              modal.remove();
            });
          } catch (error) {
            setApiError("Something went wrong!");
          }
        }}
      >
        {({ handleChange, values, submitForm, touched, errors }) => (
          <Form>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <TextField
                  name="title"
                  placeholder="Title"
                  label="Title"
                  type="text"
                  color="secondary"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                ></TextField>
                <TextField
                  name="address"
                  placeholder="Address"
                  label="Address"
                  type="text"
                  color="secondary"
                  value={values.address}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                ></TextField>
              </Box>
              {apiError && <Typography color="error">{apiError}</Typography>}
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                pb: "15px",
              }}
            >
              <Button onClick={() => modal.remove()} color="inherit">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  submitForm();
                }}
                color="success"
              >
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
});

export default EditBranch;
