import express from 'express'
import { Transcript } from '../controllers/ResumeWithIAController.js'


const ResumeWithIARouter = express.Router()

ResumeWithIARouter.post("/url", Transcript)

export default ResumeWithIARouter