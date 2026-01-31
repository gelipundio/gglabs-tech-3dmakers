const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        py: 4,
        maxWidth: "1200px !important",
        margin: "0 auto",
        gap: 4,
    },
    dashboardContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        pt: 2,
        pb: 4,
        maxWidth: "1200px !important",
        margin: "0 auto",
        gap: 4,
    },
    headerRow: {
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 0 }
    },
    uploadCard: {
        width: "100%",
        maxWidth: "800px",
        p: 4,
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        gap: 3,
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
        gap: 3,
    },
    productCard: {
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    productImage: {
        width: "100%",
        height: "200px",
        backgroundColor: "#1a1a1a",
    },
    productInfo: {
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
    },
    previewContainer: {
        width: "100%",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid",
        borderColor: "divider",
        minHeight: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    previewImage: {
        width: "100%",
        height: "300px",
    },
    controlsOverlay: {
        position: "absolute",
        bottom: 8,
        right: 8,
        display: "flex",
        gap: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 2,
        p: 0.5,
        backdropFilter: "blur(4px)",
    },
    statusChip: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1,
        py: 0.25,
        borderRadius: "4px",
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        border: "1px solid",
        mb: 1,
    },
    price: {
        fontWeight: 700,
        color: "primary.main",
        fontSize: "1.25rem",
    },
    productDescription: {
        fontWeight: 600,
        fontSize: "0.95rem",
        lineHeight: 1.2,
        mb: 0.5
    },
    imageWrapper: {
        position: "relative",
        cursor: "pointer"
    },
    actionIconWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5
    },
    mediaBadgeIcon: {
        fontSize: "18px",
        display: "block",
    },
    cancelDeleteBtn: {
        color: "text.primary"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
    },
    input: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
        },
    },
    fileInput: {
        display: 'none',
    },
    uploadButton: {
        border: '2px dashed rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'rgba(255, 255, 255, 0.02)'
        }
    },
    mediaGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: 1.5,
        width: "100%",
        p: 1,
    },
    mediaGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
        gap: 1.5,
        mb: 2
    },
    mediaAddButton: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(255,255,255,0.05)',
        width: "100%",
        height: "80px",
        borderRadius: 2,
        border: "1px dashed rgba(255,255,255,0.2)",
        "&:hover": {
            bgcolor: "rgba(255,255,255,0.08)",
            borderColor: "rgba(255,255,255,0.3)"
        }
    },
    mediaPreview: {
        width: "100%",
        height: "100px",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(0,0,0,0.3)",
        '& img, & video': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }
    },
    mediaTypeIcon: {
        position: "absolute",
        top: 4,
        right: 4,
        bgcolor: "rgba(0,0,0,0.5)",
        borderRadius: 1,
        p: 0.3,
        display: "flex",
        color: "white",
        backdropFilter: "blur(4px)",
    },
    removeMedia: {
        position: "absolute",
        top: 2,
        left: 2,
        p: 0.2,
        bgcolor: "rgba(0,0,0,0.5)",
        color: "white",
        backdropFilter: "blur(4px)",
        '&:hover': {
            bgcolor: "rgba(0,0,0,0.7)",
        }
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
    layout: {
        minHeight: "100vh",
        bgcolor: "background.default"
    },
    pageTitle: {
        fontWeight: 700,
        fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" }
    },
    addBtn: {
        height: { xs: 44, sm: 40 },
        fontSize: { xs: "0.875rem", sm: "0.9375rem" }
    },
    alert: {
        width: "100%"
    },
    previewContainer: {
        width: "100%"
    },
    fitModeStack: {
        mt: 2
    },
    visibilityLabel: {
        mb: 1,
        color: "text.secondary",
        "& .MuiFormControlLabel-label": {
            fontSize: "0.9rem",
            fontWeight: 500
        }
    },
    progressWrapper: {
        mb: 2,
        mt: 1
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        bgcolor: 'rgba(255,255,255,0.05)',
        '& .MuiLinearProgress-bar': {
            borderRadius: 4,
        }
    },
    statusText: {
        mt: 1,
        display: "block",
        textAlign: "center",
        color: "text.secondary",
        fontWeight: 600,
        letterSpacing: '0.02em'
    },
    submitBtn: {
        py: 1.5,
        fontWeight: 700
    },
    sectionTitle: {
        alignSelf: 'flex-start',
        mt: 2
    },
    loader: {
        mt: 4
    },
    emptyState: {
        mt: 4
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
        top: 10,
        right: 10,
        zIndex: 10,
        color: "white"
    },
    galleryMedia: {
        maxWidth: "100%",
        maxHeight: "80vh",
        objectFit: "contain"
    },
    navArrowLeft: {
        position: "absolute",
        left: 10,
        color: "white",
        bgcolor: "rgba(0,0,0,0.3)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }
    },
    navArrowRight: {
        position: "absolute",
        right: 10,
        color: "white",
        bgcolor: "rgba(0,0,0,0.3)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" }
    },
    galleryCounter: {
        position: "absolute",
        bottom: 20,
        color: "white",
        bgcolor: "rgba(0,0,0,0.5)",
        px: 2,
        py: 0.5,
        borderRadius: 2
    },
    deleteDialog: {
        bgcolor: "rgba(30, 30, 30, 0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 3,
    },
    dialogTitle: {
        color: "error.main",
        fontWeight: 700
    },
    dialogText: {
        color: "text.secondary"
    },
    dialogActions: {
        p: 2.5,
        pt: 0
    },
    deleteBtn: {
        borderRadius: 2
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
    }
};

export default styles;
