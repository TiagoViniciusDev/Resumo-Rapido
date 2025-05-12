import { Link } from 'react-router-dom'

import './SummaryPage.css'
import Header from '../components/Header/Header'

import { IoIosArrowBack } from "react-icons/io";

import { useState, useContext } from 'react';
import { SummaryContext } from '../context/summaryContext';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function SummaryPage() {

  const {transcriptionText, loading, setLoading, videoSummary, url} = useContext(SummaryContext)

  // console.log(url)
  // console.log(transcriptionText)

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
                <div className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {videoSummary ? 
                      videoSummary[0].text
                    : "Não foi possivel resumir o video"}
                  </ReactMarkdown>
                </div>

              {/* {console.log(videoSummary[0].text)} */}
            </div>

            <div className='text transcript' style={ showTranscript ? {} : {display: 'none'}}>

              {transcriptionText ? transcriptionText.transcript.map((partOfTranscript) => (
                <div className='transcriptPart' key={partOfTranscript.offset}>
                  <p>{formatTime(partOfTranscript.offset)}</p>
                  <p>{partOfTranscript.text}</p>
                </div>
              )) : <p>Não foi possivel extrair a transcrição do video</p>}
            </div>

          </div>

          <iframe src="https://www.youtube.com/embed/dsxmE2GI4vs" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
