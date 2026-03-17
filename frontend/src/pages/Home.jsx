import Hero from "../components/Hero";
import Features from "../components/Features";
import Product from "../components/Product";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <Product />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default Home;

