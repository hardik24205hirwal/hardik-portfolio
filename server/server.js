require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");

const contactRoutes = require("./routes/contact");
const resumeRoutes = require("./routes/resume");

const app = express();

const PORT = process.env.PORT || 5000;

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(helmet());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000"
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

/*
|--------------------------------------------------------------------------
| Contact Form Rate Limiting
|--------------------------------------------------------------------------
|
| Prevents someone from repeatedly submitting the contact form.
|
*/

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend is running"
  });
});

/*
|--------------------------------------------------------------------------
| Resume
|--------------------------------------------------------------------------
*/

app.use("/api/resume", resumeRoutes);

/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
*/

app.use("/api/contact", contactLimiter, contactRoutes);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

/*
|--------------------------------------------------------------------------
| MongoDB + Server
|--------------------------------------------------------------------------
*/

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Portfolio backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start backend:");
    console.error(error.message);

    process.exit(1);
  }
}

startServer();
