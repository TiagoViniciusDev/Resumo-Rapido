import { Link } from 'react-router-dom'

import './SummaryPage.css'
import Header from '../components/Header/Header'

import { IoIosArrowBack } from "react-icons/io";

import { useState } from 'react';


function SummaryPage() {

  const [showSummaryText, setShowSummaryText] = useState(true)
  const [showTranscript, setShowTranscript] = useState(false)

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
  
    // garante dois dígitos em cada unidade
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
  
    return `${mm}:${ss}`;
  }

  const responseExample = [
		{
			"text": "você tá achando que a gente não ia fazer",
			"duration": 6.44,
			"offset": 0,
			"lang": "pt"
		},
		{
			"text": "um choque de cultura achou errado otário",
			"duration": 4.731,
			"offset": 1.709,
			"lang": "pt"
		}
	]

  return (
    <div className='SummaryPage'>
      <Header />
      <div className='main container'>
        <Link to={"/"}>
          <IoIosArrowBack />
          <p>Voltar</p>
        </Link>

        <div className='content'>
          <div className='leftSide'>
            <div className='results'>
              <div className='option' onClick={() => {setShowSummaryText(true); setShowTranscript(false)}}>
                <p>Resumo</p>
              </div>
              <div className='option' onClick={() => {setShowSummaryText(false); setShowTranscript(true)}}>
                <p>Transcrição</p>
              </div>
            </div>

            <div className='text summaryText' style={ showSummaryText ? {} : {display: 'none'}}>
              <p>Summary Text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>

            <div className='text transcript' style={ showTranscript ? {} : {display: 'none'}}>
              {responseExample.map((partOfTranscript) => (
                <div className='transcriptPart'>
                  <p>{formatTime(partOfTranscript.offset)}</p>
                  <p>{partOfTranscript.text}</p>
                </div>
              ))}
            </div>

          </div>

          <iframe src="https://www.youtube.com/embed/dsxmE2GI4vs" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
