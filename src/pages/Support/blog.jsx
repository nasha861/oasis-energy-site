
import { useState } from "react";
import "./blog.css";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="blog-page">

      {/* ===== HERO ===== */}
      <section className="blog-hero">
        <h1>Oasis Energy Blog</h1>
        <p>Insights, stories, and updates on clean energy.</p>
      </section>


      {/* ===== BLOG 1 ===== */}
      <section id="blog1" className="blog-section">
        <div className="blog-content">

          <div className="blog-text">
            <h2>The Rise of Home Solar</h2>

            <p>
              Home solar systems are transforming the way families power their
              lives. By harnessing the sun’s energy, households are reducing
              bills, gaining independence, and contributing to a greener planet.
              Solar adoption has accelerated in recent years, driven by falling
              costs and rising awareness of climate change. Families are
              realizing that solar is not just an investment in technology, but
              in their future.
              <br /><br />
              Beyond savings, home solar provides resilience. With battery
              storage, families can keep the lights on during outages and ensure
              critical appliances remain powered.
              <br /><br />
              Solar panels today are sleek, efficient, and designed to integrate
              seamlessly with modern architecture. They add value to homes while
              reducing environmental impact.
              <br /><br />
              Government incentives and financing options have made solar more
              accessible, allowing more households to join the movement.
              Homeowners are discovering that solar is not just about economics,
              but about contributing to a cleaner environment.
              <br /><br />
              Solar adoption also inspires communities, creating ripple effects
              that encourage neighbors to explore renewable energy.
              <br /><br />
              With smart monitoring apps, families can track their energy usage
              and optimize savings. Solar systems are low-maintenance, with
              warranties that ensure long-term performance.
              <br /><br />
              Ultimately, the rise of home solar is about empowerment — giving
              families control over their energy and their future.
            </p>
          </div>

          <div className="blog-image">
            <img
              src="/images/blog1.jpg"
              alt="Home solar panels on a rooftop"
            />
          </div>

        </div>
      </section>


      {/* ===== BLOG 2 ===== */}
      <section id="blog2" className="blog-section blog-section-alt">
        <div className="blog-content">

          <div className="blog-text">
            <h2>Community Energy Projects</h2>

            <p>
              Community solar projects are bringing clean energy to shared
              spaces, empowering neighborhoods and rural areas. These initiatives
              provide reliable power where it’s needed most.
              <br /><br />
              By pooling resources, communities can access solar energy without
              individual households needing rooftop panels. This makes solar
              more inclusive and accessible.
              <br /><br />
              Community projects often power schools, clinics, and community
              centers, strengthening resilience and improving quality of life.
              <br /><br />
              They also foster collaboration, as neighbors work together to
              design and maintain systems that benefit everyone.
              <br /><br />
              Community energy projects demonstrate that solar is not just a
              technology, but a tool for empowerment, equity, and social impact.
              <br /><br />
              These projects reduce reliance on unreliable grids, ensuring
              communities have consistent access to power.
              <br /><br />
              They also create opportunities for education, teaching younger
              generations about sustainability.
              <br /><br />
              Community projects often attract investment, boosting local
              economies and creating jobs.
              <br /><br />
              They highlight the importance of collective action in addressing
              climate change.
              <br /><br />
              Ultimately, community solar projects show that when people come
              together, they can achieve energy independence and resilience.
            </p>
          </div>

          <div className="blog-image">
            <img
              src="/images/blog2.jpg"
              alt="Community solar project powering a school"
            />
          </div>

        </div>
      </section>


      {/* ===== BLOG 3 ===== */}
      <section id="blog3" className="blog-section">
        <div className="blog-content">

          <div className="blog-text">
            <h2>Urban Electrification</h2>

            <p>
              Urban electrification is reshaping cities, ensuring reliable
              access to power for millions of residents. As populations grow,
              the demand for sustainable energy solutions becomes more urgent.
              <br /><br />
              Solar energy plays a critical role in urban electrification,
              providing decentralized power that reduces strain on traditional
              grids.
              <br /><br />
              By integrating solar panels into rooftops, parking structures,
              and public buildings, cities can generate clean energy locally.
              <br /><br />
              Urban electrification also involves modernizing infrastructure,
              with smart grids that balance supply and demand efficiently.
              <br /><br />
              Battery storage systems ensure that energy is available during
              peak hours and outages, enhancing resilience.
              <br /><br />
              Electrification supports economic growth, powering businesses,
              industries, and services that drive urban prosperity.
              <br /><br />
              It also improves quality of life, ensuring reliable lighting,
              heating, cooling, and connectivity for residents.
              <br /><br />
              Urban electrification reduces pollution, replacing diesel
              generators and fossil fuels with clean alternatives.
              <br /><br />
              It fosters equity, ensuring underserved neighborhoods gain access
              to reliable energy.
              <br /><br />
              Governments and private companies are collaborating to accelerate
              electrification projects, recognizing their importance for
              sustainable development.
              <br /><br />
              Urban electrification is not just about technology, but about
              creating inclusive, resilient, and sustainable cities.
              <br /><br />
              By embracing renewable energy, cities can lead the way in
              combating climate change and building a cleaner future.
              <br /><br />
              Ultimately, urban electrification is a cornerstone of modern
              living, ensuring that every resident has access to reliable,
              affordable, and sustainable power.
            </p>
          </div>

          <div className="blog-image">
            <img
              src="/images/blog3.jpg"
              alt="Urban electrification with solar panels in city"
            />
          </div>

        </div>
      </section>


      {/* ===== JOIN THE CONVERSATION ===== */}
      <section id="engage" className="blog-section blog-section-alt">
        <div className="blog-content">

          <div className="blog-text">
            <h2>Join the Conversation</h2>

            <p>
              Our blog is more than articles — it’s a space for dialogue. We
              invite you to share your thoughts, experiences, and questions
              about solar energy.
              <br /><br />
              By engaging with our community, you help shape the future of
              clean energy adoption and awareness.
              <br /><br />
              We believe that every voice matters, and together we can inspire
              change and accelerate the transition to renewable energy.
              <br /><br />
              Follow us for updates, insights, and stories from the frontlines
              of solar innovation.
              <br /><br />
              Join the conversation today and be part of the movement toward a
              brighter, cleaner future.
              <br /><br />
              We encourage comments, discussions, and sharing of ideas to foster
              collaboration.
              <br /><br />
              Through dialogue, we can identify challenges and work together to
              find solutions.
              <br /><br />
              Our blog is a platform for learning, sharing, and growing as a
              community.
              <br /><br />
              Engagement helps us understand what matters most to our readers
              and customers.
              <br /><br />
              Ultimately, joining the conversation is about building a
              collective vision for a sustainable future.
            </p>

            {/* SUBSCRIPTION */}
            <form className="blog-subscribe" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="blog-subscribe-btn"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <p className="blog-success">
                Thank you for subscribing!
              </p>
            )}
          </div>

          <div className="blog-image">
            <img
              src="/images/joinConv.webp"
              alt="Community engaging in solar discussions"
            />
          </div>

        </div>
      </section>

    </main>
  );
}

