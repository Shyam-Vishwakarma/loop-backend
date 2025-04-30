import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import movieRoutes from "./routes/movieRoutes";

const allowedOrigins = (process.env.LOOP_ALLOWED_ORIGINS || "").split(",");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Movie API!",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api", movieRoutes);

// Handle 404s for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

export default app;
