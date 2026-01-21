import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./styles";

export default function Header() {
    return (
        <Box component="header" className="fade-in" sx={styles.headerRoot}>
            <Box sx={styles.logoArea}>
                <Image
                    src="/logo.png"
                    alt="GG Labs Logo"
                    width={200}
                    height={200}
                    style={styles.logoImage}
                />
            </Box>
            <Typography variant="h1" sx={styles.title}>3D Makers</Typography>
            <Typography variant="body1" sx={styles.description}>
                by GG Labs
                <br />
                <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    Prototyping • Design • Production
                </span>
            </Typography>
        </Box>
    );
}
