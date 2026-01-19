import { useState, useEffect, useRef } from 'react'

const InputDest = ({ value, airportData, setDestCode }) => {
  const [suggestions, setSuggestions] = useState([])
  const maxSuggestions = 25
  const inputRef = useRef(null)

  useEffect(() => {
    function handleDocumentClick(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const onChange = (event) => {
    const rawInputValue = event.target.value
    const inputValue = rawInputValue.toLowerCase()
    setDestCode(rawInputValue)

    if (!inputValue) {
      setSuggestions([])
      return
    }

    const filteredSuggestions = airportData
      .filter((airport) => {
        const codeMatch = airport.code?.toLowerCase().includes(inputValue)
        const cityMatch = airport.city?.toLowerCase().includes(inputValue)
        const stateMatch = airport.state?.toLowerCase().includes(inputValue)
        const countryMatch = airport.country?.toLowerCase().includes(inputValue)
        const nameMatch = airport.name?.toLowerCase().includes(inputValue)
        const tzMatch = airport.tz?.toLowerCase().split('/')[1]?.includes(inputValue)

        return codeMatch || cityMatch || stateMatch || countryMatch || nameMatch || tzMatch
      })
      .slice(0, maxSuggestions)

    setSuggestions(filteredSuggestions)
  }

  const handleSuggestionClick = (code) => {
    setDestCode(code.toUpperCase())
    setSuggestions([])
  }

  return (
    <div className="w-[45%] relative" ref={inputRef}>
      <input
        type="text"
        className="search-bar ml-auto text-left bg-gray-50 border border-gray-300 text-gray-900 
        text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 
        dark:bg-gray-700 dark:border-gray-500 dark:placeholder-white dark:hover:border-white
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        hover:border-gray-700 w-full transition duration-200 ease-in-out"
        placeholder="Where To?"
        required
        value={value}
        onChange={onChange}
      />

      {suggestions.length > 0 && (
        <div
          id="dataResult"
          className="bg-white border dark:bg-gray-700 border-gray-300 mt-1 rounded-lg shadow-md max-h-[220px] overflow-y-auto absolute z-10 w-full"
        >
          {suggestions.map((airport, index) => (
            <div
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-500 flex justify-between items-center"
              onClick={() => handleSuggestionClick(airport.code)}
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {airport.city}, {airport.state || airport.country}
                </span>
                <span className="text-xs text-gray-500">
                  {airport.name}
                </span>
              </div>
              <div className="font-semibold">{airport.code}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputDest
