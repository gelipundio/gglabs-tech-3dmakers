const styles = {
    layout: {
        minHeight: "100vh",
        bgcolor: "#000",
        color: "#fff",
        background: "radial-gradient(circle at 50% 10%, #222, #000)"
    },
    container: {
        pt: 12,
        pb: 8,
        position: "relative",
        zIndex: 1
    },
    pageTitle: {
        fontWeight: 800,
        mb: 4,
        background: "linear-gradient(45deg, #fff, #888)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4
    },
    card: {
        bgcolor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        p: 3,
        height: '100%'
    },
    sectionTitle: {
        fontWeight: 700,
        mb: 3,
        color: "#fff"
    },
    input: {
        mb: 2,
        "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
            "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
            "&.Mui-focused fieldset": { borderColor: "#fff" }
        },
        "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" }
    },
    totalDisplay: {
        mt: 2,
        mb: 3,
        p: 2,
        bgcolor: "rgba(76, 175, 80, 0.1)",
        borderRadius: 2,
        border: "1px solid rgba(76, 175, 80, 0.3)",
        textAlign: 'center'
    },
    totalText: {
        color: "#4caf50",
        fontWeight: 800,
        fontSize: "1.5rem"
    },
    submitBtn: {
        mt: 1,
        bgcolor: "#fff",
        color: "#000",
        fontWeight: 700,
        "&:hover": {
            bgcolor: "#e0e0e0"
        },
        py: 1.5
    },
    tableContainer: {
        mt: 2,
        maxHeight: 400,
        overflow: 'auto',
        "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.05)",
        }
    },
    tableHeadMsg: {
        color: "text.secondary",
        fontSize: "0.85rem",
        fontWeight: 600
    },
    tableRow: {
        "&:last-child td, &:last-child th": { border: 0 }
    },
    tableCell: {
        color: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.1)"
    },
    deleteBtn: {
        color: "rgba(244, 67, 54, 0.7)",
        "&:hover": {
            color: "#f44336",
            bgcolor: "rgba(244, 67, 54, 0.1)"
        }
    },
    revenueCard: {
        mt: 4,
        p: 3,
        bgcolor: "rgba(33, 150, 243, 0.1)",
        border: "1px solid rgba(33, 150, 243, 0.3)",
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    revenueLabel: {
        color: "#90caf9",
        fontWeight: 600
    },
    revenueValue: {
        color: "#fff",
        fontWeight: 800,
        fontSize: "2rem"
    },
    alert: {
        mb: 2,
        borderRadius: 2
    },
    paperDark: {
        bgcolor: '#333',
        color: '#fff'
    },
    flexGap: {
        display: 'flex',
        gap: 2
    },
    totalLabel: {
        display: 'block',
        color: 'text.secondary',
        mb: 0.5
    },
    productImage: {
        width: 40,
        height: 40,
        objectFit: 'cover',
        borderRadius: 1
    },
    productName: {
        fontWeight: 600
    },
    priceCell: {
        color: '#81c784',
        fontWeight: 600
    },
    tableHeaderCell: {
        bgcolor: '#222'
    },
    dialogPaper: {
        bgcolor: '#222',
        color: '#fff',
        border: '1px solid #444'
    },
    dialogContent: {
        p: 3
    },
    dialogTitle: {
        mb: 2
    },
    dialogText: {
        color: 'text.secondary',
        mb: 3
    },
    dialogActions: {
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
    },
    cancelBtn: {
        color: '#fff'
    },
    historySection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    cardFlex: {
        flex: 1
    },
    tableHeaderCellImage: {
        width: 60
    }
};

export default styles;
