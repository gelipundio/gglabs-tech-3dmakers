"use client";

import { useState, useEffect } from "react";
import {
    Container, Box, TextField, Button, Typography,
    Alert, Stack, Card, CardMedia, CardContent, IconButton,
    CircularProgress
} from "@mui/material";
import { uploadProduct, getProducts, deleteProduct } from "../actions";
import styles from "./styles";
import AdminNavbar from "@/components/AdminNavbar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function DashboardPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fitMode, setFitMode] = useState("cover");

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

            const result = await uploadProduct(formData);

            if (result.success) {
                setMessage({ type: "success", text: "Product uploaded successfully!" });
                setShowForm(false);
                setSelectedFile(null);
                setFitMode("cover");
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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const result = await deleteProduct(id);
            if (result.success) {
                fetchProducts();
            } else {
                alert(result.error);
            }
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
                                <CardMedia
                                    component="img"
                                    image={product.image_url}
                                    alt={product.description}
                                    sx={{
                                        ...styles.productImage,
                                        objectFit: product.fit_mode || "cover"
                                    }}
                                />
                                <CardContent sx={styles.productInfo}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h6" sx={styles.price}>
                                                ${product.price}
                                            </Typography>
                                        </Box>
                                        <IconButton onClick={() => handleDelete(product.id)} color="error" size="small">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
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
        </Box>
    );
}
