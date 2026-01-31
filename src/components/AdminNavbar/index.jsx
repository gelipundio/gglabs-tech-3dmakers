import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import { logout } from "@/app/admin/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles";

export default function AdminNavbar() {
    return (
        <Box component="nav" sx={styles.navbar}>
            <Box sx={styles.logoArea}>
                <Image
                    src="/logo.png"
                    alt="GG Labs Logo"
                    width={40}
                    height={40}
                    style={styles.logoImage}
                />
                <Box sx={styles.logoText}>
                    3D Makers <Box component="span" sx={styles.adminLabel}>Admin</Box>
                </Box>
            </Box>

            <Box sx={styles.navLinks}>
                <Button
                    variant="text"
                    href="/admin/dashboard"
                    sx={styles.navButton}
                >
                    Products
                </Button>
                <Button
                    variant="text"
                    href="/admin/sales"
                    sx={styles.navButton}
                >
                    Sales
                </Button>
            </Box>

            <Button
                startIcon={<LogoutIcon />}
                variant="outlined"
                onClick={() => logout()}
                size="small"
                sx={styles.logoutBtn}
            >
                Logout
            </Button>
        </Box>
    );
}

