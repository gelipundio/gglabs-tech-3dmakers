"use client";

import { useState, useEffect } from "react";
import {
    Container, Box, TextField, Button, Typography,
    Alert, Stack, Card, CardMedia, CardContent, IconButton,
    CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogContentText, DialogActions, LinearProgress
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
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CollectionsIcon from '@mui/icons-material/Collections';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function DashboardPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [showForm, setShowForm] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [fitMode, setFitMode] = useState("cover");
    const [isPublic, setIsPublic] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
    const [gallery, setGallery] = useState({ open: false, media: [], currentIndex: 0 });
    const [youtubeUrls, setYoutubeUrls] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const newPreviews = selectedFiles.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type.startsWith('video/') ? 'video' : 'image',
                name: file.name
            }));
            setPreviews(newPreviews);
            return () => newPreviews.forEach(p => URL.revokeObjectURL(p.url));
        } else {
            setPreviews([]);
        }
    }, [selectedFiles]);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...filesArray]);
        }
    };

    const removeSelectedFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setUploading(true);
        setMessage({ type: "", text: "" });
        setProgress(10);
        setUploadStatus("🚀 Preparing files for upload...");

        try {
            const formData = new FormData(event.currentTarget);
            selectedFiles.forEach(file => {
                formData.append("photo", file);
            });
            formData.set("fit_mode", fitMode);
            formData.set("is_public", isPublic);
            formData.set("youtube_urls", youtubeUrls);

            setUploadStatus("Uploading your files and videos...");
            setProgress(30);

            const statusInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 90) return prev + 5;
                    return prev;
                });
                setUploadStatus("Uploading your files and videos...");
            }, 3000);

            const result = await uploadProduct(formData);
            clearInterval(statusInterval);

            if (result.success) {
                setProgress(100);
                setUploadStatus("Upload complete!");
                setMessage({ type: "success", text: "Product uploaded successfully!" });

                setTimeout(() => {
                    setShowForm(false);
                    setSelectedFiles([]);
                    setFitMode("cover");
                    setIsPublic(true);
                    setYoutubeUrls("");
                    setProgress(0);
                    setUploadStatus("");
                    setUploading(false);
                    fetchProducts();
                }, 1500);
            } else {
                setMessage({ type: "error", text: result.error || "Failed to upload product" });
                setProgress(0);
                setUploadStatus(`Error: ${result.error || "Failed to upload"}`);
                setUploading(false);
            }
        } catch (error) {
            console.error("Upload handler error:", error);
            setMessage({ type: "error", text: "An unexpected error occurred during upload. Please try again." });
            setProgress(0);
            setUploadStatus("Upload failed. Please try again.");
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
        <Box sx={styles.layout}>
            <AdminNavbar />
            <Container sx={styles.dashboardContainer}>
                <Box sx={styles.headerRow}>
                    <Typography variant="h4" sx={styles.pageTitle}>
                        Admin Dashboard
                    </Typography>
                    <Button
                        startIcon={showForm ? <CloseIcon /> : <AddIcon />}
                        variant="contained"
                        onClick={() => {
                            setShowForm(!showForm);
                            if (showForm) {
                                setSelectedFiles([]);
                                setFitMode("cover");
                                setIsPublic(true);
                            }
                        }}
                        sx={styles.addBtn}
                    >
                        {showForm ? "Cancel" : "Add Product"}
                    </Button>
                </Box>

                {message.text && (
                    <Alert severity={message.type} sx={styles.alert}>
                        {message.text}
                    </Alert>
                )}

                {showForm && (
                    <Box sx={styles.uploadCard} component="div" className="fade-in">
                        <Typography variant="h6">Upload New Product</Typography>
                        <Box component="form" onSubmit={handleUpload} sx={styles.form}>
                            <input
                                accept="image/*,video/*"
                                style={{ display: 'none' }}
                                id="photo-upload"
                                type="file"
                                multiple
                                onChange={handleFileChange}
                            />

                            {previews.length === 0 ? (
                                <label htmlFor="photo-upload">
                                    <Box sx={styles.uploadButton}>
                                        <CloudUploadIcon sx={{ fontSize: 40, mb: 1, color: 'text.secondary' }} />
                                        <Typography color="text.secondary">
                                            Click to select or drag product photos & videos
                                        </Typography>
                                    </Box>
                                </label>
                            ) : (
                                <Box sx={styles.previewContainer}>
                                    <Box sx={styles.mediaGrid}>
                                        {previews.map((preview, index) => (
                                            <Box key={index} sx={styles.mediaPreview}>
                                                {preview.type === 'video' ? (
                                                    <video src={preview.url} muted />
                                                ) : (
                                                    <img src={preview.url} alt="Preview" style={{ objectFit: fitMode }} />
                                                )}
                                                <Box sx={styles.mediaTypeIcon}>
                                                    {preview.type === 'video' ? <PlayCircleOutlineIcon fontSize="small" /> : <CollectionsIcon fontSize="small" />}
                                                </Box>
                                                <IconButton
                                                    size="small"
                                                    sx={styles.removeMedia}
                                                    onClick={() => removeSelectedFile(index)}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <label htmlFor="photo-upload">
                                            <Box sx={styles.mediaAddButton}>
                                                <AddIcon color="action" />
                                            </Box>
                                        </label>
                                    </Box>

                                    <Stack direction="row" spacing={1} justifyContent="center" sx={styles.fitModeStack}>
                                        <Button
                                            size="small"
                                            variant={fitMode === "cover" ? "contained" : "outlined"}
                                            onClick={() => setFitMode("cover")}
                                        >
                                            Cover
                                        </Button>
                                        <Button
                                            size="small"
                                            variant={fitMode === "contain" ? "contained" : "outlined"}
                                            onClick={() => setFitMode("contain")}
                                        >
                                            Contain
                                        </Button>
                                    </Stack>
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
                                slotProps={{ htmlInput: { step: "0.01" } }}
                                required
                                fullWidth
                                sx={styles.input}
                            />
                            <TextField
                                label="YouTube URLs"
                                placeholder="https://www.youtube.com/watch?v=..., comma separated"
                                value={youtubeUrls}
                                onChange={(e) => setYoutubeUrls(e.target.value)}
                                fullWidth
                                sx={styles.input}
                                helperText="Optional: Add one or more YouTube video links"
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
                                sx={styles.visibilityLabel}
                            />
                            {uploading && (
                                <Box sx={styles.progressWrapper}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={progress}
                                        sx={styles.progressBar}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={styles.statusText}
                                    >
                                        {uploadStatus}
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={uploading || selectedFiles.length === 0}
                                sx={styles.submitBtn}
                            >
                                {uploading ? "Uploading..." : "Publish Product"}
                            </Button>
                        </Box>
                    </Box>
                )}

                <Typography variant="h5" sx={styles.sectionTitle}>
                    Current Products ({products.length})
                </Typography>

                {
                    loading ? (
                        <CircularProgress sx={styles.loader} />
                    ) : (
                        <Box sx={styles.productList}>
                            {products.map((product) => (
                                <Card key={product.id} sx={styles.productCard} className="fade-in">
                                    <Box
                                        sx={styles.imageWrapper}
                                        onClick={() => setGallery({ open: true, media: product.media || [{ url: product.image_url, type: 'image' }], currentIndex: 0 })}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.image_url}
                                            alt={product.description}
                                            sx={{
                                                ...styles.productImage,
                                                objectFit: product.fit_mode || "cover"
                                            }}
                                        />
                                        {product.media && (product.media.length > 1 || product.media.some(m => m.type === 'video' || m.type === 'youtube')) && (
                                            <Box sx={styles.mediaPill}>
                                                {product.media.some(m => m.type === 'video' || m.type === 'youtube') && (
                                                    <PlayCircleOutlineIcon sx={styles.mediaBadgeIcon} />
                                                )}
                                                {product.media.length > 1 && (
                                                    <Box sx={styles.actionIconWrapper}>
                                                        <CollectionsIcon sx={{ fontSize: "1rem" }} />
                                                        <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", lineHeight: 1 }}>
                                                            {product.media.length}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Box>
                                    <CardContent sx={styles.productInfo}>
                                        <Box sx={{
                                            ...styles.statusChip,
                                            bgcolor: product.is_public ? "rgba(76, 175, 80, 0.1)" : "rgba(255, 193, 7, 0.1)",
                                            color: product.is_public ? "#4caf50" : "#ffc107",
                                            borderColor: product.is_public ? "rgba(76, 175, 80, 0.3)" : "rgba(255, 193, 7, 0.3)",
                                        }}>
                                            {product.is_public ? "Public" : "Private"}
                                        </Box>
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                            <Box sx={{ flex: 1, mr: 2, minWidth: 0 }}>
                                                <Typography variant="body1" sx={styles.productDescription}>
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
                    )
                }

                {
                    products.length === 0 && !loading && (
                        <Typography color="text.secondary" sx={styles.emptyState}>
                            No products added yet.
                        </Typography>
                    )
                }
            </Container >

            <Dialog
                open={gallery.open}
                onClose={() => setGallery({ open: false, media: [], currentIndex: 0 })}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: styles.galleryDialog
                }}
            >
                <Box sx={styles.galleryContent}>
                    <IconButton
                        sx={styles.closeBtn}
                        onClick={() => setGallery({ open: false, media: [], currentIndex: 0 })}
                    >
                        <CloseIcon />
                    </IconButton>

                    {gallery.media.length > 0 && (
                        <>
                            {gallery.media[gallery.currentIndex].type === 'youtube' ? (
                                <Box sx={styles.youtubeWrapper}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${gallery.media[gallery.currentIndex].id}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </Box>
                            ) : gallery.media[gallery.currentIndex].type === 'video' ? (
                                <Box component="video" controls autoPlay src={gallery.media[gallery.currentIndex].url} sx={styles.galleryMedia} />
                            ) : (
                                <Box component="img" src={gallery.media[gallery.currentIndex].url} sx={styles.galleryMedia} />
                            )}

                            {gallery.media.length > 1 && (
                                <>
                                    <IconButton
                                        sx={styles.navArrowLeft}
                                        onClick={() => setGallery(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.media.length) % prev.media.length }))}
                                    >
                                        <NavigateBeforeIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton
                                        sx={styles.navArrowRight}
                                        onClick={() => setGallery(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.media.length }))}
                                    >
                                        <NavigateNextIcon fontSize="large" />
                                    </IconButton>
                                </>
                            )}

                            <Box sx={styles.galleryCounter}>
                                {gallery.currentIndex + 1} / {gallery.media.length}
                            </Box>
                        </>
                    )}
                </Box>
            </Dialog>

            <Dialog
                open={deleteConfirm.open}
                onClose={() => setDeleteConfirm({ open: false, id: null })}
                PaperProps={{
                    sx: styles.deleteDialog
                }}
            >
                <DialogTitle sx={styles.dialogTitle}>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={styles.dialogText}>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={styles.dialogActions}>
                    <Button
                        onClick={() => setDeleteConfirm({ open: false, id: null })}
                        sx={styles.cancelDeleteBtn}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        variant="contained"
                        color="error"
                        sx={styles.deleteBtn}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}
