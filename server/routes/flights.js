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



import express from "express";
import axios from "axios";

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
  } catch (error) {
    console.error("❌ Token fetch error:", error.response?.data || error.message);
  }
};

getAccessToken();
setInterval(getAccessToken, 25 * 60 * 1000);

// ✈️ Flight Search Endpoint
router.get("/", async (req, res) => {
  const { origin, destination, date, returnDate } = req.query;
  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "origin, destination, and date are required" });
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

    res.json(response.data);
  } catch (error) {
    console.error("❌ Amadeus API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

export default router;
