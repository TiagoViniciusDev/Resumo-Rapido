import './Main.css'
import { FaLink } from "react-icons/fa";

import { useState } from 'react';

function Main() {

  const [url, setUrl] = useState()
  const [validURL, setValidURL] = useState(false)

  // console.log(validURL)

  function inputValue(URL){
    setUrl(URL)
    checkURL(URL)
  }

  function checkURL(URL){
    if(URL.includes("https") && URL.includes("youtu")){
      setValidURL(true)
    } else{
      setValidURL(false)
    }
  }

  return (
    <div className='Main'>
        <div className='mainContainer'>
            <h2>Resumos com IA</h2>
            <p>Resuma vídeos do YouTube em segundos</p>
            <form>
                <div>
                    <FaLink />
                    <input type="text" placeholder='Cole a url do vídeo do Youtube aqui' onChange={(e) => {inputValue(e.target.value)}}/>
                </div>
                <button type='submit' style={validURL ? {backgroundColor: "aqua"} : {}}>Resumir</button>
            </form>
        </div>
    </div>
  )
}

export default Main
