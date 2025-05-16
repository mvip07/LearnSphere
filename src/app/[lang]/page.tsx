import Hero from "../components/Hero";
import About from "../components/About";
import Guide from "../components/Guide";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Leaderboard from "../components/Leaderboard";
import QuizGallery from "../components/QuizGallery";
import QuizMasterCTA from "../components/QuizMaster";
import Achievements from "../components/Achievements";
import QuizOfTheDay from "../components/QuizOfTheDay";
import QuizCategories from "../components/QuizCategories";
import TestimonialSlider from "../components/Testimonials";
import ScrollProgressIndicator from "../components/ScrollProgressIndicator";

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
