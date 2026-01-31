"use client";

import { useState, useEffect } from "react";
import { Container, Box, Typography, Stack, Card, CardMedia, CardContent, CircularProgress, Button } from "@mui/material";
import { getPublicProducts } from "../admin/actions";
import styles from "./styles";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import CollectionsIcon from '@mui/icons-material/Collections';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Dialog, IconButton } from "@mui/material";

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gallery, setGallery] = useState({ open: false, media: [], currentIndex: 0 });

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getPublicProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const sortMedia = (media) => {
        if (!media || media.length === 0) return media;
        const order = { image: 0, video: 1, youtube: 2 };
        return [...media].sort((a, b) => order[a.type] - order[b.type]);
    };

    return (
        <Box sx={styles.layout}>
            <Container sx={styles.container}>
                <Stack direction="row" sx={styles.backLinkContainer}>
                    <Button
                        component={Link}
                        href="/"
                        startIcon={<ArrowBackIcon />}
                        sx={styles.backLink}
                    >
                        Back to Home
                    </Button>
                </Stack>

                <Header size="small" sx={styles.cornerHeader} />

                <Box sx={styles.headerBox}>
                    <Typography variant="h2" sx={styles.title}>
                        Product Catalog
                    </Typography>
                    <Typography variant="body1" sx={styles.subtitle}>
                        Explore our custom 3D printed products, prototypes, and designs.
                        Each piece is crafted with precision and care.
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={styles.loaderBox}>
                        <CircularProgress size={60} />
                    </Box>
                ) : products.length > 0 ? (
                    <Box sx={styles.productList}>
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                sx={styles.productCard}
                                className="fade-in"
                                onClick={() => setGallery({ open: true, media: sortMedia(product.media || [{ url: product.image_url, type: 'image' }]), currentIndex: 0 })}
                            >
                                <Box sx={styles.imageContainer}>
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
                                                <Box sx={styles.mediaIconWrapper}>
                                                    <PlayCircleOutlineIcon sx={styles.mediaBadgeIcon} />
                                                </Box>
                                            )}
                                            {product.media.length > 1 && (
                                                <Box sx={styles.mediaIconWrapper}>
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
                                    <Typography variant="body1" sx={styles.description}>
                                        {product.description}
                                    </Typography>
                                    <Box sx={styles.productInfoFooter}>
                                        <Typography variant="h6" sx={styles.price}>
                                            ${product.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Typography color="text.secondary" sx={styles.emptyMessage}>
                        Our catalog is being updated. Please check back soon!
                    </Typography>
                )}
            </Container>

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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setGallery(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.media.length) % prev.media.length }));
                                        }}
                                    >
                                        <NavigateBeforeIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton
                                        sx={styles.navArrowRight}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setGallery(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.media.length }));
                                        }}
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

            <Footer sx={styles.footerContainer} />
        </Box>
    );
}
