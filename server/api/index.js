// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import flightRoutes from "./routes/flights.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/flights", flightRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import flightRoutes from "../routes/flights.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/flights", flightRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import flightRoutes from "../routes/flights.js";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/flights", flightRoutes);

// // Health check (optional but useful)
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

// Routes
app.use("/api/flights", flightRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running on Vercel" });
});

// Local dev server (won’t run on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}

export default app;
