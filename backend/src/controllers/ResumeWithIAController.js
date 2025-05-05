import { YoutubeTranscript } from 'youtube-transcript';

export const Transcript = async (req, res) => {
    try {
        const { url } = req.body

        if(!url){
            return res.status(400).json({success: false, msg: "Informe a url do video"})
        }

        //Extraindo transcrição do video
        const transcript = await YoutubeTranscript.fetchTranscript(url);

        //Junta o array em um unico texto
        const text = await transcript.map(item => item.text).join(' ');

        return res.status(200).json({success: true, msg: "Sucesso ao extrair transcrição", url: url, text: text, transcript: transcript})

    } catch (error) {
        console.log(error)
        return res.status(404).json({success: false, msg: "erro, verifique a url e tente novamente", error})

        //ERRO DA URL NÂO ENCONTRADA
        //ERRO DA TRANSCRIÇÃO ESTÁ DESATIVADA NO VIDEO
    }
}