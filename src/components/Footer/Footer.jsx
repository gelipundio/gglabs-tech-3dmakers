import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./styles";

export default function Footer() {
    return (
        <Box component="footer" className="fade-in delay-300" sx={styles.footerRoot}>
            <Typography sx={styles.footerText}>
                © {new Date().getFullYear()} GG Labs. All rights reserved.
            </Typography>
        </Box>
    );
}
