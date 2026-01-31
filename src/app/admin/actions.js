"use server";

import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PWD = process.env.ADMIN_PWD || process.env.admin_pwd;

if (!process.env.POSTGRES_URL && process.env.DATABASE_URL) {
    process.env.POSTGRES_URL = process.env.DATABASE_URL;
}

const db = sql;

async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "true") {
        throw new Error("Unauthorized");
    }
}

async function initDb() {
    try {
        await db`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                image_url TEXT,
                description TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                fit_mode TEXT DEFAULT 'cover',
                is_public BOOLEAN DEFAULT TRUE,
                media JSONB DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await db`ALTER TABLE products ALTER COLUMN image_url DROP NOT NULL`;
            await db`ALTER TABLE products ADD COLUMN IF NOT EXISTS fit_mode TEXT DEFAULT 'cover'`;
            await db`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE`;
            await db`ALTER TABLE products ADD COLUMN IF NOT EXISTS media JSONB DEFAULT '[]'`;

            await db`
                UPDATE products 
                SET media = jsonb_build_array(jsonb_build_object('url', image_url, 'type', 'image'))
                WHERE (media IS NULL OR jsonb_array_length(media) = 0) AND image_url IS NOT NULL;
            `;
        } catch (e) {
        }
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
}

export async function login(formData) {
    const password = formData.get("password");

    if (password === ADMIN_PWD) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/",
        });
        return { success: true };
    }

    return { error: "Invalid password" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

export async function uploadProduct(formData) {
    try {
        await checkAuth();

        const photos = formData.getAll("photo");
        const description = formData.get("description")?.toString().trim();
        const price = parseFloat(formData.get("price"));
        const fitMode = formData.get("fit_mode") || "cover";
        const isPublic = formData.get("is_public") === "false" ? false : true;
        const youtubeUrlsRaw = formData.get("youtube_urls")?.toString() || "";

        if ((!photos.length && !youtubeUrlsRaw) || !description || isNaN(price) || price < 0) {
            return { error: "Invalid input fields. Please check description and price." };
        }

        await initDb();
        const media = [];

        if (youtubeUrlsRaw) {
            const urls = youtubeUrlsRaw.split(",").map(u => u.trim()).filter(Boolean);
            for (const url of urls) {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
                const match = url.match(regExp);
                const id = (match && match[2].length === 11) ? match[2] : null;

                if (id) {
                    media.push({ type: "youtube", url, id });
                }
            }
        }

        const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm", "video/quicktime"];
        const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

        for (const file of photos) {
            if (!(file instanceof File) || file.size === 0) continue;

            if (!ALLOWED_TYPES.includes(file.type)) {
                return { error: `File type ${file.type} is not supported.` };
            }

            if (file.size > MAX_FILE_SIZE) {
                return { error: `File ${file.name} exceeds the 500MB limit.` };
            }

            const timestamp = Date.now();
            const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
            const fileName = `products/${timestamp}-${safeName}`;

            const blob = await put(fileName, file, {
                access: "public",
                addRandomSuffix: true,
            });

            const type = file.type.startsWith('video/') ? 'video' : 'image';
            media.push({ url: blob.url, type });
        }

        if (media.length === 0) {
            return { error: "At least one valid image or video is required." };
        }

        const firstImage = media.find(m => m.type === 'image') || media[0];
        const imageUrl = firstImage.url;

        await db`
            INSERT INTO products (image_url, description, price, fit_mode, is_public, media)
            VALUES (${imageUrl}, ${description}, ${price}, ${fitMode}, ${isPublic}, ${JSON.stringify(media)});
        `;

        return { success: true };
    } catch (error) {
        if (error.message === "Unauthorized") return { error: "Authentication required" };
        console.error("Upload error details:", error);
        return { error: "An internal server error occurred during upload." };
    }
}

export async function getProducts() {
    try {
        await checkAuth();
        await initDb();
        const { rows } = await db`SELECT * FROM products ORDER BY created_at DESC`;
        return rows;
    } catch (error) {
        if (error.message === "Unauthorized") return [];
        console.error("Fetch error:", error);
        return [];
    }
}

export async function getPublicProducts() {
    try {
        await initDb();
        const { rows } = await db`SELECT * FROM products WHERE is_public = TRUE ORDER BY created_at DESC`;
        return rows;
    } catch (error) {
        console.error("Public fetch error:", error);
        return [];
    }
}

export async function toggleVisibility(id, currentStatus) {
    try {
        await checkAuth();
        await initDb();
        const newStatus = !currentStatus;
        await db`UPDATE products SET is_public = ${newStatus} WHERE id = ${id}`;
        return { success: true, is_public: newStatus };
    } catch (error) {
        if (error.message === "Unauthorized") return { error: "Authentication required" };
        console.error("Toggle error:", error);
        return { error: "Failed to update product visibility." };
    }
}

export async function deleteProduct(id) {
    try {
        await checkAuth();
        await initDb();
        await db`DELETE FROM products WHERE id = ${id}`;
        return { success: true };
    } catch (error) {
        if (error.message === "Unauthorized") return { error: "Authentication required" };
        console.error("Delete error:", error);
        return { error: "Failed to delete product." };
    }
}
