import './Main.css'
import { FaLink } from "react-icons/fa";

function Main() {
  return (
    <div className='Main'>
        <div className='mainContainer'>
            <h2>Resumos com IA</h2>
            <p>Resuma vídeos do YouTube em segundos</p>
            <form>
                <div>
                    <FaLink />
                    <input type="text" placeholder='Cole a url do vídeo do Youtube aqui'/>
                </div>
                <button type='submit'>Resumir</button>
            </form>
        </div>
    </div>
  )
}

export default Main
