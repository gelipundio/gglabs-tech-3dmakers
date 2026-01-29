import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./styles";

export default function Header({ size = "medium" }) {
    const isSmall = size === "small";

    return (
        <Box
            component="header"
            className="fade-in"
            sx={isSmall ? styles.headerRootSmall : styles.headerRoot}
        >
            <Box sx={isSmall ? styles.logoAreaSmall : styles.logoArea}>
                <Image
                    src="/logo.png"
                    alt="GG Labs Logo"
                    width={isSmall ? 100 : 200}
                    height={isSmall ? 100 : 200}
                    style={styles.logoImage}
                />
            </Box>
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
                    <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                        Prototyping • Design • Production
                    </span>
                </Typography>
            )}
        </Box>
    );
}
