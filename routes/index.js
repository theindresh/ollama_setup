import { Router } from "express";
import Chat from "../controllers/ollama_chats.js";
const router = Router();
router.post("/chat", Chat);

export default router;