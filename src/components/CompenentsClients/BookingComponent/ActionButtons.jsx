import React from "react";
import { Box, Button } from "@mui/material";

const ActionButtons = ({ onConfirm, onCancel }) => {
  return (
    <Box sx={{ marginTop: 4, textAlign: "center" }}>
      <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={onConfirm}>
        Confirm
      </Button>
      <Button variant="outlined" color="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default ActionButtons;
