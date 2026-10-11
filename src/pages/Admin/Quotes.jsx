import { useEffect, useState } from "react";
import api from "../../api/api";

import "./Admin.css";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewingQuote, setViewingQuote] = useState(null);
  const [editingQuote, setEditingQuote] = useState(null);

  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    source: [],
    homeowner: false,
    status: "Pending",
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await api.get("/quotes");

        console.log("Quotes from backend:", response.data);

        setQuotes(response.data.data || []);
      } catch (error) {
        console.error("Fetch quotes error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load quote requests."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleStatusChange = async (quoteId, newStatus) => {
    try {
      const response = await api.put(`/quotes/${quoteId}`, {
        status: newStatus,
      });

      console.log("Updated quote:", response.data);

      const updatedQuote = response.data.data;

      setQuotes((currentQuotes) =>
        currentQuotes.map((quote) =>
          quote._id === quoteId
            ? {
                ...quote,
                ...updatedQuote,
              }
            : quote
        )
      );

      if (viewingQuote?._id === quoteId) {
        setViewingQuote((currentQuote) => ({
          ...currentQuote,
          ...updatedQuote,
        }));
      }

      alert("Quote status updated successfully!");
    } catch (error) {
      console.error("Update quote status error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update quote status."
      );
    }
  };

  const startEditing = (quote) => {
    setEditingQuote(quote);
    setViewingQuote(null);

    setEditForm({
      firstName: quote.firstName || "",
      lastName: quote.lastName || "",
      address: quote.address || "",
      email: quote.email || "",
      phone: quote.phone || "",
      source: quote.source || [],
      homeowner: quote.homeowner || false,
      status: quote.status || "Pending",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingQuote) {
      return;
    }

    try {
      const response = await api.put(
        `/quotes/${editingQuote._id}`,
        editForm
      );

      console.log("Updated quote details:", response.data);

      const updatedQuote = response.data.data;

      setQuotes((currentQuotes) =>
        currentQuotes.map((quote) =>
          quote._id === updatedQuote._id
            ? updatedQuote
            : quote
        )
      );

      setEditingQuote(null);

      setEditForm({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: "",
        source: [],
        homeowner: false,
        status: "Pending",
      });

      setError("");

      alert("Quote updated successfully!");
    } catch (error) {
      console.error("Update quote error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update quote."
      );
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quote request?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(
        `/quotes/${quoteId}`
      );

      console.log("Deleted quote:", response.data);

      setQuotes((currentQuotes) =>
        currentQuotes.filter(
          (quote) => quote._id !== quoteId
        )
      );

      if (viewingQuote?._id === quoteId) {
        setViewingQuote(null);
      }

      if (editingQuote?._id === quoteId) {
        setEditingQuote(null);
      }

      alert("Quote deleted successfully!");
    } catch (error) {
      console.error("Delete quote error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete quote."
      );
    }
  };

  if (loading) {
    return <p>Loading quote requests...</p>;
  }

  if (error && quotes.length === 0) {
    return <p className="admin-error">{error}</p>;
  }

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h1>Manage Quotes</h1>

        <p>
          Review and manage customer solar quote requests.
        </p>
      </div>

      {error && (
        <p className="admin-error">
          {error}
        </p>
      )}

      {/* =========================
          VIEW QUOTE
      ========================== */}

      {viewingQuote && (
        <div className="admin-form">
          <h2>Quote Details</h2>

          <p>
            <strong>First Name:</strong>{" "}
            {viewingQuote.firstName}
          </p>

          <p>
            <strong>Last Name:</strong>{" "}
            {viewingQuote.lastName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {viewingQuote.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {viewingQuote.phone}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {viewingQuote.address}
          </p>

          <p>
            <strong>Homeowner:</strong>{" "}
            {viewingQuote.homeowner
              ? "Yes"
              : "No"}
          </p>

          <p>
            <strong>Source:</strong>{" "}
            {viewingQuote.source?.length
              ? viewingQuote.source.join(", ")
              : "Not provided"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {viewingQuote.status}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {viewingQuote.createdAt
              ? new Date(
                  viewingQuote.createdAt
                ).toLocaleString()
              : "N/A"}
          </p>

          <button
            type="button"
            onClick={() =>
              setViewingQuote(null)
            }
          >
            Close
          </button>
        </div>
      )}

      {/* =========================
          EDIT QUOTE
      ========================== */}

      {editingQuote && (
        <div className="admin-form">
          <h2>Edit Quote</h2>

          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={editForm.firstName}
            onChange={handleEditChange}
          />

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={editForm.lastName}
            onChange={handleEditChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
          />

          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={editForm.phone}
            onChange={handleEditChange}
          />

          <label>Address</label>

          <input
            type="text"
            name="address"
            value={editForm.address}
            onChange={handleEditChange}
          />

          <label>Homeowner</label>

          <select
            value={
              editForm.homeowner
                ? "yes"
                : "no"
            }
            onChange={(event) =>
              setEditForm({
                ...editForm,
                homeowner:
                  event.target.value === "yes",
              })
            }
          >
            <option value="yes">
              Yes
            </option>

            <option value="no">
              No
            </option>
          </select>

          <label>Status</label>

          <select
            name="status"
            value={editForm.status}
            onChange={handleEditChange}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

          <button
            type="button"
            onClick={handleSaveEdit}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() =>
              setEditingQuote(null)
            }
          >
            Cancel
          </button>
        </div>
      )}

      {/* =========================
          QUOTES TABLE
      ========================== */}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Homeowner</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {quotes.length === 0 ? (
              <tr>
                <td colSpan="7">
                  No quote requests found.
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote._id}>
                  <td>
                    {quote.firstName}{" "}
                    {quote.lastName}
                  </td>

                  <td>
                    {quote.email}
                  </td>

                  <td>
                    {quote.phone}
                  </td>

                  <td>
                    {quote.homeowner
                      ? "Yes"
                      : "No"}
                  </td>

                  <td>
                    <select
                      value={
                        quote.status ||
                        "Pending"
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          quote._id,
                          event.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Contacted">
                        Contacted
                      </option>

                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </td>

                  <td>
                    {quote.createdAt
                      ? new Date(
                          quote.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setViewingQuote(quote);
                        setEditingQuote(null);
                      }}
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        startEditing(quote)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteQuote(
                          quote._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Quotes;