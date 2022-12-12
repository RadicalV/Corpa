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
import workerApi from "../../api/workerApi";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EditWorkerSchema = Yup.object({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  position: Yup.string().required(),
});

interface Props {
  name: string;
  surname: string;
  phoneNumber: string;
  position: string;
  corporationId: string;
  branchId: string;
  workerId: string;
  confirm: () => void;
}

const EditWorker = NiceModal.create((props: Props) => {
  const modal = useModal();
  const [apiError, setApiError] = useState("");
  const {
    name,
    surname,
    phoneNumber,
    position,
    corporationId,
    branchId,
    workerId,
    confirm,
  } = props;

  return (
    <Dialog
      open={modal.visible}
      onClose={modal.remove}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography textAlign="center">Edit worker info</Typography>
      </DialogTitle>
      <Formik
        initialValues={{
          name: name,
          surname: surname,
          phoneNumber: phoneNumber,
          position: position,
        }}
        validationSchema={EditWorkerSchema}
        onSubmit={(values) => {
          try {
            workerApi
              .updateWorker(values, corporationId, branchId, workerId)
              .then(() => {
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
                  name="name"
                  placeholder="name"
                  label="Name"
                  type="text"
                  color="secondary"
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                ></TextField>
                <TextField
                  name="surname"
                  placeholder="Surname"
                  label="Surname"
                  type="text"
                  color="secondary"
                  value={values.surname}
                  onChange={handleChange}
                  error={touched.surname && Boolean(errors.surname)}
                  helperText={touched.surname && errors.surname}
                ></TextField>
                <TextField
                  name="phoneNumber"
                  placeholder="Phone number"
                  label="Phone Number"
                  type="text"
                  color="secondary"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                ></TextField>
                <TextField
                  name="position"
                  placeholder="Position"
                  label="Position"
                  type="text"
                  color="secondary"
                  value={values.position}
                  onChange={handleChange}
                  error={touched.position && Boolean(errors.position)}
                  helperText={touched.position && errors.position}
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

export default EditWorker;
