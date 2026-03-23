import { Box, Typography } from "@mui/material";

const CalendarHeader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography fontSize="22px">Kalender</Typography>
    </Box>
  );
};

export default CalendarHeader;
