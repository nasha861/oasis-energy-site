import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Admin.css";

function ServiceRequests() {
  const [activeTab, setActiveTab] =
    useState("maintenance");

  const [maintenance, setMaintenance] =
    useState([]);

  const [installations, setInstallations] =
    useState([]);

  const [technicians, setTechnicians] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [editingInstallation, setEditingInstallation] =
    useState(null);

  const [editingMaintenance, setEditingMaintenance] =
    useState(null);

  const [installationUpdates, setInstallationUpdates] =
    useState({});

  const [maintenanceUpdates, setMaintenanceUpdates] =
    useState({});


  /* ==========================================
     FETCH REQUESTS
  ========================================== */

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        maintenanceResponse,
        installationResponse
      ] = await Promise.all([
        api.get("/maintenance"),
        api.get("/installations")
      ]);

      setMaintenance(
        maintenanceResponse.data.data || []
      );

      setInstallations(
        installationResponse.data.data || []
      );

    } catch (err) {
      console.error(
        "Fetch service requests error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load service requests"
      );

    } finally {
      setLoading(false);
    }
  };


  /* ==========================================
     FETCH TECHNICIANS
  ========================================== */

  const fetchTechnicians = async () => {
    try {
      const response =
        await api.get("/technicians");

      setTechnicians(
        response.data.data || []
      );

    } catch (err) {
      console.error(
        "Fetch technicians error:",
        err
      );
    }
  };


  useEffect(() => {
    fetchRequests();
    fetchTechnicians();
  }, []);


  /* ==========================================
     DATE FORMAT
  ========================================== */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date
    ).toLocaleDateString();
  };


  const formatInputDate = (date) => {
    if (!date) return "";

    return String(date).substring(0, 10);
  };


  /* ==========================================
     CUSTOMER NAME
  ========================================== */

  const getCustomerName = (
    installation
  ) => {
    if (!installation?.customer) {
      return "Unknown Customer";
    }

    return (
      installation.customer.name ||
      installation.customer.user?.name ||
      installation.customer.email ||
      "Unknown Customer"
    );
  };


  /* ==========================================
     INSTALLATION EDIT
  ========================================== */

  const startInstallationEdit = (
    installation
  ) => {
    setEditingInstallation(
      installation._id
    );

    setInstallationUpdates(
      (prev) => ({
        ...prev,
        [installation._id]: {
          technicianId:
            installation
              .technicians?.[0]?._id || "",

          status:
            installation.status ||
            "survey",

          installationDate:
            formatInputDate(
              installation.installationDate
            ),

          note:
            installation.note || ""
        }
      })
    );
  };


  const handleInstallationChange = (
    installationId,
    field,
    value
  ) => {
    setInstallationUpdates(
      (prev) => ({
        ...prev,

        [installationId]: {
          ...prev[installationId],

          [field]: value
        }
      })
    );
  };


  const cancelInstallationEdit = (
    installationId
  ) => {
    setEditingInstallation(null);

    setInstallationUpdates(
      (prev) => {
        const updated = {
          ...prev
        };

        delete updated[
          installationId
        ];

        return updated;
      }
    );
  };


  const saveInstallation = async (
    installationId
  ) => {
    const update =
      installationUpdates[
        installationId
      ];

    if (!update) return;

    try {
      setError("");

      await api.put(
        `/installations/${installationId}/manage`,
        {
          technicianId:
            update.technicianId ||
            undefined,

          status:
            update.status,

          installationDate:
            update.installationDate ||
            null,

          note:
            update.note
        }
      );

      setEditingInstallation(null);

      await fetchRequests();

      alert(
        "Installation updated successfully."
      );

    } catch (err) {
      console.error(
        "Update installation error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update installation"
      );
    }
  };


  /* ==========================================
     MAINTENANCE EDIT
  ========================================== */

  const startMaintenanceEdit = (
    request
  ) => {
    setEditingMaintenance(
      request._id
    );

    setMaintenanceUpdates(
      (prev) => ({
        ...prev,

        [request._id]: {
          technicianId:
            request.technician?._id ||
            "",

          status:
            request.status ||
            "pending",

          scheduledDate:
            formatInputDate(
              request.scheduledDate
            ),

          note:
            request.completionNotes ||
            ""
        }
      })
    );
  };


  const handleMaintenanceChange = (
    maintenanceId,
    field,
    value
  ) => {
    setMaintenanceUpdates(
      (prev) => ({
        ...prev,

        [maintenanceId]: {
          ...prev[maintenanceId],

          [field]: value
        }
      })
    );
  };


  const cancelMaintenanceEdit = (
    maintenanceId
  ) => {
    setEditingMaintenance(null);

    setMaintenanceUpdates(
      (prev) => {
        const updated = {
          ...prev
        };

        delete updated[
          maintenanceId
        ];

        return updated;
      }
    );
  };


  const saveMaintenance = async (
    maintenanceId
  ) => {
    const update =
      maintenanceUpdates[
        maintenanceId
      ];

    if (!update) return;

    try {
      setError("");

      await api.put(
        `/maintenance/${maintenanceId}/manage`,
        {
          technicianId:
            update.technicianId ||
            "",

          status:
            update.status,

          scheduledDate:
            update.scheduledDate ||
            null,

          completionNotes:
            update.note
        }
      );

      setEditingMaintenance(null);

      await fetchRequests();

      alert(
        "Maintenance updated successfully."
      );

    } catch (err) {
      console.error(
        "Update maintenance error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update maintenance"
      );
    }
  };


  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="admin-page">

        <div className="admin-card">

          <p>
            Loading service requests...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="admin-page">

      {/* HEADER */}

      <div className="admin-header">

        <div>

          <h1>
            Service Requests
          </h1>

          <p>
            Manage installation and
            maintenance requests.
          </p>

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}


      {/* TABS */}

      <div className="service-request-tabs">

        <button
          className={
            activeTab === "maintenance"
              ? "service-tab active"
              : "service-tab"
          }
          onClick={() =>
            setActiveTab(
              "maintenance"
            )
          }
        >
          Maintenance

          <span>
            {maintenance.length}
          </span>

        </button>


        <button
          className={
            activeTab === "installation"
              ? "service-tab active"
              : "service-tab"
          }
          onClick={() =>
            setActiveTab(
              "installation"
            )
          }
        >
          Installations

          <span>
            {installations.length}
          </span>

        </button>

      </div>


      {/* ==========================================
          MAINTENANCE
      ========================================== */}

      {activeTab === "maintenance" && (

        <div className="admin-card">

          <div className="services-catalogue-header">

            <div>

              <h2>
                Maintenance Requests
              </h2>

              <p>
                Review, schedule and
                assign maintenance
                requests.
              </p>

            </div>

          </div>


          {maintenance.length === 0 ? (

            <div className="empty-services">

              <h3>
                No Maintenance Requests
              </h3>

              <p>
                There are currently no
                maintenance requests.
              </p>

            </div>

          ) : (

            <div className="service-request-list">

              {maintenance.map(
                (request) => {

                  const update =
                    maintenanceUpdates[
                      request._id
                    ] || {};

                  const isEditing =
                    editingMaintenance ===
                    request._id;

                  return (

                    <div
                      className="service-request-card"
                      key={request._id}
                    >

                      {/* MAIN */}

                      <div className="service-request-main">

                        <div>

                          <span className="service-category">
                            {request.type}
                          </span>

                          <h3>
                            {request.package
                              ? `${request.package} Maintenance`
                              : "Maintenance Request"}
                          </h3>

                          <p>
                            {request.description ||
                              "No description provided."}
                          </p>

                        </div>


                        <span
                          className={`request-status status-${request.status}`}
                        >
                          {request.status}
                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="service-request-details">

                        <div>

                          <span>
                            Created
                          </span>

                          <strong>
                            {formatDate(
                              request.createdAt
                            )}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Scheduled Date
                          </span>

                          <strong>
                            {formatDate(
                              request.scheduledDate
                            )}
                          </strong>

                        </div>


                        <div>
                        <span>
                            Technician
                        </span>

                        <strong>
                            {request.technician?.user?.name ||
                            "Not assigned"}
                        </strong>
                        </div>

                      </div>


                      {/* VIEW NOTE */}

                      {!isEditing &&
                        request.completionNotes && (

                          <div className="service-request-note">

                            <strong>
                              Note:
                            </strong>{" "}

                            {request.completionNotes}

                          </div>

                        )}


                      {/* EDIT */}

                      {isEditing && (

                        <div className="request-edit-panel">

                          <div className="installation-field">

                            <label>
                              Assign Technician
                            </label>

                            <select
                              value={
                                update.technicianId ||
                                ""
                              }
                              onChange={(e) =>
                                handleMaintenanceChange(
                                  request._id,
                                  "technicianId",
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Not Assigned
                              </option>

                              {technicians.map(
                                (technician) => (

                                  <option
                                    key={
                                      technician._id
                                    }
                                    value={
                                      technician._id
                                    }
                                  >
                                    {technician
                                      .user?.name ||
                                      "Technician"}
                                  </option>

                                )
                              )}

                            </select>

                          </div>


                          <div className="installation-field">

                            <label>
                              Status
                            </label>

                            <select
                              value={
                                update.status ||
                                "pending"
                              }
                              onChange={(e) =>
                                handleMaintenanceChange(
                                  request._id,
                                  "status",
                                  e.target.value
                                )
                              }
                            >

                              <option value="pending">
                                Pending
                              </option>

                              <option value="assigned">
                                Assigned
                              </option>

                              <option value="scheduled">
                                Scheduled
                              </option>

                              <option value="in-progress">
                                In Progress
                              </option>

                              <option value="completed">
                                Completed
                              </option>

                              <option value="cancelled">
                                Cancelled
                              </option>

                            </select>

                          </div>


                          <div className="installation-field">

                            <label>
                              Scheduled Date
                            </label>

                            <input
                              type="date"
                              value={
                                update.scheduledDate ||
                                ""
                              }
                              onChange={(e) =>
                                handleMaintenanceChange(
                                  request._id,
                                  "scheduledDate",
                                  e.target.value
                                )
                              }
                            />

                          </div>


                          <div className="installation-field">

                            <label>
                              Note
                            </label>

                            <input
                              type="text"
                              placeholder="Optional note"
                              value={
                                update.note ||
                                ""
                              }
                              onChange={(e) =>
                                handleMaintenanceChange(
                                  request._id,
                                  "note",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>

                      )}


                      {/* ACTIONS */}

                      <div className="service-request-actions">

                        {!isEditing ? (

                          <button
                            className="admin-btn"
                            onClick={() =>
                              startMaintenanceEdit(
                                request
                              )
                            }
                          >
                            Edit
                          </button>

                        ) : (

                          <>
                            <button
                              className="admin-btn"
                              onClick={() =>
                                saveMaintenance(
                                  request._id
                                )
                              }
                            >
                              Save Changes
                            </button>

                            <button
                              className="admin-btn secondary"
                              onClick={() =>
                                cancelMaintenanceEdit(
                                  request._id
                                )
                              }
                            >
                              Cancel
                            </button>
                          </>

                        )}

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>

      )}


      {/* ==========================================
          INSTALLATIONS
      ========================================== */}

      {activeTab === "installation" && (

        <div className="admin-card">

          <div className="services-catalogue-header">

            <div>

              <h2>
                Installation Requests
              </h2>

              <p>
                Review, schedule and
                assign installation
                requests.
              </p>

            </div>

          </div>


          {installations.length === 0 ? (

            <div className="empty-services">

              <h3>
                No Installation Requests
              </h3>

              <p>
                There are currently no
                installation requests.
              </p>

            </div>

          ) : (

            <div className="service-request-list">

              {installations.map(
                (installation) => {

                  const update =
                    installationUpdates[
                      installation._id
                    ] || {};

                  const isEditing =
                    editingInstallation ===
                    installation._id;

                  return (

                    <div
                      className="service-request-card"
                      key={installation._id}
                    >

                      {/* MAIN */}

                      <div className="service-request-main">

                        <div>

                          <span className="service-category">
                            Installation
                          </span>

                          <h3>
                            {installation
                              .systemPackage?.name ||
                              "Solar System Installation"}
                          </h3>

                          <p>
                            Customer:{" "}
                            {getCustomerName(
                              installation
                            )}
                          </p>

                          <p>
                            Address:{" "}
                            {installation.address ||
                              "Not provided"}
                          </p>

                        </div>


                        <span
                          className={`request-status status-${installation.status}`}
                        >
                          {installation.status}
                        </span>

                      </div>


                      {/* DETAILS */}

                      <div className="service-request-details">

                        <div>

                          <span>
                            Requested
                          </span>

                          <strong>
                            {formatDate(
                              installation.createdAt
                            )}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Scheduled Date
                          </span>

                          <strong>
                            {formatDate(
                              installation.installationDate
                            )}
                          </strong>

                        </div>


                        <div>

                        <span>
                            Technicians
                        </span>

                        <strong>
                            {installation.technicians?.length
                            ? installation.technicians
                                .map(
                                    (technician) =>
                                    technician.user?.name ||
                                    "Unknown Technician"
                                )
                                .join(", ")
                            : "Not assigned"}
                        </strong>

                        </div>

                      </div>


                      {/* EDIT */}

                      {isEditing && (

                        <div className="request-edit-panel">

                          <div className="installation-field">

                            <label>
                              Assign Technician
                            </label>

                            <select
                              value={
                                update.technicianId ||
                                ""
                              }
                              onChange={(e) =>
                                handleInstallationChange(
                                  installation._id,
                                  "technicianId",
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Not Assigned
                              </option>

                              {technicians.map(
                                (technician) => (

                                  <option
                                    key={
                                      technician._id
                                    }
                                    value={
                                      technician._id
                                    }
                                  >
                                    {technician
                                      .user?.name ||
                                      "Technician"}
                                  </option>

                                )
                              )}

                            </select>

                          </div>


                          <div className="installation-field">

                            <label>
                              Status
                            </label>

                            <select
                              value={
                                update.status ||
                                "survey"
                              }
                              onChange={(e) =>
                                handleInstallationChange(
                                  installation._id,
                                  "status",
                                  e.target.value
                                )
                              }
                            >

                              <option value="survey">
                                Survey
                              </option>

                              <option value="pending">
                                Pending
                              </option>

                              <option value="in-progress">
                                In Progress
                              </option>

                              <option value="completed">
                                Completed
                              </option>

                            </select>

                          </div>


                          <div className="installation-field">

                            <label>
                              Installation Date
                            </label>

                            <input
                              type="date"
                              value={
                                update.installationDate ||
                                ""
                              }
                              onChange={(e) =>
                                handleInstallationChange(
                                  installation._id,
                                  "installationDate",
                                  e.target.value
                                )
                              }
                            />

                          </div>


                          <div className="installation-field">

                            <label>
                              Note
                            </label>

                            <input
                              type="text"
                              placeholder="Optional note"
                              value={
                                update.note ||
                                ""
                              }
                              onChange={(e) =>
                                handleInstallationChange(
                                  installation._id,
                                  "note",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>

                      )}


                      {/* VIEW NOTE */}

                      {!isEditing &&
                        installation.note && (

                          <div className="service-request-note">

                            <strong>
                              Note:
                            </strong>{" "}

                            {installation.note}

                          </div>

                        )}


                      {/* ACTIONS */}

                      <div className="service-request-actions">

                        {!isEditing ? (

                          <button
                            className="admin-btn"
                            onClick={() =>
                              startInstallationEdit(
                                installation
                              )
                            }
                          >
                            Edit
                          </button>

                        ) : (

                          <>
                            <button
                              className="admin-btn"
                              onClick={() =>
                                saveInstallation(
                                  installation._id
                                )
                              }
                            >
                              Save Changes
                            </button>

                            <button
                              className="admin-btn secondary"
                              onClick={() =>
                                cancelInstallationEdit(
                                  installation._id
                                )
                              }
                            >
                              Cancel
                            </button>
                          </>

                        )}

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default ServiceRequests;