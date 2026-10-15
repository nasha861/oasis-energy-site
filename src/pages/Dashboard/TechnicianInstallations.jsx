import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Dashboard.css";

function TechnicianInstallations() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/installations");
      const data = response.data?.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load your assigned installations."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const updateStatus = async (job, status) => {
    setUpdatingId(job._id);
    setError("");
    setMessage("");

    try {
      await api.put(`/installations/${job._id}`, { status });
      setMessage("Installation status updated.");
      await loadJobs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update this installation."
      );
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <main className="dashboard">
      <button type="button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="dashboard-header">
        <h1>Manage Installations</h1>
        <p>View your assigned installation jobs and update their progress.</p>
      </div>

      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      {loading ? (
        <p>Loading installations...</p>
      ) : jobs.length === 0 ? (
        <p>No installations are currently assigned to you.</p>
      ) : (
        <div className="dashboard-cards">
          {jobs.map((job) => (
            <article className="dashboard-card" key={job._id}>
              <h2>
                {job.systemPackage?.name ||
                  job.packageName ||
                  job.title ||
                  `Installation ${String(job._id).slice(-6)}`}
              </h2>

              <p>
                <strong>Current status:</strong> {job.status || "Pending"}
              </p>

              {job.address && (
                <p>
                  <strong>Address:</strong> {job.address}
                </p>
              )}

              {job.status === "in-progress" ? (
                <button
                  type="button"
                  disabled={updatingId === job._id}
                  onClick={() => updateStatus(job, "completed")}
                >
                  {updatingId === job._id
                    ? "Updating..."
                    : "Mark Completed"}
                </button>
              ) : ["pending", "survey"].includes(job.status) ? (
                <button
                  type="button"
                  disabled={updatingId === job._id}
                  onClick={() => updateStatus(job, "in-progress")}
                >
                  {updatingId === job._id
                    ? "Updating..."
                    : "Start Installation"}
                </button>
              ) : (
                <p>No further status actions available.</p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default TechnicianInstallations;