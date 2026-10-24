import { keyframes } from "@emotion/react";

const ruletaSpin = keyframes`
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const ruletaGlow = keyframes`
    0%, 100% { box-shadow: 0 0 14px rgba(30, 144, 255, 0.3); }
    50% { box-shadow: 0 0 28px rgba(30, 144, 255, 0.65); }
`;

const styles = {
    linksStack: {
        width: "100%",
        padding: 0,
        margin: 0,
        gap: 0,
    },
    // Festive gradient: Halloween orange into Christmas red and green.
    seasonalLink: {
        background: "linear-gradient(135deg, #ff7a18 0%, #c62828 55%, #2e7d32 100%)",
        borderColor: "transparent",
        color: "#fff",
        fontWeight: 700,
        "& .arrow-icon": { opacity: 0.9 },
        "&:hover": {
            background: "linear-gradient(135deg, #ff8f3a 0%, #d84343 55%, #3c9442 100%)",
            color: "#fff",
            borderColor: "transparent",
            "& .MuiSvgIcon-root": { color: "#fff" },
        },
    },
    // Blue light spinning around the border, plus a soft pulsing glow.
    ruletaLink: {
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        borderColor: "transparent",
        boxShadow: "0 0 18px rgba(30, 144, 255, 0.35)",
        "&.fade-in": {
            animation: `fadeIn 0.6s ease-out forwards, ${ruletaGlow} 2.4s ease-in-out infinite`,
        },
        // Spinning conic gradient; only a 2px ring of it shows past ::after.
        "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(200%, 600px)",
            aspectRatio: "1",
            background:
                "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, #1e90ff 280deg, #8fd3ff 330deg, #1e90ff 360deg)",
            animation: `${ruletaSpin} 3s linear infinite`,
            zIndex: -1,
        },
        "&::after": {
            content: '""',
            position: "absolute",
            inset: "2px",
            borderRadius: "inherit",
            bgcolor: "background.paper",
            zIndex: -1,
            transition: "background-color 0.3s ease",
        },
        "& .MuiSvgIcon-root": { color: "#4fc3f7" },
        "&:hover": {
            borderColor: "transparent",
            "& .MuiSvgIcon-root": { color: "#8fd3ff" },
            "&::after": { bgcolor: "#1f2630" },
        },
        "@media (prefers-reduced-motion: reduce)": {
            "&::before": { animation: "none" },
            "&.fade-in": { animation: "fadeIn 0.6s ease-out forwards" },
        },
    },
};

export default styles;
