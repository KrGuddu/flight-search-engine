// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import flightRoutes from "../routes/flights.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/flights", flightRoutes);

// app.get("/api/health", (req, res) => {
//   res.json({ status: "Backend running on Vercel" });
// });

// export default app;


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flightRoutes from "../routes/flights.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/flights", flightRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running on Vercel" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
