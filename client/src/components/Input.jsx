import { useState } from 'react'
import { ArrowsRightLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import InputDate from './InputDate'
import InputDest from './InputDest'
import InputOrig from './InputOrig'
import airportData from './airports.json'
// import fetchFromAPI from '../utils/fetchFromAPI'
import fetchFromAPI from './utils/fetchFromAPI'
import dayjs from 'dayjs'

const Input = ({ setFlightData, setIsLoading }) => {
  const [originCode, setOriginCode] = useState("")
  const [destCode, setDestCode] = useState("")
  const [departureDate, setDepartureDate] = useState(null)
  const [returnDate, setReturnDate] = useState(null)
  const [selectedOption, setSelectedOption] = useState("Round Trip")

  const handleExploreClick = async (e) => {
    e.preventDefault()

    const returnDateParam = selectedOption === 'Round Trip' ? returnDate : undefined

    if (!originCode || !destCode || !departureDate || (selectedOption === 'Round Trip' && !returnDate)) {
      alert("Please fill in all required fields")
      return
    }

    if (selectedOption === 'Round Trip' && returnDate && departureDate && dayjs(returnDate).isBefore(departureDate)) {
      alert('Please check dates.')
      return
    }

    setIsLoading(true)

    try {
      const data = await fetchFromAPI(originCode, destCode, departureDate, returnDateParam)
      console.log("Raw Amadeus response:", data)

      if (!data || !data.data || data.data.length === 0) {
        alert("No available flights.")
        setIsLoading(false)
        return
      }

      const mappedFlights = data.data.map((offer) => {
        const itinerary = offer.itineraries[0]
        const segment = itinerary.segments[0]
        const lastSegment = itinerary.segments[itinerary.segments.length - 1]

        return {
          price: {
            formatted: `$${offer.price.total}`,
          },
          legs: [
            {
              departure: segment.departure.at,
              arrival: lastSegment.arrival.at,
              origin: { displayCode: segment.departure.iataCode },
              destination: { displayCode: lastSegment.arrival.iataCode },
              durationInMinutes: itinerary.duration
                .replace("PT", "")
                .replace("H", "h ")
                .replace("M", "m")
                .trim(),
              stopCount: itinerary.segments.length - 1,
              carriers: {
                marketing: [
                  {
                    name: offer.validatingAirlineCodes[0],
                    logoUrl: `https://content.airhex.com/content/logos/airlines_${offer.validatingAirlineCodes[0]}_50_50_s.png`,
                  },
                ],
              },
            },
          ],
        }
      })

      setFlightData(mappedFlights)
      setIsLoading(false)
    } catch (error) {
      console.error("An error occurred:", error)
      setIsLoading(false)
      alert("Something went wrong while fetching flights.")
    }
  }

  const handleSwitch = () => {
    setOriginCode(destCode)
    setDestCode(originCode)
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="rounded-b-[1rem] md:rounded-lg md:px-1 md:translate-y-6 ring-1 shadow-3xl ring-slate-900/5">
      <form className="flex-col items-center py-2">
        <div className="p-2 text-center text-3xl md:text-5xl"> Flights </div>

        <select
          className="ml-4 dark:bg-slate-500 rounded-lg p-1"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option>Round Trip</option>
          <option>One Way</option>
        </select>

        <div className="flex px-4 py-3 mb-6 justify-center items-center">
          <InputOrig
            airportData={airportData}
            value={originCode}
            setOriginCode={setOriginCode}
          />

          <div className="flex-grow"></div>

          <ArrowsRightLeftIcon
            className="h-8 w-7 drop-shadow-md hover:stroke-2 cursor-pointer"
            onClick={handleSwitch}
          />

          <div className="flex-grow"></div>

          <InputDest
            airportData={airportData}
            value={destCode}
            setDestCode={setDestCode}
          />
        </div>

        <InputDate
          selectedOption={selectedOption}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
        />

        <div className="justify-center flex">
          <button
            onClick={handleExploreClick}
            className="-mt-2 shadow-xl -mb-5 flex hover:font-bold hover:ring-cyan-950 bg-teal-200 rounded-[11px] p-1.5 text-slate-800 font-semibold"
          >
            <MagnifyingGlassIcon className="h-5 w-5 mt-[3%] mr-1" />
            Explore
          </button>
        </div>
      </form>
    </div>
  )
}

export default Input
