import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Admin.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const emptyForm = {
    name: "",
    description: "",
    category: "installation",
    price: "",
    duration: "",
    isActive: true
  };

  const [form, setForm] = useState(emptyForm);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/services");

      setServices(response.data.data || []);
    } catch (err) {
      console.error("Fetch services error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const openAddForm = () => {
    setEditingService(null);
    setForm(emptyForm);
    setShowAddForm(true);
    setError("");
  };

  const openEditForm = (service) => {
    setEditingService(service);

    setForm({
      name: service.name || "",
      description: service.description || "",
      category: service.category || "installation",
      price: service.price ?? "",
      duration: service.duration || "",
      isActive: service.isActive ?? true
    });

    setShowAddForm(true);
    setError("");
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingService(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const serviceData = {
        ...form,
        price: Number(form.price) || 0
      };

      if (editingService) {
        await api.put(
          `/services/${editingService._id}`,
          serviceData
        );
      } else {
        await api.post("/services", serviceData);
      }

      closeForm();
      await fetchServices();
    } catch (err) {
      console.error("Save service error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to save service"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(`/services/${id}`);

      await fetchServices();
    } catch (err) {
      console.error("Delete service error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete service"
      );
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      setError("");

      await api.put(`/services/${service._id}`, {
        isActive: !service.isActive
      });

      await fetchServices();
    } catch (err) {
      console.error("Update service status error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update service status"
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>Services</h1>
          <p>
            Manage the services offered by Oasis Energy.
          </p>
        </div>

        <button
          className="admin-btn"
          onClick={openAddForm}
        >
          + Add Service
        </button>
      </div>

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="admin-card service-form-card">
          <div className="service-form-header">
            <div>
              <h2>
                {editingService
                  ? "Edit Service"
                  : "Add New Service"}
              </h2>

              <p>
                {editingService
                  ? "Update the service information below."
                  : "Add a new service to the Oasis Energy catalogue."}
              </p>
            </div>

            <button
              type="button"
              className="service-close-btn"
              onClick={closeForm}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label>Service Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Solar Panel Installation"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="installation">
                    Installation
                  </option>

                  <option value="maintenance">
                    Maintenance
                  </option>

                  <option value="consultation">
                    Consultation
                  </option>

                  <option value="repair">
                    Repair
                  </option>

                  <option value="inspection">
                    Inspection
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Price (₦)</label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="admin-form-group">
                <label>Duration</label>

                <input
                  type="text"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 1-2 days"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the service..."
              />
            </div>

            <label className="admin-checkbox">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />

              <span>Active Service</span>
            </label>

            <div className="admin-form-actions">
              <button
                type="submit"
                className="admin-btn"
              >
                {editingService
                  ? "Update Service"
                  : "Create Service"}
              </button>

              <button
                type="button"
                className="admin-btn secondary"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card services-catalogue-card">
        <div className="services-catalogue-header">
          <div>
            <h2>Service Catalogue</h2>

            <p>
              {services.length} service
              {services.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {services.length === 0 ? (
          <div className="empty-services">
            <h3>No Services Yet</h3>

            <p>
              Add your first service to begin building the
              service catalogue.
            </p>

            <button
              className="admin-btn"
              onClick={openAddForm}
            >
              + Add Service
            </button>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div
                className="service-admin-card"
                key={service._id}
              >
                <div className="service-card-top">
                  <div>
                    <span className="service-category">
                      {service.category}
                    </span>

                    <h3>{service.name}</h3>
                  </div>

                  <span
                    className={
                      service.isActive
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {service.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <p className="service-description">
                  {service.description ||
                    "No description provided."}
                </p>

                <div className="service-meta">
                  <div>
                    <span>Price</span>

                    <strong>
                      ₦
                      {Number(
                        service.price || 0
                      ).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>Duration</span>

                    <strong>
                      {service.duration || "-"}
                    </strong>
                  </div>
                </div>

                <div className="service-actions">
                  <button
                    className="admin-btn small"
                    onClick={() =>
                      openEditForm(service)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="admin-btn small secondary"
                    onClick={() =>
                      handleToggleStatus(service)
                    }
                  >
                    {service.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    className="admin-btn danger small"
                    onClick={() =>
                      handleDelete(service._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;