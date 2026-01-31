const styles = {
    navbar: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: { xs: 1.5, md: 2 },
        px: { xs: 2, md: 4 },
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(17, 17, 17, 0.8)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        flexWrap: { xs: "wrap", md: "nowrap" },
        gap: { xs: 1, md: 0 }
    },
    logoArea: {
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, md: 2 },
    },
    logoImage: {
        objectFit: "contain",
    },
    logoText: {
        fontWeight: 800,
        fontSize: { xs: "0.9rem", md: "1.1rem" },
        letterSpacing: "-0.02em"
    },
    adminLabel: {
        color: "text.secondary",
        fontWeight: 400,
        fontSize: { xs: "0.75rem", md: "0.9rem" },
        ml: { xs: 0.5, md: 1 }
    },
    navLinks: {
        display: 'flex',
        gap: { xs: 1, md: 2 },
        order: { xs: 3, md: 0 },
        width: { xs: "100%", md: "auto" },
        justifyContent: { xs: "center", md: "flex-start" }
    },
    navButton: {
        color: '#fff',
        fontSize: { xs: "0.8rem", md: "0.875rem" },
        px: { xs: 1.5, md: 2 },
        py: { xs: 0.5, md: 1 }
    },
    logoutBtn: {
        borderRadius: 2,
        color: "text.secondary",
        borderColor: "rgba(255, 255, 255, 0.1)",
        fontSize: { xs: "0.75rem", md: "0.875rem" },
        px: { xs: 1, md: 1.5 },
        py: { xs: 0.5, md: 0.75 },
        "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            bgcolor: "rgba(255, 255, 255, 0.05)",
        }
    }
};

export default styles;
