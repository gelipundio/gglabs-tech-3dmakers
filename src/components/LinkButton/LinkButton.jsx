"use client";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import styles from "./styles";

export default function LinkButton({
    label,
    href,
    icon: Icon,
    target,
    delay = 0,
}) {
    return (
        <Button
            component={Link}
            href={href}
            target={target}
            sx={{
                ...styles.button,
                animationDelay: `${delay}ms`,
            }}
            className="fade-in"
        >
            <Box sx={styles.contentWrapper}>
                {Icon && <Icon sx={{ fontSize: 24 }} />}
                <span>{label}</span>
            </Box>
            <ChevronRightIcon
                className="arrow-icon"
                sx={{
                    fontSize: 20,
                    opacity: 0.5,
                    transition: "transform 0.3s ease",
                }}
            />
        </Button>
    );
}
