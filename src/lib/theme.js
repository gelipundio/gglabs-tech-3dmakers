"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#111111",
            paper: "#1a1a1a",
        },
        text: {
            primary: "#eeeeee",
            secondary: "#888888",
        },
        primary: {
            main: "#f0f0f0",
        },
        divider: "rgba(255, 255, 255, 0.1)",
    },
    typography: {
        fontFamily: "'Ubuntu', sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
});

export default theme;
