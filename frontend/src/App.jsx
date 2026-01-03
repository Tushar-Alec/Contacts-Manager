import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";



function App() {
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  return (
   <div className="container py-5">
  <div className="text-center mb-5">
    <h2 className="app-title">Contact Manager</h2>
    <p className="sub-text">
  Simple contact management with real-time updates - built using React, Node.js, Express, MongoDB and Rest Api.
</p>
  </div>

  <div className="row g-4">
    <div className="col-md-4">
      <ContactForm setContacts={setContacts} />
    </div>
    <div className="col-md-8">
      <ContactList contacts={contacts} setContacts={setContacts} />
    </div>
  </div>
</div>


  );
}

export default App;
