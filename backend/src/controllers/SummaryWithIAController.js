import { YoutubeTranscript } from 'youtube-transcript';
import 'dotenv/config';                              // Carrega variáveis do .env
import { GoogleGenAI } from '@google/genai';         // Importa o SDK

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
        return res.status(400).json({success: false, msg: "URL, não compativel, verifique a url. Verifique também se a transcrição do video está ativada e que não seja conteúdo de uma live"})

        //ERRO DA URL NÂO ENCONTRADA
        //ERRO DA TRANSCRIÇÃO ESTÁ DESATIVADA NO VIDEO
    }
}

export const SummarizeText = async (req, res) => {
    try {
        const { text } = req.body

        if(!text){
            return res.status(400).json({success: false, msg: "Informe a texto a ser resumido"})
        }


        //API key
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // 2️⃣ Função que faz a chamada para gerar conteúdo
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',  //modelo
            contents: text,             // prompt de entrada
            generationConfig: {
                temperature: 0.3,        // resposta mais determinística
                //maxOutputTokens: 100     // limite de comprimento
            }
        });                     

        return res.status(200).json({success: true, msg: "Sucesso ao resumir texto", response})
    } catch (error) {
        return res.status(400).json({success: false, msg: "Falha ao tentar resumir texto"})
    }
}
