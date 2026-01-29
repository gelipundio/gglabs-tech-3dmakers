"use client";

import { useState } from "react";
import { Container, Box, TextField, Button, Typography, Alert } from "@mui/material";
import { login } from "../actions";
import { useRouter } from "next/navigation";
import styles from "./styles";
import Header from "@/components/Header/Header";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const result = await login(formData);

        if (result.success) {
            router.push("/admin/dashboard");
            router.refresh();
        } else {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        <Container sx={styles.container}>
            <Header />
            <Box sx={styles.card} component="div" className="fade-in">
                <Typography variant="h5" sx={styles.title}>
                    Admin Access
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        sx={styles.input}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={styles.button}
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
