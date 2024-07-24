"use client";

import { useRef } from "react";
import Header from "./modules/header";
import Appointments from "./modules/appointments";
import useStore from "@/stores/useStore";
import { SessionProvider } from "./contexts/session-context";
import TestimonialsSection from "./modules/testimonials-section";
import ImageGallery from "./modules/image-gallery";
import Socials from "./modules/socials";
import Footer from "./modules/footer";
import Booking from "./modules/booking";
import HeroBanner from "./modules/hero-banner";
import ServicesSection from "./modules/services-section";
import WhatsIncluded from "./modules/whats-included";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useStore((state) => state.session);
  const user = useStore((state) => state.user);
  const clientId = useStore((state) => state.clientId);
  const bookSectionRef = useRef(null);

  const handleScrollToBookSection = () => {
    // @ts-ignore
    bookSectionRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SessionProvider>
      <main
        className="flex min-h-screen flex-col items-center justify-between pb-8 bg-dark"
        dir="rtl"
      >
        <Header />
        <HeroBanner handleScrollToBookSection={handleScrollToBookSection} />

        <ServicesSection />

        <WhatsIncluded />

        <Booking
          clientId={clientId}
          session={session}
          bookSectionRef={bookSectionRef}
        />

        {session && user && <Appointments clientId={clientId} />}

        <TestimonialsSection />

        <ImageGallery />

        <Socials />

        <Footer />

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
          crossOrigin="anonymous"
        ></script>
      </main>
    </SessionProvider>
  );
}
