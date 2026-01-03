import { useState } from "react";
const API = import.meta.env.VITE_API_BASE_URL;

function ContactList({ contacts, setContacts }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  
  const handleDelete = async (id) => {
    await fetch(`${API}/api/contacts/${id}`, {
      method: "DELETE",
    });

    
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  
  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditData(contact);
  };

  
  const handleUpdate = async (id) => {
    const res = await fetch(`${API}/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    const updatedContact = await res.json();

    setContacts((prev) =>
      prev.map((c) => (c._id === id ? updatedContact : c))
    );

    setEditingId(null);
  };

  return (
  <div className="card shadow-sm">
    <div className="card-body">
      <h5 className="mb-4">Saved Contacts</h5>

      {contacts.length === 0 && (
        <p className="text-muted">No contacts added yet</p>
      )}

      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="contact-item d-flex justify-content-between align-items-start py-3 border-bottom"
        >
          {editingId === contact._id ? (
            <div className="w-100">
              <div className="row g-2 mb-2">
                <div className="col">
                  <input
                  
                    className="form-control"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col">
                  <input
                    className="form-control"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    value={editData.message}
                    onChange={(e) =>
                      setEditData({ ...editData, message: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => handleUpdate(contact._id)}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div>
                <strong>{contact.name}</strong>
                <div className="text-muted small">
                  {contact.phone} · {contact.email}
                </div>
                {contact.message && (
                  <div className="small mt-1">
                    {contact.message}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
);
}




export default ContactList;
