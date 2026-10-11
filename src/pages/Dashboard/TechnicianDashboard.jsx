import "./Dashboard.css";

function TechnicianDashboard() {
  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h1>Technician Dashboard</h1>

        <p>
          Welcome to the Oasis Energy technician dashboard.
        </p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>My Installations</h3>
          <p>
            View installation jobs assigned to you.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>My Maintenance Jobs</h3>
          <p>
            View maintenance jobs assigned to you.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Customers</h3>
          <p>
            View customer information related to your assigned jobs.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Job Status</h3>
          <p>
            Update the progress of your assigned jobs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TechnicianDashboard;
