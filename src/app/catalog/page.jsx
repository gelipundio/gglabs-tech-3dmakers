"use client";

import { useState, useEffect } from "react";
import { Container, Box, Typography, Stack, Card, CardMedia, CardContent, CircularProgress, Button } from "@mui/material";
import { getPublicProducts } from "../admin/actions";
import styles from "./styles";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getPublicProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Container sx={styles.container}>
                <Stack direction="row" sx={{ width: "100%", mt: 2 }}>
                    <Button
                        component={Link}
                        href="/"
                        startIcon={<ArrowBackIcon />}
                        sx={{ color: "text.secondary" }}
                    >
                        Back to Home
                    </Button>
                </Stack>

                <Header />

                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography variant="h2" sx={styles.title}>
                        Product Catalog
                    </Typography>
                    <Typography variant="body1" sx={styles.subtitle}>
                        Explore our custom 3D printed products, prototypes, and designs.
                        Each piece is crafted with precision and care.
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                        <CircularProgress size={60} />
                    </Box>
                ) : products.length > 0 ? (
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
                                    <Typography variant="body1" sx={styles.description}>
                                        {product.description}
                                    </Typography>
                                    <Box sx={{ mt: "auto", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                                        <Typography variant="h6" sx={styles.price}>
                                            ${product.price}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Typography color="text.secondary" sx={{ mt: 10, textAlign: "center", fontSize: "1.2rem" }}>
                        Our catalog is being updated. Please check back soon!
                    </Typography>
                )}
            </Container>
            <Footer sx={{ mt: 10 }} />
        </Box>
    );
}
