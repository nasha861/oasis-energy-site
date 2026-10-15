import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

import "./MyMaintenance.css";

function MyMaintenance() {
  const navigate = useNavigate();
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
        const statusOrder = [
            "pending",
            "assigned",
            "scheduled",
            "in-progress",
            "completed"
        ];



  useEffect(() => {
  const fetchMaintenanceRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/maintenance/my-requests");

      setMaintenanceRequests(response.data.data);

    } catch (error) {
      console.error("Failed to fetch maintenance requests:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load maintenance requests."
      );

    } finally {
      setLoading(false);
    }
  };

  fetchMaintenanceRequests();
}, []);

if (loading) {
  return <h1>Loading maintenance requests...</h1>;
}

if (error) {
  return <h1>{error}</h1>;
}
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
    >
      ← Back to Dashboard
    </button>
return (
  <div className="my-maintenance-page">
    <h1>My Maintenance Requests</h1>

    {maintenanceRequests.length === 0 ? (
      <p>No maintenance requests found.</p>
    ) : (
      maintenanceRequests.map((request) => (
        
       <div key={request._id} className="maintenance-card">
{console.log("Maintenance status:", request.status)}
       <h2>
        {request.package === "basic"
            ? "Basic Care"
            : request.package === "advanced"
            ? "Advanced Maintenance"
            : "Premium Protection"}
        </h2>

            <p>
            <strong>Type:</strong>{" "}
                {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
            </p>

            <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge status-${request.status}`}>
                {request.status.replace("-", " ")}
            </span>
            </p>

            {request.status === "cancelled" ? (
              <div className="maintenance-cancelled">
                <strong>Request Cancelled</strong>
                <p>This maintenance request has been cancelled.</p>
              </div>
            ) : (
              <div className="status-tracker">
                {statusOrder.map((status, index) => {
                  const labels = {
                    pending: "Pending",
                    assigned: "Assigned",
                    scheduled: "Scheduled",
                    "in-progress": "In Progress",
                    completed: "Completed",
                  };

                  const currentStep = statusOrder.indexOf(request.status);
                  const isKnownStatus = currentStep !== -1;

                  return (
                    <div
                      key={status}
                      className={
                        isKnownStatus && index <= currentStep
                          ? "step active"
                          : "step"
                      }
                    >
                      <span>{index + 1}</span>
                      <p>{labels[status]}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <p>
            <strong>Description:</strong> {request.description}
            </p>
        {request.technician && (
      <div className="technician-info">
        <h3>Assigned Technician</h3>

        <p>
          <strong>Name:</strong>{" "}
          {request.technician.user?.name || request.technician.name || "Assigned technician"}
        </p>

        {request.scheduledDate && (
          <p>
            <strong>Scheduled Date:</strong>{" "}
            {new Date(request.scheduledDate).toLocaleDateString()}
          </p>
        )}
      </div>
    )}

        
        {request.completionNotes && (
        <div className="completion-notes">
            <h3>Completion Notes</h3>

            <p>
            {request.completionNotes}
            </p>
        </div>
        )}
    


        </div>
      ))
    )}
  </div>
);
}
export default MyMaintenance;