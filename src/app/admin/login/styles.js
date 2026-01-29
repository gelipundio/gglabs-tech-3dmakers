const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        maxWidth: "400px",
        margin: "0 auto",
        gap: 4,
    },
    card: {
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
    title: {
        textAlign: "center",
        fontWeight: 700,
        color: "text.primary",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 3,
    },
    input: {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
        },
    },
    button: {
        py: 1.5,
        borderRadius: 2,
        fontSize: "1rem",
        fontWeight: 600,
    },
};

export default styles;
