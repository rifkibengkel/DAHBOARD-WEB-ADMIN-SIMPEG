import { Poppins } from "next/font/google";
import { Shadows, createTheme } from "@mui/material/styles";

export const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    text: {
      primary: "#36597D",
      secondary: "#536580",
    },
    primary: {
      main: "#0478FF",
    },
    background: {
      paper: "#FFFFFF80",
    },
    common: {
      black: "#222",
      white: "#FFF",
    },
    grey: {
      "100": "#F8F9FD",
      "200": "#EFF1F4",
      "300": "#A8AAAE",
      "400": "#E5E8ED",
    },
    error: {
      main: "#CC0000",
      dark: "#B90000",
    },
  },
  shadows: ["none", "4px 4px 40px -20px #00000033", "none", ...Array(22).fill("none")] as Shadows,
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiDivider: {
      defaultProps: {
        sx: {
          borderWidth: 1,
          background: "#EFF0F6",
          opacity: "20%",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        lineHeight: 1.25,
      },
    },
    MuiFormLabel: {
      defaultProps: {
        sx: {
          fontSize: "12px",
          fontWeight: 500,
          color: "#A5AEBC",
          mb: 1,
          "&.Mui-focused": { color: "#A5AEBC" },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default theme;
