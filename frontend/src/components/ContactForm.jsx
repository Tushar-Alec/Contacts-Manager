import { useState } from "react";
const API = import.meta.env.VITE_API_BASE_URL;

function ContactForm({ setContacts }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isFormValid =
    formData.name.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.phone.trim() !== "";

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      setError("Name and Phone are required");
      return;
    }

    setError("");

    const res = await fetch(`${API}api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
});


    const newContact = await res.json();

    setContacts((prev) => [newContact, ...prev]);

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3 d-flex align-items-center">
          <span className="me-2"></span> New Contact
        </h5>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              placeholder="Tushar Patil"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              placeholder="tushar@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="3"
              name="message"
              placeholder="Optional note or message..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-100"
            disabled={!isFormValid}
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
