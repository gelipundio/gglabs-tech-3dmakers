const styles = {
    headerRoot: {
        textAlign: "center",
        mb: 4,
        pt: 6,
    },
    headerRootSmall: {
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 2,
        mb: 2,
        pt: 2,
    },
    logoArea: {
        width: 140,
        height: 140,
        margin: "0 auto 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logoAreaSmall: {
        width: 60,
        height: 60,
        margin: 0,
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
    titleSmall: {
        fontSize: "1.2rem",
        fontWeight: 800,
        letterSpacing: "-0.05em",
        mb: 0,
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
    tagline: {
        fontSize: "0.85rem",
        opacity: 0.7
    },
};

export default styles;
