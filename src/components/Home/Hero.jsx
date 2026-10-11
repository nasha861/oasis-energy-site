import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(5);

  const slides = [
    {
      title: (
        <>
          OASIS ENERGY.
          <br />
          Your Source for Uninterrupted Power
        </>
      ),
      description:
        "Panels, Batteries and Installation for Home & Business.",
     buttonText: "GET A FREE QUOTE",
     buttonLink: "#quote",
      image: "/images/SolarRing.png",
      imageAlt: "Solar Ring",
    },

    {
      title: "Reliable Solar Solutions",
      description: "Clean energy for a sustainable future.",
      buttonText: "LEARN MORE",
      buttonLink: "/energy-solutions",
      image: "/images/residentialSolar3.png",
      imageAlt: "Solar Panels",
    },

    {
      title: "Power Your Business",
      description: "Smart installations tailored to your needs.",
      buttonText: "CONTACT US",
      buttonLink: "/contact",
      image: "/images/residentialSolar6.png",
      imageAlt: "Solar Battery",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        return (previousIndex + 1) % slides.length;
      });
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

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
    <section className="hero-slider">

      {slides.map((slide, index) => (
        <section
          key={index}
          className={`hero slide ${
            index === currentIndex ? "active" : ""
          }`}
        >
          <div className="hero-left">
            <div className="hero-content">

              <h1>{slide.title}</h1>

              <p>{slide.description}</p>

             {slide.buttonLink.startsWith("#") ? (
              <a href={slide.buttonLink} className="btn">
                {slide.buttonText}
              </a>
            ) : (
              <Link to={slide.buttonLink} className="btn">
                {slide.buttonText}
              </Link>
            )}

            </div>
          </div>

          <div className="hero-right">
            <img
              src={slide.image}
              alt={slide.imageAlt}
            />
          </div>
        </section>
      ))}

      <div className="pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="countdown">
        {countdown}
      </div>

    </section>
  );
}

export default Hero;