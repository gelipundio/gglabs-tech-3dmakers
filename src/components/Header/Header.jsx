import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./styles";

export default function Header({ size = "medium", sx = {} }) {
    const isSmall = size === "small";

    return (
        <Box
            component="header"
            className="fade-in"
            sx={{
                ...(isSmall ? styles.headerRootSmall : styles.headerRoot),
                ...sx
            }}
        >
            {!isSmall && (
                <Box sx={styles.logoArea}>
                    <Image
                        src="/logo.png"
                        alt="GG Labs Logo"
                        width={200}
                        height={200}
                        style={styles.logoImage}
                    />
                </Box>
            )}
            <Typography
                variant={isSmall ? "h6" : "h1"}
                sx={isSmall ? styles.titleSmall : styles.title}
            >
                3D Makers
            </Typography>
            {!isSmall && (
                <Typography variant="body1" sx={styles.description}>
                    by GG Labs
                    <br />
                    <Box component="span" sx={styles.tagline}>
                        Prototyping • Design • Production
                    </Box>
                </Typography>
            )}
        </Box>
    );
}
