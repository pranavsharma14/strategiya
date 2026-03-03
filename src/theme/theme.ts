import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7C4DFF",
    },
    secondary: {
      main: "#00E5FF",
    },
    background: {
      default: "#0B0B0F",
      paper: "#13131A",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});
