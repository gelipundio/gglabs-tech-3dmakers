"use client";

import { useState, useEffect } from "react";
import {
    Container, Box, TextField, Button, Typography,
    Alert, Stack, Card, CardMedia, CardContent, IconButton,
    CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions
} from "@mui/material";
import { uploadProduct, getProducts, deleteProduct, toggleVisibility } from "../actions";
import styles from "./styles";
import AdminNavbar from "@/components/AdminNavbar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function DashboardPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fitMode, setFitMode] = useState("cover");
    const [isPublic, setIsPublic] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setUploading(true);
        setMessage({ type: "", text: "" });

        try {
            const formData = new FormData(event.currentTarget);
            if (selectedFile) {
                formData.set("photo", selectedFile);
            }
            formData.set("fit_mode", fitMode);
            formData.set("is_public", isPublic);

            const result = await uploadProduct(formData);

            if (result.success) {
                setMessage({ type: "success", text: "Product uploaded successfully!" });
                setShowForm(false);
                setSelectedFile(null);
                setFitMode("cover");
                setIsPublic(true);
                fetchProducts();
            } else {
                setMessage({ type: "error", text: result.error || "Failed to upload product" });
            }
        } catch (error) {
            console.error("Upload handler error:", error);
            setMessage({ type: "error", text: "An unexpected error occurred during upload. Please try again." });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirm({ open: true, id });
    };

    const confirmDelete = async () => {
        const id = deleteConfirm.id;
        setDeleteConfirm({ open: false, id: null });

        const result = await deleteProduct(id);
        if (result.success) {
            fetchProducts();
        } else {
            alert(result.error);
        }
    };

    const handleToggleVisibility = async (id, currentStatus) => {
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === id ? { ...p, is_public: !currentStatus } : p
            )
        );

        const result = await toggleVisibility(id, currentStatus);

        if (!result.success) {
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === id ? { ...p, is_public: currentStatus } : p
                )
            );
            alert(result.error);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <AdminNavbar />
            <Container sx={{ ...styles.container, pt: 2 }}>
                <Box sx={styles.headerRow}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Admin Dashboard
                    </Typography>
                    <Button
                        startIcon={showForm ? <CloseIcon /> : <AddIcon />}
                        variant="contained"
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm) {
                                setSelectedFile(null);
                                setFitMode("cover");
                                setIsPublic(true);
                            }
                        }}
                        sx={{ height: 40 }}
                    >
                        {showForm ? "Cancel" : "Add Product"}
                    </Button>
                </Box>

                {message.text && (
                    <Alert severity={message.type} sx={{ width: "100%" }}>
                        {message.text}
                    </Alert>
                )}

                {showForm && (
                    <Box sx={styles.uploadCard} component="div" className="fade-in">
                        <Typography variant="h6">Upload New Product</Typography>
                        <Box component="form" onSubmit={handleUpload} sx={styles.form}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="photo-upload"
                                type="file"
                                onChange={handleFileChange}
                            />

                            {!previewUrl ? (
                                <label htmlFor="photo-upload">
                                    <Box sx={styles.uploadButton}>
                                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
                                        <Typography color="text.secondary">
                                            Click to select or drag a product photo
                                        </Typography>
                                    </Box>
                                </label>
                            ) : (
                                <Box sx={styles.previewContainer}>
                                    <Box
                                        component="img"
                                        src={previewUrl}
                                        sx={{
                                            ...styles.previewImage,
                                            objectFit: fitMode
                                        }}
                                    />
                                    <Box sx={styles.controlsOverlay}>
                                        <Button
                                            size="small"
                                            variant={fitMode === "cover" ? "contained" : "text"}
                                            onClick={() => setFitMode("cover")}
                                        >
                                            Cover
                                        </Button>
                                        <Button
                                            size="small"
                                            variant={fitMode === "contain" ? "contained" : "text"}
                                            onClick={() => setFitMode("contain")}
                                        >
                                            Contain
                                        </Button>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            onClick={() => setSelectedFile(null)}
                                        >
                                            Change
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                            <TextField
                                name="description"
                                label="Description"
                                multiline
                                rows={3}
                                required
                                fullWidth
                                sx={styles.input}
                            />
                            <TextField
                                name="price"
                                label="Price"
                                type="number"
                                step="0.01"
                                required
                                fullWidth
                                sx={styles.input}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isPublic}
                                        onChange={(e) => setIsPublic(e.target.checked)}
                                        color="success"
                                    />
                                }
                                label={isPublic ? "Public" : "Private"}
                                sx={{
                                    mb: 1,
                                    color: "text.secondary",
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: "0.9rem",
                                        fontWeight: 500
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={uploading || !selectedFile}
                                sx={{ py: 1.5 }}
                            >
                                {uploading ? <CircularProgress size={24} color="inherit" /> : "Publish Product"}
                            </Button>
                        </Box>
                    </Box>
                )}

                <Typography variant="h5" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                    Current Products ({products.length})
                </Typography>

                {loading ? (
                    <CircularProgress sx={{ mt: 4 }} />
                ) : (
                    <Box sx={styles.productList}>
                        {products.map((product) => (
                            <Card key={product.id} sx={styles.productCard} className="fade-in">
                                <Box sx={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        image={product.image_url}
                                        alt={product.description}
                                        sx={{
                                            ...styles.productImage,
                                            objectFit: product.fit_mode || "cover"
                                        }}
                                    />
                                    <Box sx={{
                                        ...styles.statusChip,
                                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                                        color: product.is_public ? "#4caf50" : "#fb8c00",
                                        borderColor: product.is_public ? "rgba(76, 175, 80, 0.4)" : "rgba(251, 140, 0, 0.4)",
                                    }}>
                                        {product.is_public ? "Public" : "Private"}
                                    </Box>
                                </Box>
                                <CardContent sx={styles.productInfo}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box sx={{ flex: 1, mr: 2, minWidth: 0 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.2, mb: 0.5 }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h6" sx={styles.price}>
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0, mt: 0.2 }}>
                                            <IconButton
                                                onClick={() => handleToggleVisibility(product.id, product.is_public)}
                                                size="small"
                                                title={product.is_public ? "Make Private" : "Make Public"}
                                                sx={{
                                                    color: "rgba(255, 255, 255, 0.35)",
                                                    bgcolor: "rgba(255, 255, 255, 0.03)",
                                                    "&:hover": {
                                                        color: "rgba(255, 255, 255, 0.7)",
                                                        bgcolor: "rgba(255, 255, 255, 0.1)"
                                                    }
                                                }}
                                            >
                                                {product.is_public ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleDelete(product.id)}
                                                size="small"
                                                title="Delete"
                                                sx={{
                                                    color: "rgba(211, 47, 47, 0.6)",
                                                    bgcolor: "rgba(211, 47, 47, 0.05)",
                                                    "&:hover": {
                                                        color: "rgba(211, 47, 47, 1)",
                                                        bgcolor: "rgba(211, 47, 47, 0.15)"
                                                    }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                {products.length === 0 && !loading && (
                    <Typography color="text.secondary" sx={{ mt: 4 }}>
                        No products added yet.
                    </Typography>
                )}
            </Container>

            <Dialog
                open={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null })}
                PaperProps={{
                    sx: {
                        bgcolor: "rgba(30, 30, 30, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: 3,
                    }
                }}
            >
                <DialogTitle sx={{ color: "error.main", fontWeight: 700 }}>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: "text.secondary" }}>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, pt: 0 }}>
                    <Button
                        onClick={() => setDeleteConfirm({ open: false, id: null })}
                        sx={{ color: "text.primary" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: 2 }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
