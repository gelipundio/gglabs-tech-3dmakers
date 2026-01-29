import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import { logout } from "@/app/admin/actions";
import LogoutIcon from "@mui/icons-material/Logout";

const styles = {
    navbar: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        px: { xs: 2, md: 4 },
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(17, 17, 17, 0.8)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
    },
    logoArea: {
        display: "flex",
        alignItems: "center",
        gap: 2,
    },
    logoImage: {
        objectFit: "contain",
    }
};

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
                <Box sx={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                    3D Makers <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, fontSize: "0.9rem", ml: 1 }}>Admin</Box>
                </Box>
            </Box>

            <Button
                startIcon={<LogoutIcon />}
                variant="outlined"
                onClick={() => logout()}
                size="small"
                sx={{
                    borderRadius: 2,
                    color: "text.secondary",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                    }
                }}
            >
                Logout
            </Button>
        </Box>
    );
}
