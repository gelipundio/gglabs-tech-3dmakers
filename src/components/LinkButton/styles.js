const styles = {
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "1rem 1.5rem",
        background: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        color: "text.primary",
        fontWeight: 500,
        fontSize: "1.1rem",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        mb: 2,
        textTransform: "none",
        "&:hover": {
            background: "primary.main",
            color: "background.default",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px -10px rgba(255, 255, 255, 0.2)",
            borderColor: "transparent",
            "& .MuiSvgIcon-root": {
                color: "background.default",
            },
            "& .arrow-icon": {
                opacity: 1,
                transform: "translateX(4px)",
            },
        },
        "&:active": {
            transform: "translateY(0)",
        },
    },
    contentWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        zIndex: 1,
    }
}

export default styles
