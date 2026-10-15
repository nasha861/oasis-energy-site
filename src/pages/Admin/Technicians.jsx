import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Admin.css";

function Technicians() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewingTechnician, setViewingTechnician] = useState(null);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [editForm, setEditForm] = useState({
    phone: "",
    specialization: "both",
    status: "available",
    certifications: "",
    currentLocation: {
      lat: "",
      lng: ""
    }
  });

  const [newTechnician, setNewTechnician] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    specialization: "both",
    certifications: "",
    status: "available"
  });

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await api.get("/technicians");

        console.log("Technicians from backend:", response.data);

        setTechnicians(response.data.data || []);
      } catch (error) {
        console.error("Fetch technicians error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load technicians."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  // =========================
  // ADD TECHNICIAN
  // =========================

  const handleNewTechnicianChange = (event) => {
    const { name, value } = event.target;

    setNewTechnician((previous) => ({
      ...previous,
      [name]: value
    }));
  };
    const handleAddTechnician = async () => {
      if (
        !newTechnician.name.trim() ||
        !newTechnician.email.trim() ||
        !newTechnician.password.trim()
      ) {
        setError("Name, email and password are required.");
        return;
      }

      try {
        setError("");

        // Create the technician account and profile together.
        await api.post("/auth/create-technician", {
          name: newTechnician.name.trim(),
          email: newTechnician.email.trim().toLowerCase(),
          password: newTechnician.password,
          phoneNumber: newTechnician.phoneNumber.trim(),
          specialization: newTechnician.specialization,
          certifications: newTechnician.certifications
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        });

        // Refresh the technician list.
        const response = await api.get("/technicians");
        setTechnicians(response.data.data || []);

        setNewTechnician({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
          specialization: "both",
          certifications: "",
          status: "available"
        });

        setShowAddForm(false);
        alert("Technician account created successfully!");
      } catch (error) {
        console.error("Add technician error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to create technician account."
        );
      }
    };
  // =========================
  // EDIT TECHNICIAN
  // =========================

  const startEditing = (technician) => {
    setEditingTechnician(technician);
    setViewingTechnician(null);
    setShowAddForm(false);

    setEditForm({
      phone: technician.phone || "",
      specialization:
        technician.specialization || "both",
      status: technician.status || "available",
      certifications:
        technician.certifications?.join(", ") || "",
      currentLocation: {
        lat:
          technician.currentLocation?.lat ?? "",
        lng:
          technician.currentLocation?.lng ?? ""
      }
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }));
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      currentLocation: {
        ...previousForm.currentLocation,
        [name]: value
      }
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingTechnician) return;

    try {
      const payload = {
        phone: editForm.phone,
        specialization:
          editForm.specialization,
        status: editForm.status,
        certifications: editForm.certifications
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      };

      if (
        editForm.currentLocation.lat !== "" &&
        editForm.currentLocation.lng !== ""
      ) {
        payload.currentLocation = {
          lat: Number(
            editForm.currentLocation.lat
          ),
          lng: Number(
            editForm.currentLocation.lng
          )
        };
      }

      const response = await api.put(
        `/technicians/${editingTechnician._id}`,
        payload
      );

      console.log(
        "Updated technician:",
        response.data
      );

      const updatedTechnician =
        response.data.data;

      setTechnicians(
        (currentTechnicians) =>
          currentTechnicians.map(
            (technician) =>
              technician._id ===
              updatedTechnician._id
                ? {
                    ...technician,
                    ...updatedTechnician
                  }
                : technician
          )
      );

      setEditingTechnician(null);
      setError("");

      alert(
        "Technician updated successfully!"
      );
    } catch (error) {
      console.error(
        "Update technician error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update technician."
      );
    }
  };

  // =========================
  // STATUS CHANGE
  // =========================

  const handleStatusChange = async (
    technicianId,
    newStatus
  ) => {
    try {
      const response = await api.put(
        `/technicians/${technicianId}`,
        { status: newStatus }
      );

      console.log(
        "Technician status updated:",
        response.data
      );

      const updatedTechnician =
        response.data.data;

      setTechnicians(
        (currentTechnicians) =>
          currentTechnicians.map(
            (technician) =>
              technician._id === technicianId
                ? {
                    ...technician,
                    ...updatedTechnician
                  }
                : technician
          )
      );

      if (
        viewingTechnician?._id ===
        technicianId
      ) {
        setViewingTechnician(
          (currentTechnician) => ({
            ...currentTechnician,
            ...updatedTechnician
          })
        );
      }

      setError("");
    } catch (error) {
      console.error(
        "Update technician status error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update technician status."
      );
    }
  };

  // =========================
  // DELETE TECHNICIAN
  // =========================

  const handleDeleteTechnician = async (
    technicianId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this technician record?"
    );

    if (!confirmed) return;

    try {
      const response = await api.delete(
        `/technicians/${technicianId}`
      );

      console.log(
        "Deleted technician:",
        response.data
      );

      setTechnicians(
        (currentTechnicians) =>
          currentTechnicians.filter(
            (technician) =>
              technician._id !== technicianId
          )
      );

      if (
        viewingTechnician?._id ===
        technicianId
      ) {
        setViewingTechnician(null);
      }

      if (
        editingTechnician?._id ===
        technicianId
      ) {
        setEditingTechnician(null);
      }

      alert(
        "Technician deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete technician error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete technician."
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <p>Loading technicians...</p>;
  }

  if (error && technicians.length === 0) {
    return (
      <p className="admin-error">
        {error}
      </p>
    );
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Manage Technicians</h1>
          <p>
            View and manage Oasis Energy
            technicians.
          </p>
        </div>

        <button
          type="button"
          className="dashboard-button"
          onClick={() => {
            setShowAddForm(true);
            setViewingTechnician(null);
            setEditingTechnician(null);
            setError("");
          }}
        >
          + Add Technician
        </button>
      </div>

      {error && (
        <p className="admin-error">
          {error}
        </p>
      )}

      {/* =========================
          ADD TECHNICIAN FORM
      ========================= */}

      {showAddForm && (
        <div className="admin-form">
          <h2>Add New Technician</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Technician full name"
            value={newTechnician.name}
            onChange={
              handleNewTechnicianChange
            }
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="technician@example.com"
            value={newTechnician.email}
            onChange={
              handleNewTechnicianChange
            }
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={newTechnician.password}
            onChange={
              handleNewTechnicianChange
            }
          />

          <label>Phone</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="08012345678"
            value={
              newTechnician.phoneNumber
            }
            onChange={
              handleNewTechnicianChange
            }
          />

          <label>Specialization</label>
          <select
            name="specialization"
            value={
              newTechnician.specialization
            }
            onChange={
              handleNewTechnicianChange
            }
          >
            <option value="installation">
              Installation
            </option>
            <option value="maintenance">
              Maintenance
            </option>
            <option value="both">
              Both
            </option>
          </select>

          <label>Status</label>
          <select
            name="status"
            value={newTechnician.status}
            onChange={
              handleNewTechnicianChange
            }
          >
            <option value="available">
              Available
            </option>
            <option value="busy">
              Busy
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>

          <label>Certifications</label>
          <input
            type="text"
            name="certifications"
            placeholder="e.g. NABTEB, Solar PV, Electrical"
            value={
              newTechnician.certifications
            }
            onChange={
              handleNewTechnicianChange
            }
          />

          <small>
            Separate multiple certifications
            with commas.
          </small>

          <div>
            <button
              type="button"
              onClick={
                handleAddTechnician
              }
            >
              Create Technician
            </button>

            <button
              type="button"
              onClick={() =>
                setShowAddForm(false)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* =========================
          VIEW TECHNICIAN
      ========================= */}

      {viewingTechnician && (
        <div className="admin-form">
          <h2>Technician Details</h2>

          <p>
            <strong>Name:</strong>{" "}
            {viewingTechnician.user?.name ||
              "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {viewingTechnician.user?.email ||
              "N/A"}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {viewingTechnician.user?.role ||
              "N/A"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {viewingTechnician.phone ||
              "N/A"}
          </p>

          <p>
            <strong>
              Specialization:
            </strong>{" "}
            {viewingTechnician.specialization ||
              "N/A"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {viewingTechnician.status ||
              "N/A"}
          </p>

          <p>
            <strong>
              Certifications:
            </strong>{" "}
            {viewingTechnician.certifications
              ?.length
              ? viewingTechnician.certifications.join(
                  ", "
                )
              : "None"}
          </p>

          <p>
            <strong>
              Assigned Installations:
            </strong>{" "}
            {viewingTechnician
              .assignedInstallations
              ?.length || 0}
          </p>

          <p>
            <strong>
              Assigned Maintenance:
            </strong>{" "}
            {viewingTechnician
              .assignedMaintenance
              ?.length || 0}
          </p>

          <p>
            <strong>
              Current Location:
            </strong>{" "}
            {viewingTechnician
              .currentLocation?.lat !==
            undefined
              ? `${viewingTechnician.currentLocation.lat}, ${viewingTechnician.currentLocation.lng}`
              : "Not provided"}
          </p>

          <button
            type="button"
            onClick={() =>
              setViewingTechnician(null)
            }
          >
            Close
          </button>
        </div>
      )}

      {/* =========================
          EDIT TECHNICIAN
      ========================= */}

      {editingTechnician && (
        <div className="admin-form">
          <h2>Edit Technician</h2>

          <p>
            <strong>Name:</strong>{" "}
            {editingTechnician.user?.name ||
              "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {editingTechnician.user?.email ||
              "N/A"}
          </p>

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={editForm.phone}
            onChange={handleEditChange}
          />

          <label>
            Specialization
          </label>
          <select
            name="specialization"
            value={
              editForm.specialization
            }
            onChange={handleEditChange}
          >
            <option value="installation">
              Installation
            </option>
            <option value="maintenance">
              Maintenance
            </option>
            <option value="both">
              Both
            </option>
          </select>

          <label>Status</label>
          <select
            name="status"
            value={editForm.status}
            onChange={handleEditChange}
          >
            <option value="available">
              Available
            </option>
            <option value="busy">
              Busy
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>

          <label>
            Certifications
          </label>
          <input
            type="text"
            name="certifications"
            placeholder="e.g. NABTEB, Solar PV, Electrical"
            value={
              editForm.certifications
            }
            onChange={handleEditChange}
          />

          <small>
            Separate multiple certifications
            with commas.
          </small>

          <h3>
            Current Location
          </h3>

          <input
            type="number"
            name="lat"
            placeholder="Latitude"
            value={
              editForm.currentLocation
                .lat
            }
            onChange={
              handleLocationChange
            }
          />

          <input
            type="number"
            name="lng"
            placeholder="Longitude"
            value={
              editForm.currentLocation
                .lng
            }
            onChange={
              handleLocationChange
            }
          />

          <button
            type="button"
            onClick={handleSaveEdit}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() =>
              setEditingTechnician(null)
            }
          >
            Cancel
          </button>
        </div>
      )}

      {/* =========================
          TECHNICIANS TABLE
      ========================= */}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {technicians.length === 0 ? (
              <tr>
                <td colSpan="6">
                  No technicians found.
                </td>
              </tr>
            ) : (
              technicians.map(
                (technician) => (
                  <tr
                    key={
                      technician._id
                    }
                  >
                    <td>
                      {technician.user
                        ?.name || "N/A"}
                    </td>

                    <td>
                      {technician.user
                        ?.email || "N/A"}
                    </td>

                    <td>
                      {technician.phone ||
                        "N/A"}
                    </td>

                    <td>
                      {technician.specialization ||
                        "N/A"}
                    </td>

                    <td>
                      <select
                        value={
                          technician.status ||
                          "available"
                        }
                        onChange={(event) =>
                          handleStatusChange(
                            technician._id,
                            event.target.value
                          )
                        }
                      >
                        <option value="available">
                          Available
                        </option>

                        <option value="busy">
                          Busy
                        </option>

                        <option value="inactive">
                          Inactive
                        </option>
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setViewingTechnician(
                            technician
                          );
                          setEditingTechnician(
                            null
                          );
                          setShowAddForm(
                            false
                          );
                        }}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          startEditing(
                            technician
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteTechnician(
                            technician._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Technicians;