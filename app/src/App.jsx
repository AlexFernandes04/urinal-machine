import { useEffect, useState } from 'react';
import urinalEmpty from '@/assets/urinalEmpty.png'
import urinalPiss from '@/assets/urinalPiss.png'
import urinalPerson from '@/assets/urinalPerson.png'
const images = [urinalEmpty, urinalPiss, urinalPerson]

import './App.css'

//const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://afern69:E7UowlGl45u4XRHG@cluster0.kel7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


import axios from 'axios';

const url = "https://urinal-machine-production-07f0.up.railway.app/"

const generateUrinals = () => {
  const urinalState = []

  for (let j = 0; j < 2; j++) {
    let randomEmpty = Math.floor(Math.random() * 5);
    let randomEmptyState = Math.floor(Math.random() * 2);
    urinalState[randomEmpty] = randomEmptyState;
  }

  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * 3);
    if (urinalState[i] != 0)
      urinalState[i] = random;
  }

  return urinalState
}


function App() {
  const [randomState, setRandomState] = useState()
  const [urinalState, setUrinalState] = useState([])
  const [prediction, setPrediciton] = useState([0, 0, 0, 0, 0]);
  const [loaded, setLoaded] = useState(false)

  //console.log(urinalState)
  console.log("HELP")

  const sendEntry = async (index) => {
    const response = await axios.post(`${url}/data`, {
      choice: index,
      situation: urinalState
    })
    console.log(response.data);
    setPrediciton(response.data.prediction);

    if (loaded == false) {
      setLoaded(true)
    }
  }

  useEffect(() => {
    console.log("LOADING")
    setUrinalState(generateUrinals())

    const num = Math.random()
    if (num > 0.6) {
      setRandomState(60)
    } else {
      setRandomState(40)
    }
  }, [])

  const makeAnotherSelection = () => {
    setUrinalState(generateUrinals)
    setLoaded(false)
  }


  return (
    <div className="App md:px-8 px-2 py-8 bg-white h-screen">
      <h1 className='md:text-9xl text-7xl font-bold text-center'>
        Urinal Machine
      </h1>
      <div className='text-center w-full py-2 text-gray-400 text-xl'>
        Select a urinal
      </div>
      <div className="grid grid-cols-5 gap-4 text-center md:py-0 py-12 md:gap-4 gap-0">
        {urinalState.map((urinal, index) => {
          return (<div key={index}>
            <div key={index}>
              <button disabled={urinal === 2} className='lg:h-100 md:h-64 h-32 md:w-30 lg:w-60 bg-white' key={index} onClick={() => { sendEntry(index) }}>
                <img src={images[urinal]} alt="Urinal" className='h-full w-full' />
              </button>
              {loaded == true ? (<h2 className='md:font-semibold font-light text-xs w-full text-center md:text-xl'>Probability {Number((prediction[index]) * 100).toFixed(2)} % </h2>) : null}

            </div>
          </div>
          )
        })}

      </div>
      <div className='text-center w-full md:py-12'>
        {loaded == false ? null : <button className='border-2 font-bold md:py-4 py-2 px-4 rounded md:text-xl' onClick={makeAnotherSelection}>Make Another Selection</button>}
      </div>
      <div className='text-center w-full absolute inset-x-0 bottom-0 my-4 text-gray-400'>
        {randomState ? <div>owned by Alex ({randomState + 1}%) and Om ({100 - randomState - 1}%) </div> : <div></div>}

      </div>
    </div>
  );
}

export default App;