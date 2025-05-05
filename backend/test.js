import { YoutubeTranscript } from 'youtube-transcript';

async function pegaTranscricao(videoUrl) {
  const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
//   console.log(transcript);
     unirTexto(transcript)
}

pegaTranscricao('https://youtu.be/vvfWU2NQ0Dk?si=87HBjnHMSxWZ2FJn');


function unirTexto(array){
    const texto = array.map(item => item.text).join(' ');
    console.log("Texto do video:")
    console.log(texto)
}
