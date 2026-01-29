import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LinkButton from "@/components/LinkButton/LinkButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import { Container, Stack } from "@mui/material";
import styles from "./styles";

export default function Home() {
  return (
    <Container component="main" sx={styles.mainContainer}>
      <Header />

      <Stack spacing={0} sx={styles.linksStack}>
        <LinkButton
          label="View Catalog"
          href="/catalog"
          icon={GridViewIcon}
          delay={50}
          sx={{ mb: 2 }}
        />
        <LinkButton
          label="Instagram"
          href="https://www.instagram.com/gglabs.3dmakers"
          target="_blank"
          icon={PhotoCameraIcon}
          delay={100}
        />
        <LinkButton
          label="TikTok"
          href="https://www.tiktok.com/@gglabs.3dmakers"
          target="_blank"
          icon={MusicNoteIcon}
          delay={200}
        />
        <LinkButton
          label="WhatsApp"
          href="https://wa.me/523313267354"
          target="_blank"
          icon={ChatIcon}
          delay={300}
        />
      </Stack>

      <Footer />
    </Container>
  );
}
