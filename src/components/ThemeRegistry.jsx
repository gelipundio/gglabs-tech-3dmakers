"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import theme from "@/lib/theme";

export default function ThemeRegistry({
    children,
}) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        "@keyframes fadeIn": {
                            from: {
                                opacity: 0,
                                transform: "translateY(10px)",
                            },
                            to: {
                                opacity: 1,
                                transform: "translateY(0)",
                            },
                        },
                        ".fade-in": {
                            animation: "fadeIn 0.6s ease-out forwards",
                        },
                        ".delay-100": { animationDelay: "100ms" },
                        ".delay-200": { animationDelay: "200ms" },
                        ".delay-300": { animationDelay: "300ms" },
                    }}
                />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
