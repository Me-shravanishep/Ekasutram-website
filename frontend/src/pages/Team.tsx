import "./Team.css";
import { useState, useEffect, useRef } from "react";

type Member = {
  name: string;
  role: string;
  bio: string;
};

const teamMembers: Member[] = [
  { name: "Ravi Kumar", role: "Tech Lead", bio: "Backend systems, cloud architecture, mentoring." },
  { name: "Sneha Patel", role: "Design Head", bio: "UI/UX vision, aesthetics, and product design." },
  { name: "Aditya Rao", role: "Developer", bio: "Frontend development and interactive UI." },
  { name: "Neha Sharma", role: "Content Lead", bio: "Outreach, content strategy, and storytelling." },
  { name: "Priya Kapoor", role: "Project Manager", bio: "Planning, coordination, delivery." },
  { name: "Rahul Mehta", role: "AI Specialist", bio: "ML systems and intelligent solutions." }
];

const symbols = ["∑","π","∞","√","∫","Δ","θ","λ","Ω","≠","≈","∂","∇"];

export default function Team() {
  const [active, setActive] = useState<Member | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const symbolRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getSymbolTransform = (index: number) => {
    const symbolEl = symbolRefs.current[index];
    if (!symbolEl) return '';
    
    const rect = symbolEl.getBoundingClientRect();
    const symbolX = rect.left + rect.width / 2;
    const symbolY = rect.top + rect.height / 2;
    
    const distX = symbolX - mousePos.x;
    const distY = symbolY - mousePos.y;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    const repelRadius = 150;
    if (distance < repelRadius && distance > 0) {
      const force = (repelRadius - distance) / repelRadius;
      const moveX = (distX / distance) * force * 60;
      const moveY = (distY / distance) * force * 60;
      return `translate(${moveX}px, ${moveY}px)`;
    }
    return '';
  };

  return (
    <section className="team-page">
      <div className="floating-math">
        {symbols.map((s, i) => (
          <span
            key={i}
            ref={el => { symbolRefs.current[i] = el; }}
            className="float-symbol"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: getSymbolTransform(i),
              transition: 'transform 0.3s ease-out'
            }}
          >
            {s}
          </span>
        ))}
      </div>

      <div className="team-container">
        <h1 className="team-heading">Our Team</h1>
        <p className="team-subheading">
          Meet the people driving Ekasutram — creativity, logic, leadership.
        </p>

        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div key={i} className="team-card" onClick={() => setActive(m)}>
              <div className="avatar" />
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="team-info-section">
        <div className="info-content">
          <h2>Why Ekasutram?</h2>
          <p>
            At Ekasutram, we believe in the power of collaboration and innovation. 
            Our diverse team brings together expertise from various domains—technology, 
            design, content, and strategy—to create meaningful solutions that make a difference.
          </p>
          <p>
            We're not just building products; we're building a community of learners, 
            creators, and innovators who are passionate about pushing boundaries and 
            exploring new possibilities.
          </p>
        </div>
      </div>

      <footer className="team-footer">
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
            <a href="/about">About</a>
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

      {active && (
        <div className="popup-overlay" onClick={() => setActive(null)}>
          <div className="popup-card" onClick={e => e.stopPropagation()}>
            <div className="popup-avatar" />
            <div>
              <h2>{active.name}</h2>
              <h4>{active.role}</h4>
              <p>{active.bio}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
