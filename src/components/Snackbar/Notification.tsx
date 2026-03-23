import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useUtils } from "@/contexts";

const SnackbarNotification: React.FC = () => {
  const { states, actions } = useUtils();
  const { snackbar } = states;

  const handleClose = () => {
    actions.SHOW_SNACKBAR({
      ...snackbar,
      show: false,
    });
  };

  return (
    <Snackbar autoHideDuration={1000} anchorOrigin={snackbar.position} open={snackbar.show} onClose={handleClose}>
      <Alert onClose={handleClose} variant="filled" severity={snackbar.type}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarNotification;
