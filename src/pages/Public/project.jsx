import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./project.css";

export default function Project() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const slides = [
    {
      title: "Empowering Your Energy Future",
      description:
        "Discover how Oasis Energy transforms homes and businesses with innovative solar solutions.",
      buttonText: "LEARN MORE",
      buttonLink: "#residential",
      image: "/images/installation2.jpg",
      imageAlt: "Residential solar installation",
    },
    {
      title: "Reliable Solar Solutions",
      description:
        "Clean energy for a sustainable future of your company.",
      buttonText: "LEARN MORE",
      buttonLink: "#residential",
      image: "/images/project1.jpg",
      imageAlt: "Solar panels",
    },
    {
      title: "Power Your Business",
      description:
        "Smart installations tailored to your needs.",
      buttonText: "CONTACT US",
      buttonLink: "/contact",
      image: "/images/resisdentailSolar3.png",
      imageAlt: "Solar battery system",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % slides.length;
      });
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          return 5;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <main className="project-page">

      {/* ================= HERO SLIDER ================= */}
      <section className="project-hero-slider">

        {slides.map((slide, index) => (
          <section
            key={index}
            className={`project-hero-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <div className="project-hero-left">
              <div className="project-hero-content">
                <h1>{slide.title}</h1>

                <p>{slide.description}</p>

                {slide.buttonLink.startsWith("#") ? (
                  <a
                    href={slide.buttonLink}
                    className="project-btn"
                  >
                    {slide.buttonText}
                  </a>
                ) : (
                  <Link
                    to={slide.buttonLink}
                    className="project-btn"
                  >
                    {slide.buttonText}
                  </Link>
                )}
              </div>
            </div>

            <div className="project-hero-right">
              <img
                src={slide.image}
                alt={slide.imageAlt}
              />
            </div>
          </section>
        ))}

        {/* Pagination */}
        <div className="project-pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`project-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to project slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Countdown */}
        <div className="project-countdown">
          {countdown}
        </div>

      </section>


      {/* ================= RESIDENTIAL PROJECTS ================= */}
      <section
        id="residential"
        className="project-section"
      >
        <div className="project-content">

          <div className="project-text">
            <h1>Residential Projects</h1>

            <p>
              Our residential solar projects empower families with clean,
              affordable energy. Each installation is customized to meet
              household needs, ensuring maximum efficiency and long-term
              savings.
            </p>

            <p>
              We’ve transformed homes into energy-independent hubs,
              reducing reliance on the grid and providing peace of mind
              during outages.
            </p>

            <p>
              Our residential projects highlight the seamless integration
              of solar panels with modern architecture, maintaining
              aesthetics while delivering performance.
            </p>

            <p>
              We prioritize safety, durability, and customer satisfaction,
              ensuring every project exceeds expectations.
            </p>

            <p>
              Through these projects, we’ve helped thousands of families
              lower their bills and contribute to a greener planet.
            </p>
          </div>

          <div className="project-image">
            <img
              src="/images/installation2.jpg"
              alt="Residential solar project"
            />

            <Link
              to="/about/more-projects"
              className="project-cta-btn"
            >
              See More Projects
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}