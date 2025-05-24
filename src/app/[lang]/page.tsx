'use client';
import Hero from "./components/cabinet/home/Hero";
import About from "./components/cabinet/home/About";
import Guide from "./components/cabinet/home/Guide";
import Footer from "./components/cabinet/home/Footer";
import Contact from "./components/cabinet/home/Contact";
import Leaderboard from "./components/cabinet/home/Leaderboard";
import QuizGallery from "./components/cabinet/home/QuizGallery";
import QuizMasterCTA from "./components/cabinet/home/QuizMaster";
import Achievements from "./components/cabinet/home/Achievements";
import QuizOfTheDay from "./components/cabinet/home/QuizOfTheDay";
import QuizCategories from "./components/cabinet/home/QuizCategories";
import TestimonialSlider from "./components/cabinet/home/Testimonials";
import ScrollProgressIndicator from "./components/cabinet/home/ScrollProgressIndicator";

export default function Home() {
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
