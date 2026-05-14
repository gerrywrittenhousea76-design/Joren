import Navbar from "@/components/Navbar";
import Cover from "@/components/Cover";
import Profile from "@/components/Profile";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import WhyMe from "@/components/WhyMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Cover />
        <Profile />
        <Hero />
        <Works />
        <About />
        <Process />
        <Skills />
        <WhyMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
