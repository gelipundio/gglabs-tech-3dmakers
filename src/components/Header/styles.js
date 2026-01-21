const styles = {
    headerRoot: {
        textAlign: "center",
        mb: 4,
        pt: 6,
    },
    logoArea: {
        width: 80,
        height: 80,
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        margin: "0 auto 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "primary.main",
        boxShadow: "0 0 30px -10px rgba(255, 255, 255, 0.1)",
    },
    title: {
        fontSize: "1.75rem",
        fontWeight: 800,
        letterSpacing: "-0.05em",
        mb: 1,
        background: "linear-gradient(to right, #fff, #999)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    description: {
        color: "text.secondary",
        fontSize: "0.95rem",
        maxWidth: 300,
        margin: "0 auto",
        lineHeight: 1.5,
    },
};

export default styles;
