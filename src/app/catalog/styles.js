const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        py: 4,
        maxWidth: "1200px !important",
        margin: "0 auto",
        gap: 6,
    },
    title: {
        fontWeight: 800,
        textAlign: "center",
        mb: 2,
        background: "linear-gradient(to right, #fff, #999)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        textAlign: "center",
        color: "text.secondary",
        mb: 6,
        maxWidth: 600,
    },
    productList: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)"
        },
        gap: 4,
    },
    productCard: {
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
        }
    },
    productImage: {
        width: "100%",
        height: "250px",
        backgroundColor: "#1a1a1a",
    },
    productInfo: {
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
    },
    price: {
        fontWeight: 700,
        color: "primary.main",
        fontSize: "1.25rem",
    },
    description: {
        color: "text.secondary",
        lineHeight: 1.6,
        fontSize: "0.95rem",
    }
};

export default styles;
