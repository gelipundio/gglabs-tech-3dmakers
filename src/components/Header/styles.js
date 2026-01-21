const styles = {
    headerRoot: {
        textAlign: "center",
        mb: 4,
        pt: 6,
    },
    logoArea: {
        width: 140,
        height: 140,
        margin: "0 auto 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
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
