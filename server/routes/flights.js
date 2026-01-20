import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

let accessToken = null;
let tokenExpiresAt = null;

// 🔐 Get OAuth token (On-demand for Vercel)
const getAccessToken = async () => {
  if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  try {
    const res = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    accessToken = res.data.access_token;
    tokenExpiresAt = Date.now() + res.data.expires_in * 1000 - 60000; // 1 min buffer
    return accessToken;
  } catch (error) {
    console.error("❌ Token fetch error:", error.response?.data || error.message);
    throw new Error("Failed to fetch access token");
  }
};

// ✅ Validate IATA codes
const isValidIATACode = (code) => /^[A-Z]{3}$/.test(code.toUpperCase());

// ✈️ Flight Search Endpoint 
router.get("/", async (req, res) => {
  let { origin, destination, date, returnDate } = req.query;

  origin = origin?.toUpperCase();
  destination = destination?.toUpperCase();

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "origin, destination, and date are required" });
  }

  if (!isValidIATACode(origin) || !isValidIATACode(destination)) {
    return res.status(400).json({ error: "Invalid IATA airport code" });
  }

  try {
    const token = await getAccessToken();

    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: 1,
      currencyCode: "USD",
      max: 20,
    };
    if (returnDate) params.returnDate = returnDate;

    const response = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: `Bearer ${token}` },
        params,
      }
    );

    if (!response.data?.data || response.data.data.length === 0) {
      return res.status(404).json({ error: "No flights found for these parameters" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("❌ Amadeus API error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    res.status(status).json({
      error: error.response?.data || "Failed to fetch flights",
    });
  }
});

export default router;
