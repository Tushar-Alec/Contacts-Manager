const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB FIRST
connectDB();

// routes
app.use("/api/contacts", require("./routes/contactRoutes"));
module.exports = app;
