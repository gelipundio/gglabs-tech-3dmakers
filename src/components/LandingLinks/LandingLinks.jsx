"use client";
import { useSyncExternalStore } from "react";
import { Stack } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CasinoIcon from "@mui/icons-material/Casino";
import LinkButton from "@/components/LinkButton/LinkButton";
import styles from "./styles";

const BAZAR_URL = "https://calculator.gg-labs.tech/catalog/bazar-sur";
const RULETA_URL = "https://calculator.gg-labs.tech/ruleta/fiesta-bazar";

// Catalog is empty for now; set to true to show the button again.
const SHOW_CATALOG = false;

// Seasonal button shows through the end of Nov 5 (Guadalajara time, UTC-6).
const BAZAR_ENDS_AT = new Date("2026-11-06T00:00:00-06:00").getTime();

// Remembers whether the visitor clicked Instagram or TikTok, across reloads.
const SOCIAL_KEY = "gglabs:social-clicked";
const SOCIAL_EVENT = "gglabs:social-clicked";
let socialClickedFallback = false;

function subscribeSocial(callback) {
    window.addEventListener("storage", callback);
    window.addEventListener(SOCIAL_EVENT, callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(SOCIAL_EVENT, callback);
    };
}

function getSocialClicked() {
    try {
        return localStorage.getItem(SOCIAL_KEY) === "1" || socialClickedFallback;
    } catch {
        return socialClickedFallback;
    }
}

function markSocialClicked() {
    socialClickedFallback = true;
    try {
        localStorage.setItem(SOCIAL_KEY, "1");
    } catch {
        // Storage blocked (private mode): the in-memory flag still works for this visit.
    }
    window.dispatchEvent(new Event(SOCIAL_EVENT));
}

const noopSubscribe = () => () => {};
const isBazarActive = () => Date.now() < BAZAR_ENDS_AT;
const serverFalse = () => false;

export default function LandingLinks() {
    // Both are false during server render, then resolve in the browser.
    const showBazar = useSyncExternalStore(noopSubscribe, isBazarActive, serverFalse);
    const showRuleta = useSyncExternalStore(subscribeSocial, getSocialClicked, serverFalse);

    return (
        <Stack spacing={0} sx={styles.linksStack}>
            {showBazar && (
                <LinkButton
                    label="Bazar de Navidad y Halloween"
                    href={BAZAR_URL}
                    target="_blank"
                    icon={CelebrationIcon}
                    sx={styles.seasonalLink}
                />
            )}
            {showRuleta && (
                <LinkButton
                    label="Participa en la ruleta aquí"
                    href={RULETA_URL}
                    target="_blank"
                    icon={CasinoIcon}
                    sx={styles.ruletaLink}
                />
            )}
            <LinkButton
                label="Instagram"
                href="https://www.instagram.com/gglabs.3dmakers"
                target="_blank"
                icon={PhotoCameraIcon}
                delay={100}
                onClick={markSocialClicked}
            />
            <LinkButton
                label="TikTok"
                href="https://www.tiktok.com/@gglabs.3dmakers"
                target="_blank"
                icon={MusicNoteIcon}
                delay={200}
                onClick={markSocialClicked}
            />
            <LinkButton
                label="YouTube"
                href="https://www.youtube.com/@gglabs.3dmakers"
                target="_blank"
                icon={YouTubeIcon}
                delay={150}
            />
            <LinkButton
                label="WhatsApp"
                href="https://wa.me/523313267354"
                target="_blank"
                icon={ChatIcon}
                delay={300}
            />
            {SHOW_CATALOG && (
                <LinkButton
                    label="View Catalog"
                    href="/catalog"
                    icon={GridViewIcon}
                    delay={50}
                />
            )}
        </Stack>
    );
}
