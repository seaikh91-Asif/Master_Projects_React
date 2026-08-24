import React, { useState } from 'react';

const App = () => {
  
  const [color, setColor] = useState("black");

  return (
    
    <div className='w-full h-screen transition-colors duration-500' style={{ backgroundColor: color }}>

      <h1>{color}</h1>
      
      
      <div className='flex justify-center left-1/2 -translate-x-1/2 w-[85%] bg-white fixed bottom-10 items-center rounded-3xl px-6 py-4 shadow-lg'>
        <div className='flex flex-wrap justify-center items-center gap-4'>
          
          <button 
            onClick={() => setColor("red")}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Red
          </button>
          
          <button 
            onClick={() => setColor("green")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Green
          </button>
          
          <button 
            onClick={() => setColor("blue")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Blue
          </button>
          
          {/* Olive tailwind er default color noy, tai Hex code use kora holo */}
          <button 
            onClick={() => setColor("#808000")}
            className="bg-[#808000] hover:bg-[#6b6b00] text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Olive
          </button>
          
          <button 
            onClick={() => setColor("gray")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Gray
          </button>
          
          <button 
            onClick={() => setColor("yellow")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-3xl transition-colors">
              Yellow
          </button>
          
          <button 
            onClick={() => setColor("indigo")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Indigo
          </button>
          
          <button 
            onClick={() => setColor("purple")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Purple
          </button>
          
          {/* Ekta double Red chhilo, setake Orange kore dilam */}
          <button 
            onClick={() => setColor("orange")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Orange
          </button>
          
          <button 
            onClick={() => setColor("zinc")}
            className="bg-zinc-500 hover:bg-zinc-600 text-white font-semibold px-5 py-2 rounded-3xl transition-colors">
              Zinc
          </button>
          
          {/* bg-while banan bhul chilo (bg-white hobe). R ektu border dilam jate sada navbar-e button ta bojha jay */}
          <button 
            onClick={() => setColor("white")}
            className="bg-white hover:bg-gray-100 text-black font-semibold px-5 py-2 rounded-3xl border border-gray-300 transition-colors">
              White
          </button>
          
          <button 
            onClick={() => setColor("black")}
            className="bg-black hover:bg-gray-800 text-white font-semibold px-5 py-2 rounded-3xl transition-colors shadow-md">
              Black
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default App;