
import ThemeRegistry from "@/components/ThemeRegistry";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

export const metadata = {
    title: "3D Makers by GG Labs",
    description: "Custom 3D printing, prototyping, and design services.",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" suppressHydrationWarning className={ubuntu.className}>
            <body suppressHydrationWarning>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}
