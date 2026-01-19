async function fetchFromAPI(originCode, destCode, departureDate, returnDate) {
  try {
    let url = `http://localhost:5000/api/flights?origin=${originCode}&destination=${destCode}&date=${departureDate}`

    if (returnDate && returnDate !== "") {
      url += `&returnDate=${returnDate}`
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("fetchFromAPI error:", error)
    throw error
  }
}

export default fetchFromAPI
