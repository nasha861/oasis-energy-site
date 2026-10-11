import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Admin.css";

function SolarProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [viewingProduct, setViewingProduct] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    modelName: "",
    manufacturer: "",
    category: "panel",
    wattage: "",
    warrantyYears: "",
    price: "",
    description: "",
    specifications: {
      efficiency: "",
      capacity: "",
      voltage: "",
      notes: ""
    }
  });

  // ==============================
  // FETCH SOLAR PRODUCTS
  // ==============================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/solar-products");

        console.log("Solar products:", response.data);

        setProducts(response.data.data);
      } catch (error) {
        console.error("Fetch solar products error:", error);

        setError("Failed to load solar products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==============================
  // ACTIVATE / DEACTIVATE PRODUCT
  // ==============================
  const handleStatusChange = async (productId, newStatus) => {
    try {
      const response = await api.put(
        `/solar-products/${productId}`,
        {
          isActive: newStatus
        }
      );

      console.log("Updated solar product:", response.data);

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === productId
            ? {
                ...product,
                isActive: newStatus
              }
            : product
        )
      );

      setError("");
    } catch (error) {
      console.error("Update product status error:", error);

      setError("Failed to update product status.");
    }
  };

  // ==============================
  // UPDATE PRODUCT
  // ==============================
  const handleUpdateProduct = async () => {
    try {
      const response = await api.put(
        `/solar-products/${editingProduct._id}`,
        {
          ...editForm,

          wattage: Number(editForm.wattage),
          warrantyYears: Number(editForm.warrantyYears),
          price: Number(editForm.price),

          specifications: {
            efficiency: Number(
              editForm.specifications?.efficiency
            ),
            capacity: Number(
              editForm.specifications?.capacity
            ),
            voltage: Number(
              editForm.specifications?.voltage
            ),
            notes:
              editForm.specifications?.notes || ""
          }
        }
      );

      console.log("Updated solar product:", response.data);

      const updatedProduct = response.data.data;

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === updatedProduct._id
            ? updatedProduct
            : product
        )
      );

      setEditingProduct(null);
      setEditForm({});
      setError("");
    } catch (error) {
      console.error(
        "Update solar product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update solar product."
      );
    }
  };

  // ==============================
  // CREATE PRODUCT
  // ==============================
  const handleCreateProduct = async () => {
    try {
      const response = await api.post(
        "/solar-products",
        {
          ...newProduct,

          wattage: Number(newProduct.wattage),
          warrantyYears: Number(
            newProduct.warrantyYears
          ),
          price: Number(newProduct.price),

          specifications: {
            efficiency: Number(
              newProduct.specifications.efficiency
            ),
            capacity: Number(
              newProduct.specifications.capacity
            ),
            voltage: Number(
              newProduct.specifications.voltage
            ),
            notes:
              newProduct.specifications.notes || ""
          }
        }
      );

      console.log(
        "Created solar product:",
        response.data
      );

      const createdProduct = response.data.data;

      setProducts((currentProducts) => [
        createdProduct,
        ...currentProducts
      ]);

      setShowAddForm(false);

      setNewProduct({
        name: "",
        modelName: "",
        manufacturer: "",
        category: "panel",
        wattage: "",
        warrantyYears: "",
        price: "",
        description: "",
        specifications: {
          efficiency: "",
          capacity: "",
          voltage: "",
          notes: ""
        }
      });

      setError("");
    } catch (error) {
      console.error(
        "Create solar product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create solar product."
      );
    }
  };

  // ==============================
  // DELETE PRODUCT
  // ==============================
  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this solar product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(
        `/solar-products/${productId}`
      );

      console.log(
        "Deleted solar product:",
        response.data
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      );

      // Close view if the deleted product was being viewed
      if (viewingProduct?._id === productId) {
        setViewingProduct(null);
      }

      // Close edit if the deleted product was being edited
      if (editingProduct?._id === productId) {
        setEditingProduct(null);
        setEditForm({});
      }

      setError("");
    } catch (error) {
      console.error(
        "Delete solar product error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete solar product."
      );
    }
  };

  return (
    <section className="admin-page">

      {/* ==============================
          PAGE HEADER
      ============================== */}
      <div className="admin-header">
        <h1>Manage Solar Products</h1>

        <p>
          View and manage Oasis Energy solar products.
        </p>

        <button
          type="button"
          onClick={() => {
            console.log(
              "ADD PRODUCT BUTTON CLICKED"
            );

            setShowAddForm(true);
            setEditingProduct(null);
            setViewingProduct(null);
          }}
        >
          + Add Solar Product
        </button>
      </div>

      {/* ==============================
          LOADING
      ============================== */}
      {loading && (
        <p>Loading solar products...</p>
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
              ADD PRODUCT FORM
          ============================== */}
          {showAddForm && (
            <div className="admin-form">

              <h2>Add New Solar Product</h2>

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Model Name"
                value={newProduct.modelName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    modelName: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Manufacturer"
                value={newProduct.manufacturer}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    manufacturer: e.target.value
                  })
                }
              />

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value
                  })
                }
              >
                <option value="panel">
                  Panel
                </option>

                <option value="inverter">
                  Inverter
                </option>

                <option value="battery">
                  Battery
                </option>

                <option value="kit">
                  Kit
                </option>

                <option value="accessory">
                  Accessory
                </option>
              </select>

              <input
                type="number"
                placeholder="Wattage"
                value={newProduct.wattage}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    wattage: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Warranty Years"
                value={newProduct.warrantyYears}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    warrantyYears: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value
                  })
                }
              />

              <h3>Specifications</h3>

              <input
                type="number"
                placeholder="Efficiency"
                value={
                  newProduct.specifications.efficiency
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    specifications: {
                      ...newProduct.specifications,
                      efficiency: e.target.value
                    }
                  })
                }
              />

              <input
                type="number"
                placeholder="Capacity"
                value={
                  newProduct.specifications.capacity
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    specifications: {
                      ...newProduct.specifications,
                      capacity: e.target.value
                    }
                  })
                }
              />

              <input
                type="number"
                placeholder="Voltage"
                value={
                  newProduct.specifications.voltage
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    specifications: {
                      ...newProduct.specifications,
                      voltage: e.target.value
                    }
                  })
                }
              />

              <textarea
                placeholder="Specification Notes"
                value={
                  newProduct.specifications.notes
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    specifications: {
                      ...newProduct.specifications,
                      notes: e.target.value
                    }
                  })
                }
              />

              <button
                type="button"
                onClick={handleCreateProduct}
              >
                Create Product
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
          )}

          {/* ==============================
              VIEW PRODUCT
          ============================== */}
          {viewingProduct && (
            <div className="admin-form">

              <h2>Solar Product Details</h2>

              <p>
                <strong>Name:</strong>{" "}
                {viewingProduct.name}
              </p>

              <p>
                <strong>Model:</strong>{" "}
                {viewingProduct.modelName}
              </p>

              <p>
                <strong>Manufacturer:</strong>{" "}
                {viewingProduct.manufacturer}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {viewingProduct.category}
              </p>

              <p>
                <strong>Wattage:</strong>{" "}
                {viewingProduct.wattage || "N/A"}
              </p>

              <p>
                <strong>Warranty:</strong>{" "}
                {viewingProduct.warrantyYears
                  ? `${viewingProduct.warrantyYears} years`
                  : "N/A"}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                ₦
                {viewingProduct.price?.toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {viewingProduct.isActive
                  ? "Active"
                  : "Inactive"}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {viewingProduct.description ||
                  "No description available."}
              </p>

              <h3>Specifications</h3>

              <p>
                <strong>Efficiency:</strong>{" "}
                {viewingProduct.specifications
                  ?.efficiency ?? "N/A"}
              </p>

              <p>
                <strong>Capacity:</strong>{" "}
                {viewingProduct.specifications
                  ?.capacity ?? "N/A"}
              </p>

              <p>
                <strong>Voltage:</strong>{" "}
                {viewingProduct.specifications
                  ?.voltage ?? "N/A"}
              </p>

              <p>
                <strong>Notes:</strong>{" "}
                {viewingProduct.specifications
                  ?.notes || "No notes available."}
              </p>

              <button
                type="button"
                onClick={() =>
                  setViewingProduct(null)
                }
              >
                Close
              </button>

            </div>
          )}

          {/* ==============================
              EDIT PRODUCT FORM
          ============================== */}
          {editingProduct && (
            <div className="admin-form">

              <h2>Edit Solar Product</h2>

              <input
                type="text"
                placeholder="Product Name"
                value={editForm.name || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    name: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Model Name"
                value={editForm.modelName || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    modelName: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Manufacturer"
                value={
                  editForm.manufacturer || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    manufacturer: e.target.value
                  })
                }
              />

              <select
                value={
                  editForm.category || "panel"
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    category: e.target.value
                  })
                }
              >
                <option value="panel">
                  Panel
                </option>

                <option value="inverter">
                  Inverter
                </option>

                <option value="battery">
                  Battery
                </option>

                <option value="kit">
                  Kit
                </option>

                <option value="accessory">
                  Accessory
                </option>
              </select>

              <input
                type="number"
                placeholder="Wattage"
                value={editForm.wattage || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    wattage: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Warranty Years"
                value={
                  editForm.warrantyYears || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    warrantyYears: e.target.value
                  })
                }
              />

              <input
                type="number"
                placeholder="Price"
                value={editForm.price || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    price: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Description"
                value={
                  editForm.description || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    description: e.target.value
                  })
                }
              />

              <h3>Specifications</h3>

              <input
                type="number"
                placeholder="Efficiency"
                value={
                  editForm.specifications
                    ?.efficiency || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    specifications: {
                      ...editForm.specifications,
                      efficiency: e.target.value
                    }
                  })
                }
              />

              <input
                type="number"
                placeholder="Capacity"
                value={
                  editForm.specifications
                    ?.capacity || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    specifications: {
                      ...editForm.specifications,
                      capacity: e.target.value
                    }
                  })
                }
              />

              <input
                type="number"
                placeholder="Voltage"
                value={
                  editForm.specifications
                    ?.voltage || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    specifications: {
                      ...editForm.specifications,
                      voltage: e.target.value
                    }
                  })
                }
              />

              <textarea
                placeholder="Specification Notes"
                value={
                  editForm.specifications
                    ?.notes || ""
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    specifications: {
                      ...editForm.specifications,
                      notes: e.target.value
                    }
                  })
                }
              />

              <button
                type="button"
                onClick={handleUpdateProduct}
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setEditForm({});
                }}
              >
                Cancel
              </button>

            </div>
          )}

          {/* ==============================
              PRODUCTS TABLE
          ============================== */}
          <div className="users-table-container">

            <table className="users-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Model</th>
                  <th>Manufacturer</th>
                  <th>Category</th>
                  <th>Wattage</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {products.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      No solar products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (

                    <tr key={product._id}>

                      <td>
                        {product.name}
                      </td>

                      <td>
                        {product.modelName}
                      </td>

                      <td>
                        {product.manufacturer}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        {product.wattage || "N/A"}
                      </td>

                      <td>
                        ₦
                        {product.price?.toLocaleString()}
                      </td>

                      <td>
                        {product.isActive
                          ? "Active"
                          : "Inactive"}
                      </td>

                      <td>

                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() => {
                            setViewingProduct(
                              product
                            );
                            setEditingProduct(null);
                            setShowAddForm(false);
                          }}
                        >
                          View
                        </button>

                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(
                              product
                            );

                            setViewingProduct(null);
                            setShowAddForm(false);

                            setEditForm({
                              name:
                                product.name || "",

                              modelName:
                                product.modelName ||
                                "",

                              manufacturer:
                                product.manufacturer ||
                                "",

                              category:
                                product.category ||
                                "panel",

                              wattage:
                                product.wattage || "",

                              warrantyYears:
                                product.warrantyYears ||
                                "",

                              price:
                                product.price || "",

                              description:
                                product.description ||
                                "",

                              specifications: {
                                efficiency:
                                  product
                                    .specifications
                                    ?.efficiency ||
                                  "",

                                capacity:
                                  product
                                    .specifications
                                    ?.capacity ||
                                  "",

                                voltage:
                                  product
                                    .specifications
                                    ?.voltage ||
                                  "",

                                notes:
                                  product
                                    .specifications
                                    ?.notes ||
                                  ""
                              }
                            });
                          }}
                        >
                          Edit
                        </button>

                        {/* ACTIVATE / DEACTIVATE */}
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              product._id,
                              !product.isActive
                            )
                          }
                        >
                          {product.isActive
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteProduct(
                              product._id
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

export default SolarProducts;