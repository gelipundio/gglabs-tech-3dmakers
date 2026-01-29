const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 3,
        py: 4,
        maxWidth: "800px !important",
        margin: "0 auto",
        gap: 4,
    },
    headerRow: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    uploadCard: {
        width: "100%",
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
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
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
    price: {
        fontWeight: 700,
        color: "primary.main",
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
    }
};

export default styles;
