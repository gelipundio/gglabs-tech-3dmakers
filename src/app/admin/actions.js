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

async function initDb() {
    try {
        await db`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                image_url TEXT NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                fit_mode TEXT DEFAULT 'cover',
                is_public BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await db`ALTER TABLE products ADD COLUMN IF NOT EXISTS fit_mode TEXT DEFAULT 'cover'`;
            await db`ALTER TABLE products ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT TRUE`;
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
    const photo = formData.get("photo");
    const description = formData.get("description");
    const price = formData.get("price");
    const fitMode = formData.get("fit_mode") || "cover";
    const isPublic = formData.get("is_public") === "false" ? false : true;

    if (!photo || !description || !price) {
        return { error: "Missing required fields" };
    }

    try {
        await initDb();

        const timestamp = Date.now();
        const fileName = `${timestamp}-${photo.name}`;

        const blob = await put(fileName, photo, {
            access: "public",
            addRandomSuffix: true,
        });

        await db`
            INSERT INTO products (image_url, description, price, fit_mode, is_public)
            VALUES (${blob.url}, ${description}, ${price}, ${fitMode}, ${isPublic});
        `;

        return { success: true, url: blob.url };
    } catch (error) {
        console.error("Upload error details:", error);
        return { error: "Failed to upload product. Check logs for details." };
    }
}

export async function getProducts() {
    try {
        await initDb();
        const { rows } = await db`SELECT * FROM products ORDER BY created_at DESC`;
        return rows;
    } catch (error) {
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
        await initDb();
        const newStatus = !currentStatus;
        await db`UPDATE products SET is_public = ${newStatus} WHERE id = ${id}`;
        return { success: true, is_public: newStatus };
    } catch (error) {
        console.error("Toggle error:", error);
        return { error: "Failed to toggle visibility" };
    }
}

export async function deleteProduct(id) {
    try {
        await initDb();
        await db`DELETE FROM products WHERE id = ${id}`;
        return { success: true };
    } catch (error) {
        console.error("Delete error:", error);
        return { error: "Failed to delete product" };
    }
}
