import { Router } from "express";
import Chat from "../controllers/ollama_chats.js";
// import textToSpeec from "../controllers/text_to_speech.js";
import randomQuestionGenerator from "../controllers/randomQuestionGenerator.js";
import randomQuestionSave from "../controllers/randomQuestionSave.js";
const router = Router();
router.post("/chat", Chat);
router.post("/getRandomQuestion", randomQuestionGenerator);
router.post("/saveRandomQuestion", randomQuestionSave);

export default router;