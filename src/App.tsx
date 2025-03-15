import { ChangeEvent, useState } from 'react'
import { Buffer } from 'buffer'
import { Clipboard } from 'lucide-react';

import './App.css'

function App() {
  const [words, setWords] = useState<string | null>(null)

  const handleWords = (event : ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const codeFinal = handleCode(event.target.value)
    setWords(codeFinal)
    console.log(words)
  }

  const handleCode = (code: string): string => {
    try {
      const bufferLatin1 = Buffer.from(code, 'latin1')
      const codeFix = bufferLatin1.toString('utf8')
      return codeFix
    } catch (error) {
      console.error(`Error al decodificar el codigo ${error}`)
      return code
    }


  }

  const handleClick = () => {
    try {
      if (words != null) {
        navigator.clipboard.writeText(words)
      }
    } catch (error) {
    console.log('No hay nada que copiar')
    return
    }
    console.log('funciono')
  }

  return (
    <>
      <div className='flex justify-center items-center h-dvh'>
        <div className=''>
          <h1 className='text-7xl mb-[5rem]'>Corrector de palabras</h1>
          <form action="" className='mb-[5rem]'>
            <input className='py-2 pl-5 border border-white w-3xl rounded' type="text" onChange={handleWords} />
          </form>
          <div className='flex bg-[#161618] p-5 rounded'>
            <h2 className='text-cyan-500 text-5xl mr-3 w-5/6'>{words}</h2>
            <div className='w-1/6 flex justify-center items-center'>
            <button className='p-4 hover:border hover:border-white rounded mx-2' onClick={handleClick}> <Clipboard /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
