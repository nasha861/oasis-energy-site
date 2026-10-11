import bgImage from "../../assets/residentailSolar1.png";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="about-page">

      {/* ================= INTRO ================= */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay">
          <h1>About Oasis Energy</h1>
          <p>
            Oasis Energy is committed to delivering clean, reliable, and
            affordable solar solutions for homes and businesses across Nigeria.
          </p>
        </div>
      </section>

      {/* ================= OUR MISSION ================= */}
      <section id="mission" className="about-section">
        <div className="about-content">

          <div className="about-text">
            <h2>Our Mission</h2>

            <p>
              To provide sustainable and cost-effective solar energy solutions
              that empower individuals and businesses to reduce energy costs
              and environmental impact.
            </p>

            <p>
              At Oasis Energy, our mission is to democratize access to
              renewable energy. We believe every household and business
              deserves affordable, reliable, and sustainable power solutions.
            </p>

            <p>
              We are committed to reducing dependence on fossil fuels and
              lowering carbon footprints through innovative solar technologies.
            </p>

            <p>
              Our mission extends beyond installation — we educate communities,
              empower individuals, and foster resilience in the face of energy
              challenges.
            </p>

            <p>
              We design systems tailored to unique needs, ensuring maximum
              efficiency and long-term savings.
            </p>

            <p>
              Ultimately, our mission is to accelerate the transition to a
              cleaner, brighter future powered by the sun.
            </p>
          </div>

          <div className="about-image">
            <img
              src="/images/mission1.jpg"
              alt="Solar mission illustration"
            />
          </div>

        </div>
      </section>

      {/* ================= OUR VISION ================= */}
      <section
        id="vision"
        className="about-section about-section-alt"
      >
        <div className="about-content">

          <div className="about-text">
            <h2>Our Vision</h2>

            <p>
              To become a leading renewable energy provider in Africa, driving
              innovation and making solar energy accessible to all.
            </p>

            <p>
              We envision a world where renewable energy is the foundation of
              modern living. Our vision is to see communities thrive on solar
              power, reducing emissions and protecting the planet.
            </p>

            <p>
              We aim to lead innovation in solar technology, setting new
              standards for efficiency and durability.
            </p>

            <p>
              Our vision includes empowering individuals to become energy
              producers, reshaping the way society interacts with power.
            </p>

            <p>
              We aspire to inspire a global movement toward clean energy
              adoption through advocacy and education.
            </p>

            <p>
              Through partnerships and innovation, we see a future where solar
              energy drives sustainable growth and prosperity.
            </p>
          </div>

          <div className="about-image about-image-multiple">
            <img
              src="/images/vision1.jpg"
              alt="Solar vision illustration"
            />

            <img
              src="/images/vission2.jpg"
              alt="Solar vision illustration"
            />
          </div>

        </div>
      </section>

      {/* ================= MEET THE VISIONARY ================= */}
      <section id="visionary" className="about-section">
        <div className="about-content">

          <div className="about-text">
            <h2>Meet the Visionary</h2>

            <p>
              Oasis Energy was founded by a visionary leader who saw the urgent
              need to shift from fossil fuels to renewable energy. Her journey
              began with a passion for sustainability and a determination to
              make solar accessible to all.
            </p>

            <p>
              She envisioned a company that would not only install panels but
              also educate communities, empower individuals, and inspire
              change. Her vision was rooted in the belief that energy
              independence is a right, not a privilege.
            </p>

            <p>
              Driven by personal experiences of unreliable power and rising
              costs, she committed to building solutions that are affordable,
              durable, and scalable.
            </p>

            <p>
              Her leadership has shaped Oasis Energy into a trusted partner
              for thousands of households and businesses, delivering clean
              energy with integrity and innovation.
            </p>

            <p>
              Today, her vision continues to guide our mission, inspiring us
              to push boundaries and redefine what’s possible in renewable
              energy.
            </p>

            <p>
              Through her foresight, Oasis Energy stands as a beacon of hope,
              proving that one person’s vision can ignite a movement toward a
              sustainable future.
            </p>
          </div>

          <div className="about-image visionary-image">
            <img
              src="/images/AISHAT PASSPORT.jpg"
              alt="Portrait of the visionary founder"
            />

            <h2>Engr. Aishat Raji</h2>
          </div>

        </div>
      </section>

      {/* ================= OUR TEAM ================= */}
      <section
        id="team"
        className="about-section about-section-alt"
      >
        <div className="about-content">

          <div className="about-text">
            <h2>Our Team</h2>

            <p>
              Behind Oasis Energy is a diverse team of engineers, designers,
              and advocates united by a passion for sustainability. Each member
              brings expertise and dedication to delivering world-class solar
              solutions.
            </p>

            <p>
              Our installation crews are certified professionals who ensure
              every system is built to the highest standards of safety and
              performance.
            </p>

            <p>
              Our customer support team is available around the clock, guiding
              clients through every step of their solar journey.
            </p>

            <p>
              We foster a culture of innovation, collaboration, and continuous
              learning, ensuring we stay ahead in a rapidly evolving industry.
            </p>

            <p>
              Most importantly, our team shares a common purpose: to make clean
              energy simple, accessible, and impactful for everyone.
            </p>
          </div>

          <div className="about-image about-image-multiple">
            <img
              src="/images/team1.png"
              alt="Oasis Energy team working together"
            />

            <img
              src="/images/team3.png"
              alt="Oasis Energy team working together"
            />
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="why-container">

          <div className="why-card">
            <h3>⚡ Reliable Energy</h3>
            <p>
              We provide consistent and uninterrupted solar power solutions.
            </p>
          </div>

          <div className="why-card">
            <h3>💰 Cost Savings</h3>
            <p>
              Reduce electricity bills and enjoy long-term savings.
            </p>
          </div>

          <div className="why-card">
            <h3>🌍 Eco-Friendly</h3>
            <p>
              Clean energy that protects the environment.
            </p>
          </div>

          <div className="why-card">
            <h3>🔧 Expert Installation</h3>
            <p>
              Professional and efficient solar system installation.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}