import { Link } from 'react-router-dom'

import './SummaryPage.css'
import Header from '../components/Header/Header'

import { IoIosArrowBack } from "react-icons/io";

import { useState, useContext } from 'react';
import { SummaryContext } from '../context/summaryContext';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function SummaryPage() {

  const {transcriptionText, videoSummary, url} = useContext(SummaryContext)

  const [showSummaryText, setShowSummaryText] = useState(true)
  const [showTranscript, setShowTranscript] = useState(false)

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
  
    // garante dois dígitos em cada unidade
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')
  
    return `${mm}:${ss}`
  }

  const embedUrl = normalizeYouTubeUrl(url);

  //Converte qualquer url para o padrão "embed"
  function normalizeYouTubeUrl(url) {
    try {
      const u = new URL(url);
      let videoId = '';
      const params = new URLSearchParams();

      // 1) youtu.be/VIDEO_ID
      if (u.hostname === 'youtu.be') {
        videoId = u.pathname.slice(1);

      // 2) youtube.com/watch?v=VIDEO_ID
      } else if (
        u.hostname.endsWith('youtube.com') && 
        (u.pathname === '/watch' || u.pathname === '/watch/')
      ) {
        videoId = u.searchParams.get('v');

      // 3) /embed/VIDEO_ID, /shorts/VIDEO_ID ou /v/VIDEO_ID
      } else {
        const match = u.pathname.match(/^\/(?:embed|shorts|v)\/([^/?]+)/);
        if (match) videoId = match[1];
      }

      if (!videoId) {
        console.warn('Não foi possível extrair o ID do vídeo de', url);
        return '';
      }

      // Parâmetros opcionais
      // timestamp: t= or start=
      const t = u.searchParams.get('t') || u.searchParams.get('start');
      if (t) {
        // converte "1m30s" em segundos ou usa valor direto
        const seconds = /^\d+m\d+s$/.test(t)
          ? t.split(/m|s/).reduce((acc, v, i) => acc + (+v) * (i === 0 ? 60 : 1), 0)
          : parseInt(t, 10);
        params.set('start', seconds);
      }
      // playlist
      const list = u.searchParams.get('list');
      if (list) params.set('list', list);

      // montar URL de embed
      const query = params.toString();
      return `https://www.youtube.com/embed/${videoId}${query ? `?${query}` : ''}`;

    } catch (e) {
      console.error('URL inválida', e);
      return '';
    }
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

          <iframe src={embedUrl} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default SummaryPage
