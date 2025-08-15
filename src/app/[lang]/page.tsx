"use client"
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Guide from "./components/home/Guide";
import Footer from "./components/home/Footer";
import Contact from "./components/home/Contact";
import Leaderboard from "./components/home/Leaderboard";
import QuizGallery from "./components/home/QuizGallery";
import QuizMasterCTA from "./components/home/QuizMaster";
import Achievements from "./components/home/Achievements";
import QuizOfTheDay from "./components/home/QuizOfTheDay";
import QuizCategories from "./components/home/QuizCategories";
import TestimonialSlider from "./components/home/Testimonials";
import ScrollProgressIndicator from "./components/home/ScrollProgressIndicator";

export default function HomePage() {
    return (
        <>
            <Hero />
            <QuizCategories />
            <Leaderboard />
            <QuizOfTheDay />
            <TestimonialSlider />
            <Achievements />
            <Guide />
            <QuizMasterCTA />
            <ScrollProgressIndicator />
            <QuizGallery />
            <About />
            <Contact />
            <Footer />
        </>
    );
}
