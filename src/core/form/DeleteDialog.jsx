import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { post } from "api/api";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/feature";

export default function DeleteDialog({ open, setOpen, api, _id, setParams }) {
  const dispatch = useDispatch();
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const result = await post(api, { _id: _id });
      if (result.status) {
        dispatch(
          setToast({
            severity: "success",
            summary: "Thành công!",
            detail: result.message,
            life: 3000,
          })
        );
        if (setParams) {
          setParams((pre) => {
            return { ...pre, render: !pre.render };
          });
        }
      } else {
        dispatch(
          setToast({
            severity: "error",
            detail: result.message,
            life: 3000,
          })
        );
      }
      setOpen(false);
    } catch (error) {
      console.error("An error Occured: ", error);
      dispatch(
        setToast({
          severity: "error",
          detail: "An error Occured: ",
          life: 3000,
        })
      );
      //   setResponseMessage("Failed to submit form.");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">PRODUCT SYSTEM</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this record ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>

          <Button onClick={handleConfirm} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
