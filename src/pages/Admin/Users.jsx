import { useEffect, useState } from "react";

import api from "../../api/api";

import "./Admin.css";

function Users() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewingCustomer, setViewingCustomer] = useState(null);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    phoneNumber: "",
    accountStatus: "active",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Nigeria"
    }
  });

  // ==============================
  // FETCH CUSTOMERS
  // ==============================

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");

        console.log(
          "Users page customers:",
          response.data
        );

        setCustomers(response.data.data || []);
      } catch (error) {
        console.error(
          "Fetch customers error:",
          error
        );

        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ==============================
  // UPDATE CUSTOMER
  // ==============================

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) return;

    try {
      const response = await api.put(
        `/customers/${editingCustomer._id}`,
        {
          phoneNumber: editForm.phoneNumber,
          accountStatus: editForm.accountStatus,
          billingAddress: {
            street:
              editForm.billingAddress.street,
            city:
              editForm.billingAddress.city,
            state:
              editForm.billingAddress.state,
            postalCode:
              editForm.billingAddress.postalCode,
            country:
              editForm.billingAddress.country ||
              "Nigeria"
          }
        }
      );

      console.log(
        "Updated customer:",
        response.data
      );

      const updatedCustomer =
        response.data.data;

      setCustomers((currentCustomers) =>
        currentCustomers.map((customer) =>
          customer._id === updatedCustomer._id
            ? {
                ...customer,
                ...updatedCustomer,

                // Preserve the populated user
                // if the update response does not
                // return it.
                user:
                  updatedCustomer.user ||
                  customer.user
              }
            : customer
        )
      );

      setEditingCustomer(null);

      setEditForm({
        phoneNumber: "",
        accountStatus: "active",
        billingAddress: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "Nigeria"
        }
      });

      setError("");
    } catch (error) {
      console.error(
        "Update customer error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update customer."
      );
    }
  };

  // ==============================
  // ACTIVATE / DEACTIVATE
  // ==============================

  const handleStatusChange = async (
    customerId,
    newStatus
  ) => {
    try {
      const response = await api.put(
        `/customers/${customerId}`,
        {
          accountStatus: newStatus
        }
      );

      console.log(
        "Account status updated:",
        response.data
      );

      setCustomers((currentCustomers) =>
        currentCustomers.map((customer) =>
          customer._id === customerId
            ? {
                ...customer,
                accountStatus: newStatus
              }
            : customer
        )
      );

      setError("");
    } catch (error) {
      console.error(
        "Update account status error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update account status."
      );
    }
  };

  // ==============================
  // DELETE CUSTOMER
  // ==============================

  const handleDeleteCustomer = async (
    customerId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer account?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(
        `/customers/${customerId}`
      );

      console.log(
        "Deleted customer:",
        response.data
      );

      setCustomers((currentCustomers) =>
        currentCustomers.filter(
          (customer) =>
            customer._id !== customerId
        )
      );

      if (
        viewingCustomer?._id === customerId
      ) {
        setViewingCustomer(null);
      }

      if (
        editingCustomer?._id === customerId
      ) {
        setEditingCustomer(null);
      }

      setError("");
    } catch (error) {
      console.error(
        "Delete customer error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete customer."
      );
    }
  };

  // ==============================
  // START EDITING
  // ==============================

  const startEditing = (customer) => {
    setEditingCustomer(customer);

    setViewingCustomer(null);

    setEditForm({
      phoneNumber:
        customer.phoneNumber || "",

      accountStatus:
        customer.accountStatus || "active",

      billingAddress: {
        street:
          customer.billingAddress?.street ||
          "",

        city:
          customer.billingAddress?.city ||
          "",

        state:
          customer.billingAddress?.state ||
          "",

        postalCode:
          customer.billingAddress?.postalCode ||
          "",

        country:
          customer.billingAddress?.country ||
          "Nigeria"
      }
    });
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <section className="admin-page">

      {/* ==============================
          HEADER
      ============================== */}

      <div className="admin-header">
        <h1>Manage Users</h1>

        <p>
          View and manage Oasis Energy customer
          accounts.
        </p>
      </div>

      {/* ==============================
          LOADING
      ============================== */}

      {loading && (
        <p>Loading users...</p>
      )}

      {/* ==============================
          ERROR
      ============================== */}

      {error && (
        <p className="admin-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>

          {/* ==============================
              VIEW CUSTOMER
          ============================== */}

          {viewingCustomer && (
            <div className="admin-form">

              <h2>Customer Details</h2>

              <p>
                <strong>Name:</strong>{" "}
                {viewingCustomer.user?.name ||
                  "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {viewingCustomer.user?.email ||
                  "N/A"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {viewingCustomer.user?.role ||
                  "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {viewingCustomer.phoneNumber ||
                  "N/A"}
              </p>

              <p>
                <strong>Account Status:</strong>{" "}
                {viewingCustomer.accountStatus ||
                  "N/A"}
              </p>

              <h3>Billing Address</h3>

              {viewingCustomer.billingAddress ? (
                <>
                  <p>
                    <strong>Street:</strong>{" "}
                    {viewingCustomer
                      .billingAddress.street ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {viewingCustomer
                      .billingAddress.city ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {viewingCustomer
                      .billingAddress.state ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Postal Code:</strong>{" "}
                    {viewingCustomer
                      .billingAddress
                      .postalCode ||
                      "N/A"}
                  </p>

                  <p>
                    <strong>Country:</strong>{" "}
                    {viewingCustomer
                      .billingAddress.country ||
                      "Nigeria"}
                  </p>
                </>
              ) : (
                <p>
                  No billing address available.
                </p>
              )}

              <button
                type="button"
                onClick={() =>
                  setViewingCustomer(null)
                }
              >
                Close
              </button>

            </div>
          )}

          {/* ==============================
              EDIT CUSTOMER
          ============================== */}

          {editingCustomer && (
            <div className="admin-form">

              <h2>Edit Customer</h2>

              <p>
                <strong>Name:</strong>{" "}
                {editingCustomer.user?.name ||
                  "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {editingCustomer.user?.email ||
                  "N/A"}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {editingCustomer.user?.role ||
                  "N/A"}
              </p>

              <label>
                Phone Number
              </label>

              <input
                type="text"
                value={
                  editForm.phoneNumber
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    phoneNumber:
                      event.target.value
                  })
                }
              />

              <label>
                Account Status
              </label>

              <select
                value={
                  editForm.accountStatus
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    accountStatus:
                      event.target.value
                  })
                }
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>

              <h3>Billing Address</h3>

              <input
                type="text"
                placeholder="Street"
                value={
                  editForm.billingAddress.street
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    billingAddress: {
                      ...editForm.billingAddress,
                      street:
                        event.target.value
                    }
                  })
                }
              />

              <input
                type="text"
                placeholder="City"
                value={
                  editForm.billingAddress.city
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    billingAddress: {
                      ...editForm.billingAddress,
                      city:
                        event.target.value
                    }
                  })
                }
              />

              <input
                type="text"
                placeholder="State"
                value={
                  editForm.billingAddress.state
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    billingAddress: {
                      ...editForm.billingAddress,
                      state:
                        event.target.value
                    }
                  })
                }
              />

              <input
                type="text"
                placeholder="Postal Code"
                value={
                  editForm.billingAddress
                    .postalCode
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    billingAddress: {
                      ...editForm.billingAddress,
                      postalCode:
                        event.target.value
                    }
                  })
                }
              />

              <input
                type="text"
                placeholder="Country"
                value={
                  editForm.billingAddress.country
                }
                onChange={(event) =>
                  setEditForm({
                    ...editForm,
                    billingAddress: {
                      ...editForm.billingAddress,
                      country:
                        event.target.value
                    }
                  })
                }
              />

              <button
                type="button"
                onClick={
                  handleUpdateCustomer
                }
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingCustomer(null);

                  setEditForm({
                    phoneNumber: "",
                    accountStatus: "active",
                    billingAddress: {
                      street: "",
                      city: "",
                      state: "",
                      postalCode: "",
                      country: "Nigeria"
                    }
                  });
                }}
              >
                Cancel
              </button>

            </div>
          )}

          {/* ==============================
              USERS TABLE
          ============================== */}

          <div className="users-table-container">

            <table className="users-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Account Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (

                    <tr key={customer._id}>

                      <td>
                        {customer.user?.name ||
                          "N/A"}
                      </td>

                      <td>
                        {customer.user?.email ||
                          "N/A"}
                      </td>

                      <td>
                        {customer.user?.role ||
                          "N/A"}
                      </td>

                      <td>
                        <select
                          value={
                            customer.accountStatus ||
                            "active"
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              customer._id,
                              event.target.value
                            )
                          }
                        >
                          <option value="active">
                            Active
                          </option>

                          <option value="inactive">
                            Inactive
                          </option>
                        </select>
                      </td>

                      <td>

                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() => {
                            setViewingCustomer(
                              customer
                            );

                            setEditingCustomer(
                              null
                            );
                          }}
                        >
                          View
                        </button>

                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() =>
                            startEditing(
                              customer
                            )
                          }
                        >
                          Edit
                        </button>

                        {/* ACTIVATE / DEACTIVATE */}
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              customer._id,
                              customer.accountStatus ===
                                "active"
                                ? "inactive"
                                : "active"
                            )
                          }
                        >
                          {customer.accountStatus ===
                          "active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCustomer(
                              customer._id
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

        </>
      )}

    </section>
  );
}

export default Users;