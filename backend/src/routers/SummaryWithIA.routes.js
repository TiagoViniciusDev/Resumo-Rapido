import express from 'express'
import { Transcript, SummarizeText } from '../controllers/SummaryWithIAController.js'


const SummaryWithIARouter = express.Router()

SummaryWithIARouter.post("/url", Transcript)
SummaryWithIARouter.post("/summarizeText", SummarizeText)

export default SummaryWithIARouter