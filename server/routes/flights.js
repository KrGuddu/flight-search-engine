// import express from "express";
// import axios from "axios";

// const router = express.Router();

// let accessToken = null;

// // 🔐 Get OAuth token
// const getAccessToken = async () => {
//   try {
//     const res = await axios.post(
//       "https://test.api.amadeus.com/v1/security/oauth2/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: process.env.AMADEUS_API_KEY,
//         client_secret: process.env.AMADEUS_API_SECRET,
//       }),
//       {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       }
//     );

//     accessToken = res.data.access_token;
//   } catch (error) {
//     console.error("❌ Token fetch error:", error.response?.data || error.message);
//   }
// };

// // Initial token fetch
// getAccessToken();

// // Refresh token every 25 minutes
// setInterval(getAccessToken, 25 * 60 * 1000);

// // ✈️ Flight Search Endpoint
// router.get("/", async (req, res) => {
//   const { origin, destination, date, returnDate } = req.query;

//   if (!origin || !destination || !date) {
//     return res.status(400).json({
//       error: "origin, destination, and date are required",
//     });
//   }

//   try {
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: date,
//       adults: 1,
//       currencyCode: "USD",
//       max: 20,
//     };

//     if (returnDate) {
//       params.returnDate = returnDate;
//     }

//     const response = await axios.get(
//       "https://test.api.amadeus.com/v2/shopping/flight-offers",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         params,
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Amadeus API error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch flights" });
//   }
// });

// export default router;





// import express from "express";
// import axios from "axios";

// const router = express.Router();

// let accessToken = null;

// // 🔐 Get OAuth token
// const getAccessToken = async () => {
//   try {
//     const res = await axios.post(
//       "https://test.api.amadeus.com/v1/security/oauth2/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: process.env.AMADEUS_API_KEY,
//         client_secret: process.env.AMADEUS_API_SECRET,
//       }),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );
//     accessToken = res.data.access_token;
//   } catch (error) {
//     console.error("❌ Token fetch error:", error.response?.data || error.message);
//   }
// };

// getAccessToken();
// setInterval(getAccessToken, 25 * 60 * 1000);

// // ✈️ Flight Search Endpoint
// router.get("/", async (req, res) => {
//   const { origin, destination, date, returnDate } = req.query;
//   if (!origin || !destination || !date) {
//     return res.status(400).json({ error: "origin, destination, and date are required" });
//   }

//   try {
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: date,
//       adults: 1,
//       currencyCode: "USD",
//       max: 20,
//     };
//     if (returnDate) params.returnDate = returnDate;

//     const response = await axios.get(
//       "https://test.api.amadeus.com/v2/shopping/flight-offers",
//       { headers: { Authorization: `Bearer ${accessToken}` }, params }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Amadeus API error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch flights" });
//   }
// });

// export default router;




// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// let accessToken = null;

// // 🔐 Get OAuth token
// const getAccessToken = async () => {
//   try {
//     const res = await axios.post(
//       "https://test.api.amadeus.com/v1/security/oauth2/token",
//       new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: process.env.AMADEUS_API_KEY,
//         client_secret: process.env.AMADEUS_API_SECRET,
//       }),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );
//     accessToken = res.data.access_token;
//   } catch (error) {
//     console.error("❌ Token fetch error:", error.response?.data || error.message);
//   }
// };

// getAccessToken();
// setInterval(getAccessToken, 25 * 60 * 1000);

// // ✈️ Flight Search Endpoint
// router.get("/", async (req, res) => {
//   const { origin, destination, date, returnDate } = req.query;
//   if (!origin || !destination || !date) {
//     return res.status(400).json({ error: "origin, destination, and date are required" });
//   }

//   try {
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: date,
//       adults: 1,
//       currencyCode: "USD",
//       max: 20,
//     };
//     if (returnDate) params.returnDate = returnDate;

//     const response = await axios.get(
//       "https://test.api.amadeus.com/v2/shopping/flight-offers",
//       { headers: { Authorization: `Bearer ${accessToken}` }, params }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Amadeus API error:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch flights" });
//   }
// });

// export default router;



import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

let accessToken = null;

// 🔐 Get OAuth token
const getAccessToken = async () => {
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
    console.log("✅ Access token fetched successfully");
  } catch (error) {
    console.error("❌ Token fetch error:", error.response?.data || error.message);
  }
};

// Fetch token immediately and refresh every 25 min
getAccessToken();
setInterval(getAccessToken, 25 * 60 * 1000);

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

  if (!accessToken) {
    return res.status(500).json({ error: "Access token not available, try again later" });
  }

  try {
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
      { headers: { Authorization: `Bearer ${accessToken}` }, params }
    );

    if (!response.data.data || response.data.data.length === 0) {
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
