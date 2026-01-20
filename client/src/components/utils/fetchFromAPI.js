const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function fetchFromAPI(originCode, destCode, departureDate, returnDate) {
  try {
    let url = `${API_BASE_URL}/flights?origin=${originCode}&destination=${destCode}&date=${departureDate}`;
    if (returnDate) url += `&returnDate=${returnDate}`;

    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err?.error || "Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("fetchFromAPI error:", error);
    throw error;
  }
}

export default fetchFromAPI;
