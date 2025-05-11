import './Main.css'
import ApiFetch from '../../api/api';

import { FaLink } from "react-icons/fa";

import { useState, useContext } from 'react';
import { SummaryContext } from '../../context/summaryContext';
import { Navigate, useNavigate } from 'react-router-dom';

function Main() {

  const navigate = useNavigate()

  const {transcriptionText, setTranscriptionText, loading, setLoading, videoSummary, setVideoSummary} = useContext(SummaryContext)

  const [url, setUrl] = useState()
  const [validURL, setValidURL] = useState(true)

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

  function handleSubmit(e){
    e.preventDefault()
    getVideoTranscription()
  }

  async function getVideoTranscription(){
    setLoading(true)
    try {

      // const requestBody = {url: url}
      const requestBody = {url: "https://youtu.be/dsxmE2GI4vs?si=F_HPppA2kP9XKVpb"}
      

      const responseJSON = await ApiFetch('POST', 'resume/url', requestBody)

      console.log(responseJSON)

      if(responseJSON.success == false){
        setLoading(false)
        return alert("Erro ao se conectar a Api")
      }

      const response = await responseJSON.json()

      if(response.success !== true){
        setLoading(false)
        return alert(response.msg)
      }

      console.log(response)
      setTranscriptionText(response)
      const IAResult = await getVideoSummary(response.text)
      console.log(IAResult)
      setVideoSummary(IAResult.response.candidates[0].content.parts)
      console.log(IAResult.response.candidates[0].content.parts)
      navigate("/resumo")

    } catch (error) {
      console.log(error)
      alert("Erro ao obter transcrição do video")
    }
    setLoading(false)
  }

  async function getVideoSummary(text){
    try {
      const requestBody = {text: `Aqui está a transcrição de um video no youtube, faça o resumo desse video: ${text}`}
      const responseJSON = await ApiFetch('POST', 'resume/summarizeText', requestBody)

      if(responseJSON.success == false){
        setLoading(false)
        return alert("Erro ao se conectar a Api")
      }

      const response = await responseJSON.json()
      return response
      
    } catch (error) {
      console.log(error)
      alert("Erro ao obter resumir video")
    }
  }

  return (
    <main className='Main'>
        <div className='mainContainer'>
            <h2>Resumos com IA</h2>
            <p>Resuma vídeos do YouTube em segundos</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <FaLink />
                    <input type="text" placeholder='Cole a url do vídeo do Youtube aqui' /*required*/ onChange={(e) => {inputValue(e.target.value)}}/>
                </div>
                <button type='submit' style={validURL ? {backgroundColor: "var(--mainColor)"} : {}}>{loading ? "Resumindo..." : "Resumir"}</button>
            </form>
        </div>
    </main>
  )
}

export default Main
