"use client";

import { useState, useEffect } from "react";
import {
    Container, Box, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Autocomplete, Alert, CircularProgress, Paper,
    Dialog
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminNavbar from "@/components/AdminNavbar";
import { getProducts, getSales, recordSale, deleteSale } from "../actions";
import styles from "./styles";

export default function SalesPage() {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customDescription, setCustomDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [priceUnit, setPriceUnit] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [productsData, salesData] = await Promise.all([
            getProducts(),
            getSales()
        ]);
        setProducts(productsData);
        setSales(salesData);
        setLoading(false);
    };

    const handleProductChange = (event, newValue) => {
        setSelectedProduct(newValue);
        if (newValue) {
            setCustomDescription(newValue.description);
            setPriceUnit(newValue.price);
        } else {
            setCustomDescription("");
            setPriceUnit("");
        }
    };

    const calculateTotal = () => {
        const qty = parseInt(quantity) || 0;
        const price = parseFloat(priceUnit) || 0;
        return (qty * price).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: "", text: "" });

        const desc = selectedProduct ? selectedProduct.description : customDescription;
        const imageUrl = selectedProduct ? selectedProduct.image_url : null;

        if (!desc || !quantity || !priceUnit) {
            setMessage({ type: "error", text: "Please fill in all fields." });
            setSubmitting(false);
            return;
        }

        const result = await recordSale(desc, parseInt(quantity), parseFloat(priceUnit), imageUrl);

        if (result.success) {
            setMessage({ type: "success", text: "Sale recorded successfully!" });
            setSales(await getSales());
            setSelectedProduct(null);
            setCustomDescription("");
            setQuantity(1);
            setPriceUnit("");
        } else {
            setMessage({ type: "error", text: result.error || "Failed to record sale." });
        }
        setSubmitting(false);
    };

    const confirmDelete = (id) => {
        setDeleteModal({ open: true, id });
    };

    const handleDelete = async () => {
        if (!deleteModal.id) return;

        const result = await deleteSale(deleteModal.id);
        if (result.success) {
            setSales(prev => prev.filter(s => s.id !== deleteModal.id));
            setDeleteModal({ open: false, id: null });
        } else {
            alert(result.error);
        }
    };

    const totalRevenue = sales.reduce((acc, curr) => acc + parseFloat(curr.total_price), 0);

    return (
        <Box sx={styles.layout}>
            <AdminNavbar />
            <Container sx={styles.container}>
                <Typography variant="h4" sx={styles.pageTitle}>
                    Sales Tracker
                </Typography>

                <Box sx={styles.gridContainer}>
                    <Box component={Paper} sx={styles.card}>
                        <Typography variant="h5" sx={styles.sectionTitle}>
                            New Sale
                        </Typography>

                        {message.text && (
                            <Alert severity={message.type} sx={styles.alert}>
                                {message.text}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit}>
                            <Autocomplete
                                options={products}
                                getOptionLabel={(option) => `${option.description} ($${option.price})`}
                                value={selectedProduct}
                                onChange={handleProductChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Product (Optional)"
                                        sx={styles.input}
                                        helperText="Select from catalog or type custom description below"
                                    />
                                )}
                                PaperComponent={({ children }) => (
                                    <Paper sx={styles.paperDark}>{children}</Paper>
                                )}
                            />

                            <TextField
                                label="Description"
                                value={customDescription}
                                onChange={(e) => setCustomDescription(e.target.value)}
                                fullWidth
                                required
                                sx={styles.input}
                            />

                            <Box sx={styles.flexGap}>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                    fullWidth
                                    sx={styles.input}
                                />
                                <TextField
                                    label="Price per Unit"
                                    type="number"
                                    value={priceUnit}
                                    onChange={(e) => setPriceUnit(e.target.value)}
                                    required
                                    fullWidth
                                    sx={styles.input}
                                    slotProps={{ htmlInput: { step: "0.01" } }}
                                />
                            </Box>

                            <Box sx={styles.totalDisplay}>
                                <Typography variant="caption" sx={styles.totalLabel}>
                                    TOTAL
                                </Typography>
                                <Typography sx={styles.totalText}>
                                    ${calculateTotal()}
                                </Typography>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={submitting}
                                sx={styles.submitBtn}
                            >
                                {submitting ? "Adding..." : "Add Products"}
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={styles.historySection}>
                        <Box component={Paper} sx={[styles.card, styles.cardFlex]}>
                            <Typography variant="h5" sx={styles.sectionTitle}>
                                Recent Sales
                            </Typography>

                            {loading ? (
                                <CircularProgress color="inherit" />
                            ) : sales.length > 0 ? (
                                <TableContainer sx={styles.tableContainer}>
                                    <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={[styles.tableCell, styles.tableHeaderCell, styles.tableHeaderCellImage]}></TableCell>
                                                <TableCell sx={[styles.tableCell, styles.tableHeaderCell]}>Item</TableCell>
                                                <TableCell align="right" sx={[styles.tableCell, styles.tableHeaderCell]}>Qty</TableCell>
                                                <TableCell align="right" sx={[styles.tableCell, styles.tableHeaderCell]}>Total</TableCell>
                                                <TableCell align="right" sx={[styles.tableCell, styles.tableHeaderCell]}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sales.map((sale) => (
                                                <TableRow key={sale.id} sx={styles.tableRow}>
                                                    <TableCell sx={styles.tableCell}>
                                                        {sale.image_url && (
                                                            <Box
                                                                component="img"
                                                                src={sale.image_url}
                                                                alt=""
                                                                sx={styles.productImage}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell sx={styles.tableCell}>
                                                        <Typography variant="body2" sx={styles.productName}>
                                                            {sale.description}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {new Date(sale.created_at).toLocaleDateString()}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right" sx={styles.tableCell}>
                                                        {sale.quantity}
                                                    </TableCell>
                                                    <TableCell align="right" sx={[styles.tableCell, styles.priceCell]}>
                                                        ${sale.total_price}
                                                    </TableCell>
                                                    <TableCell align="right" sx={styles.tableCell}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => confirmDelete(sale.id)}
                                                            sx={styles.deleteBtn}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography color="text.secondary">No sales recorded yet.</Typography>
                            )}
                        </Box>

                        <Box sx={styles.revenueCard}>
                            <Typography sx={styles.revenueLabel}>Total Revenue</Typography>
                            <Typography sx={styles.revenueValue}>${totalRevenue.toFixed(2)}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Dialog
                open={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, id: null })}
                PaperProps={{ sx: styles.dialogPaper }}
            >
                <Box sx={styles.dialogContent}>
                    <Typography variant="h6" sx={styles.dialogTitle}>Confirm Deletion</Typography>
                    <Typography sx={styles.dialogText}>
                        Are you sure you want to remove this sale record?
                    </Typography>
                    <Box sx={styles.dialogActions}>
                        <Button
                            onClick={() => setDeleteModal({ open: false, id: null })}
                            sx={styles.cancelBtn}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}
