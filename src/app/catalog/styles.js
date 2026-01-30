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
    layout: {
        minHeight: "100vh",
        bgcolor: "background.default"
    },
    backLinkContainer: {
        width: "100%",
        mt: 2
    },
    backLink: {
        color: "text.secondary"
    },
    headerBox: {
        textAlign: "center",
        mb: 8
    },
    loaderBox: {
        display: "flex",
        justifyContent: "center",
        mt: 10
    },
    imageContainer: {
        position: "relative"
    },
    emptyMessage: {
        mt: 10,
        textAlign: "center",
        fontSize: "1.2rem"
    },
    galleryDialog: {
        bgcolor: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 4,
        overflow: "hidden"
    },
    galleryContent: {
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    closeBtn: {
        position: "absolute",
        top: 15,
        right: 15,
        zIndex: 10,
        color: "white",
        bgcolor: "rgba(0,0,0,0.3)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }
    },
    galleryMedia: {
        maxWidth: "100%",
        maxHeight: "85vh",
        objectFit: "contain"
    },
    navArrowLeft: {
        position: "absolute",
        left: 15,
        color: "white",
        bgcolor: "rgba(255,255,255,0.1)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
    },
    navArrowRight: {
        position: "absolute",
        right: 15,
        color: "white",
        bgcolor: "rgba(255,255,255,0.1)",
        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
    },
    galleryCounter: {
        position: "absolute",
        bottom: 25,
        color: "white",
        bgcolor: "rgba(0,0,0,0.5)",
        px: 2,
        py: 0.5,
        borderRadius: 2,
        fontWeight: 600
    },
    description: {
        color: "text.secondary",
        lineHeight: 1.6,
        fontSize: "0.95rem",
    },
    productInfoFooter: {
        mt: "auto",
        pt: 2,
        borderTop: "1px solid",
        borderColor: "divider"
    },
    mediaPill: {
        position: "absolute",
        bottom: 12,
        right: 12,
        bgcolor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "100px",
        height: "28px",
        px: 1,
        display: "flex",
        alignItems: "center",
        gap: 0.8,
        color: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        zIndex: 2,
    },
    mediaIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
    },
    mediaBadgeIcon: {
        fontSize: "18px",
        display: "block",
    },
    youtubeWrapper: {
        width: "100%",
        maxWidth: "900px",
        height: "auto",
        aspectRatio: "16 / 9",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "black",
        "& iframe": {
            width: "100%",
            height: "100%",
            border: "none"
        }
    },
    footerContainer: {
        mt: 10
    }
};

export default styles;
