
import "./project.css";

export default function MoreProject() {
  return (
    <main className="project-page">

      {/* COMMERCIAL PROJECTS */}
      <section className="project-section project-section-alt" id="commercial">
        <div className="project-content">

          <div className="project-text">
            <h2>Commercial Projects</h2>

            <p>
              Our commercial solar projects deliver large-scale solutions for
              businesses, schools, and institutions. We design systems that
              reduce operational costs and enhance sustainability credentials.
            </p>

            <p>
              These projects demonstrate how solar energy can power entire
              facilities, from offices to factories, with reliability and
              efficiency.
            </p>

            <p>
              We work closely with stakeholders to ensure systems meet energy
              demands while aligning with corporate sustainability goals.
            </p>

            <p>
              Our commercial installations showcase innovation, scalability,
              and long-term value for organizations.
            </p>

            <p>
              By adopting solar, businesses not only save money but also
              strengthen their reputation as leaders in sustainability.
            </p>
          </div>

          <div className="project-image">
            <img
              src="/images/commercialSolar1.jpg"
              alt="Commercial solar project"
            />
          </div>

        </div>
      </section>


      {/* COMMUNITY PROJECTS */}
      <section className="project-section" id="community">
        <div className="project-content">

          <div className="project-text">
            <h2>Community Projects</h2>

            <p>
              Our community projects bring solar energy to shared spaces,
              empowering neighborhoods and rural areas. These initiatives
              provide reliable power where it’s needed most.
            </p>

            <p>
              We collaborate with local leaders to design systems that benefit
              schools, clinics, and community centers.
            </p>

            <p>
              Community projects highlight our commitment to social impact,
              ensuring clean energy reaches underserved populations.
            </p>

            <p>
              By fostering energy independence, these projects strengthen
              resilience and improve quality of life.
            </p>

            <p>
              Our community work demonstrates that solar energy is not just a
              technology, but a tool for empowerment and equity.
            </p>
          </div>

          <div className="project-image">
            <img
              src="/images/communitySolar.png"
              alt="Community solar project"
            />
          </div>

        </div>
      </section>


      {/* FUTURE PROJECTS */}
      <section
        className="project-section project-section-alt"
        id="innovation"
      >
        <div className="project-content">

          <div className="project-text">
            <h2>Future Projects</h2>

            <h3>URBAN ELECTRIFICATION</h3>

            <p>
              We are constantly innovating, exploring new technologies and
              approaches to solar energy. Our future projects aim to push
              boundaries and redefine what’s possible in URBAN ELECTRIFICATION.
            </p>

            <p>
              We invest in research and development to enhance efficiency,
              durability, and affordability of solar systems.
            </p>

            <p>
              Our upcoming projects include smart grids, advanced battery
              storage, and integrated renewable solutions.
            </p>

            <p>
              We envision a future where solar energy powers entire cities,
              driving sustainable growth and prosperity.
            </p>

            <p>
              Through innovation, we aim to inspire a global movement toward
              clean energy adoption and resilience.
            </p>
          </div>

          <div className="project-image">
            <img
              src="/images/UrbanElectrification.jpg"
              alt="Urban electrification project"
            />
          </div>

        </div>
      </section>

    </main>
  );
}

