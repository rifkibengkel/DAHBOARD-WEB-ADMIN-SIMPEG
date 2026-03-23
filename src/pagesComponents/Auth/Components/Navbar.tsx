import React from "react";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";

const Navbar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 70,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #36597D0D",
        backdropFilter: "blur(20px)",
        px: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Image src={"/assets/logo/simpeg_logo.png"} alt="Logo" height={27} width={40} />
        <Typography fontSize="14px" color={theme.palette.text.primary} noWrap component="div">
          Dashboard <b>Sistem Kepegawaian</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
