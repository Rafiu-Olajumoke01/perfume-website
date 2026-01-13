import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    instock: true,
    rating: "",
    image: null,
  });

  // Notification helper
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/orders/orders/");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Load products and orders on mount
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Add or update product
  const handleAddProduct = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert("Fill all required fields");
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("quantity", formData.stock);
    payload.append("instock", formData.instock);
    payload.append("rating", formData.rating);
    if (formData.image) payload.append("image", formData.image);

    try {
      if (editingProduct) {
        await axios.put(
          `http://127.0.0.1:8000/api/products/${editingProduct.id}/`,
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        showNotification("Product updated successfully!");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/products/add/",
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        showNotification("Product added successfully!");
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      showNotification("Error adding/updating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
        fetchProducts();
        showNotification("Product deleted");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.quantity,
      instock: product.instock,
      rating: product.rating || "",
      image: null,
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      instock: true,
      rating: "",
      image: null,
    });
    setEditingProduct(null);
    setShowAddModal(false);
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/update/${orderId}/`, {
        status: newStatus,
      });
      fetchOrders();
      showNotification("Order status updated");
    } catch (error) {
      console.error(error);
      showNotification("Error updating order status");
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/delete/${orderId}/`);
      fetchOrders();
      showNotification("Order deleted");
    } catch (error) {
      console.error(error);
      showNotification("Error deleting order");
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffa726";
      case "paid":
        return "#42a5f5";
      case "cancelled":
        return "#ef5350";
      default:
        return "#9e9e9e";
    }
  };

  return (
    <div className="dashboard-layout">
      {notification && <div className="notification">{notification}</div>}

      {/* Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {editingProduct ? "Edit Product" : "Add New Perfume"}
            </h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Perfume Name</label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Rose Oud"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Perfume description"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Price (₦)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="25000"
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="10"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>In Stock</label>
                <input
                  type="checkbox"
                  checked={formData.instock}
                  onChange={(e) =>
                    setFormData({ ...formData, instock: e.target.checked })
                  }
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={resetForm}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddProduct}>
                {editingProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">PerfumeAdmin</h2>
        <nav className="nav-list">
          <button
            className={activeTab === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className={activeTab === "products" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("products")}
          >
            🛍️ Products
          </button>
          <button
            className={activeTab === "orders" ? "nav-item active" : "nav-item"}
            onClick={() => setActiveTab("orders")}
          >
            📦 Orders
          </button>
          <button className="nav-item logout">🚪 Logout</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="topbar">
          <h1>Perfume Store Dashboard</h1>
          <div className="profile">
            <span>Admin</span>
            <div className="avatar" />
          </div>
        </header>

        {/* Dashboard stats */}
        {activeTab === "dashboard" && (
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Products</h4>
              <p className="stat-value">{products.length}</p>
            </div>
            <div className="stat-card">
              <h4>Total Orders</h4>
              <p className="stat-value">{orders.length}</p>
            </div>
            <div className="stat-card">
              <h4>Pending Orders</h4>
              <p className="stat-value">
                {orders.filter((o) => o.status === "pending").length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Revenue</h4>
              <p className="stat-value">₦{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Products tab */}
        {activeTab === "products" && (
          <section className="section">
            <div className="section-header">
              <h3>All Products</h3>
              <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                + Add Perfume
              </button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Perfume Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>₦{product.price.toLocaleString()}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <button className="btn-edit" onClick={() => startEdit(product)}>
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <section className="section">
            <h3>All Orders</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.user
                        ? order.user.email || order.user.username || order.user.id
                        : order.customer_email || "Guest"}
                    </td>
                    <td>
                      {order.items && order.items.map((item) => (
                        <div key={item.id}>
                          {item.product.name} x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>₦{parseFloat(order.total_amount).toLocaleString()}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => deleteOrder(order.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
