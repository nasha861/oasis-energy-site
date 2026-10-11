import { Link } from "react-router-dom";

import solarInstallation from "../../../images/solar-panels-and-installers-on-roof new homes1.jpg";
import rooftopPanels from "../../../images/solar-panels-and-installers-on-roof new homes.jpg";
import batteryStorage from "../../../images/solar-battery-storage.jpg";

export default function CleanEnergy() {
  return (
    <section className="clean-energy">

      <div className="clean-left">
        <h2>
          Experience Oasis’s commitment to a brighter, cleaner energy future.
        </h2>

        <div className="energy-circle"></div>
      </div>


      <div className="clean-right">

        <div className="info-card">
          <img
            src={solarInstallation}
            alt="Solar Panel Installation"
          />

          <div className="info-text">
            <h3>How do Solar Panels Actually Work</h3>

            <Link to="/energy-solutions" >
              Learn more
            </Link>
          </div>
        </div>


        <div className="info-card">
          <img
            src={rooftopPanels}
            alt="Solar Panels for Roofs"
          />

          <div className="info-text">
            <h3>Solar Panels for Roofs</h3>

            <Link to="/energy-solutions/better-solar-panel">
              Learn more
            </Link>
          </div>
        </div>


        <div className="info-card">
          <img
            src={batteryStorage}
            alt="Battery Storage"
          />

          <div className="info-text">
            <h3>6 Reasons to Add Battery Storage</h3>

            <Link to="/energy-solutions/solar-battery-storage">
              Learn more
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}

