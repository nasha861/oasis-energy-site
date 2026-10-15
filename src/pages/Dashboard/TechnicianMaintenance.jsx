import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Dashboard.css";
function TechnicianMaintenance() {
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
      const response = await api.get("/maintenance/my-assigned");
      const data = response.data?.data;
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not load your assigned maintenance jobs."
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
      await api.put(`/maintenance/${job._id}/technician-status`, {
        status,
      });
      setMessage("Maintenance job status updated successfully.");
      await loadJobs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not update this maintenance job."
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
        <h1>Manage Maintenance</h1>
        <p>View assigned maintenance jobs and update their progress.</p>
      </div>
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}
      {loading ? (
        <p>Loading maintenance jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No maintenance jobs are currently assigned to you.</p>
      ) : (
        <div className="dashboard-cards">
          {jobs.map((job) => (
            <article className="dashboard-card" key={job._id}>
              <h2>
                {job.installation?.systemPackage?.name ||
                  job.installation?.packageName ||
                  job.type ||
                  "Maintenance Job"}
              </h2>

              <p>
                <strong>Type:</strong> {job.type || "Maintenance"}
              </p>

              <p>
                <strong>Status:</strong> {job.status || "Scheduled"}
              </p>

              {job.description && <p>{job.description}</p>}

              {job.status === "scheduled" && (
                <button
                  type="button"
                  disabled={updatingId === job._id}
                  onClick={() => updateStatus(job, "in-progress")}
                >
                  {updatingId === job._id
                    ? "Updating..."
                    : "Start Maintenance"}
                </button>
              )}

              {job.status === "in-progress" && (
                <button
                  type="button"
                  disabled={updatingId === job._id}
                  onClick={() => updateStatus(job, "completed")}
                >
                  {updatingId === job._id
                    ? "Updating..."
                    : "Mark Completed"}
                </button>
              )}

              {job.status === "completed" && (
                <p>Maintenance completed.</p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default TechnicianMaintenance;
