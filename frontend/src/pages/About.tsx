import "./About.css";
import MathBackground from "../components/MathBackground";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <section className="about-page">
      <Navbar />
      {/* Mathematical Background Pattern - Canvas */}
      <MathBackground />

      {/* Main Content */}
      <div className="about-container">
        <h1 className="about-heading">About Ekasutram</h1>
        <p className="about-subheading">
          Ekasutram is a mathematics-driven club focused on logic, reasoning,
          and analytical thinking beyond textbooks.
        </p>

        <div className="about-sections">
          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              To cultivate a strong culture of mathematical thinking and
              problem-solving, empowering students to approach challenges
              logically and creatively.
            </p>
          </div>

          <div className="about-card">
            <h2>What We Do</h2>
            <p>
              We organize math-based events, logical puzzles, technical sessions,
              quizzes, and collaborative problem-solving activities that connect
              mathematics with real-world applications and technology.
            </p>
          </div>

          <div className="about-card">
            <h2>Why Ekasutram?</h2>
            <p>
              Ekasutram treats mathematics as a way of thinking, not just
              calculation. We encourage curiosity, discussion, and innovation
              through structured learning and hands-on challenges.
            </p>
          </div>
        </div>
      </div>

      <div className="about-info-section">
        <div className="info-content">
          <h2>Our Mission & Values</h2>
          <p>
            At Ekasutram, we believe that mathematics is more than numbers and formulas—
            it's a universal language that enables us to understand patterns, solve complex problems,
            and innovate across all fields of study. Our mission is to create a vibrant community
            where students can explore mathematical concepts beyond the classroom.
          </p>
          <p>
            We foster an environment of collaborative learning, critical thinking, and creativity.
            Through workshops, competitions, and interactive sessions, we help students develop
            the analytical skills needed to excel in academics, research, and their future careers.
          </p>
        </div>
      </div>

      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Ekasutram Club</h3>
            <p>Building tomorrow's solutions today</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/resources">Resources</a>
            <a href="/events">Events</a>
            <a href="/team">Team</a>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <a href="mailto:contact@ekasutram.com">contact@ekasutram.com</a>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Ekasutram Club. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}
