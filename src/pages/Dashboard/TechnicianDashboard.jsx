
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function TechnicianDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Installations",
      description: "View assigned solar installation jobs and update progress.",
      button: "Manage Installations",
      path: "/technician/installations",
    },
    {
      title: "My Maintenance Jobs",
      description: "View assigned maintenance jobs and manage their status.",
      button: "Manage Maintenance",
      path: "/technician/maintenance",
    },
  ];

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>Technician Dashboard</h1>
        <p>Welcome. Manage your assigned jobs from here.</p>
      </div>

      <div className="dashboard-cards">
        {cards.map((card) => (
          <article className="dashboard-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>

            <button
              type="button"
              onClick={() => navigate(card.path)}
            >
              {card.button}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TechnicianDashboard;
