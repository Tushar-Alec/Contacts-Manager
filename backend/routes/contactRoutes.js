const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST: Add Contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// GET: Fetch Contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
