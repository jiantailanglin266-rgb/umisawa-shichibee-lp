import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Sanctuary } from "@/components/Sanctuary";
import { Experience } from "@/components/Experience";
import { Project } from "@/components/Project";
import { Rewards } from "@/components/Rewards";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Sanctuary />
        <Experience />
        <Project />
        <Rewards />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
