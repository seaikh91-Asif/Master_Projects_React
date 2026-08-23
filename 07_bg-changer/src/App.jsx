import React, { useState } from 'react'

const App = () => {
  const [color, setColor] = useState(["olive"])
  return (
    <div className=' w-full h-screen' style={{backgroundColor: color}}>
      <div className='flex flex-wrap h-20 w-ful bg-amber-700 bottom-2'>
        <div  className='flex gap-5 items-center justify-between'>
            <button >red</button>
            <button>greed</button>
            <button>blue</button>
            <button>olive</button>
            <button>black</button>
            <button>gray</button>

        </div>
      </div>
    </div>
  )
}

export default App