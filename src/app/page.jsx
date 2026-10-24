import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import LandingLinks from "@/components/LandingLinks/LandingLinks";
import { Container } from "@mui/material";
import styles from "./styles";

export default function Home() {
  return (
    <Container component="main" sx={styles.mainContainer}>
      <Header showTitle={false} />
      <LandingLinks />
      <Footer />
    </Container>
  );
}
