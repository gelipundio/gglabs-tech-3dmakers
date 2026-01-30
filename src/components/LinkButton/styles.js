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
            background: "rgba(255, 255, 255, 0.08)",
            color: "text.primary",
            transform: "translateY(-4px) scale(1.02)",
            boxShadow: "0 12px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            "& .MuiSvgIcon-root": {
                color: "primary.main",
            },
            "& .arrow-icon": {
                opacity: 1,
                transform: "translateX(6px)",
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
