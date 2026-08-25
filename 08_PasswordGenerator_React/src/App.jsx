import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [lenght, setLength] = useState(8); 
  const [numberAllowd, setNumberAllowd] = useState(false);
  const [charAllowd, setcharAllowd] = useState(false); 
  const [password, setPassword] = useState(""); 

  //useRef Hook:
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""; 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstwxyz"; 

    if(numberAllowd) str += "0123456789"; 
    if(charAllowd) str += "`~!@#$%^&*()-_=+[{]],<.>/?"; 

    for( let  i = 1; i <= lenght; i++){
      let charIndex = Math.floor(Math.random() * str.length); 
      pass += str.charAt(charIndex); 
    }

    setPassword(pass); 

  }, [lenght, numberAllowd, charAllowd, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // for chaging the state of the password that  user can see that password is selected
    passwordRef.current?.setSelectionRange(0, 5); // for selectin  particuller range of text.
    window.navigator.clipboard.writeText(password)//for coppying the text in input box.
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [lenght, numberAllowd, charAllowd, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 p-4'> 
          <h1 className='text-white text-center my-4'>Password Generator</h1>

       <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
              <input 
                  type="text"
                  value={password}
                  className="outline-none w-full py-1 px-3 text-gray-800"
                  placeholder="Password"
                  readOnly
                  ref={passwordRef}
             />

             <button 
             onClick={copyPasswordToClipboard}
             className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 transition-colors">
             Copy
             </button>
           </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'> 
              <input 
              type="range"
              min = {6}
              max = {100}
              value={lenght}
              className='cursor-pointer'
              onChange={ (e) => {setLength(e.target.value)}}
              /> 
              <label>Lenght: {lenght}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              
              type="checkbox"
              defaultChecked =  {numberAllowd}
              id = "numberInput"
              onChange={() => {
                setNumberAllowd((prev) => !prev);
              }} 
              
              />
               <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className='"flex items-center gap-x-1"'> 
              <input 
              type="checkbox"
              defaultChecked = {charAllowd}
              id = "charactorInput"
              onChange={() => {
                setcharAllowd((prev) => !prev)
              }} 
              />
              <label 
              htmlFor="characterInput">
                Charactors
              </label>
            </div>
          </div>

      </div> 

      
      
    </>
  )
}

export default App