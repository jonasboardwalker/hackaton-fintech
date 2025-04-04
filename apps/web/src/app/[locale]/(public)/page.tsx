import React from "react";
import FAQ from "~/app/[locale]/(public)/_components/faq";
import Features from "~/app/[locale]/(public)/_components/features";
import Footer from "~/app/[locale]/(public)/_components/footer";
import Hero from "~/app/[locale]/(public)/_components/hero";
import Navbar from "~/app/[locale]/(public)/_components/navbar/navbar";
import Pricing from "~/app/[locale]/(public)/_components/pricing";
import Testimonial from "~/app/[locale]/(public)/_components/testimonial";

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
