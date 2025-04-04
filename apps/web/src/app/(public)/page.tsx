import React from "react";
import FAQ from "~/app/(public)/_components/faq";
import Features from "~/app/(public)/_components/features";
import Footer from "~/app/(public)/_components/footer";
import Hero from "~/app/(public)/_components/hero";
import Navbar from "~/app/(public)/_components/navbar/navbar";
import Pricing from "~/app/(public)/_components/pricing";
import Testimonial from "~/app/(public)/_components/testimonial";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Footer />
    </>
  );
};

export default HomePage;
