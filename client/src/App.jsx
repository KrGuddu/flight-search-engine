import { useState } from 'react';
import homebg from './assets/imgs/homebg.jpg';
import { FlightList, Footer, Input } from './components';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [flightData, setFlightData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative min-h-[100vh] dark:bg-gray-700 dark:text-white">
      <div className="pb-[2.5rem]">
        {flightData.length === 0 && (
          <img src={homebg} alt="home background" height={29} className="" />
        )}
        <div className="md:px-12">
          <Input setFlightData={setFlightData} setIsLoading={setIsLoading} />
        </div>
      </div>

      <FlightList flightData={flightData} isLoading={isLoading} />

      <div>
        <Footer />
      </div>

      <Analytics />
    </div>
  );
}

export default App;





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
