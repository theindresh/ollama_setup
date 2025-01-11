import { Ollama } from "ollama";

async function randomQuestionSave(req, res) {

    try {
        const { question, options, correctAnswer } = req.body;
        const ollama = new Ollama();
        const prompt = `Save the following question and its details: Question: "${question}", Options: ${options.join(", ")}, Correct Answer: "${correctAnswer}".`;
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{ role: 'user', content: prompt }],
        });
        res.send({ reply: response.message.content });
    } catch (error) {
        console.error("Error in randomQuestionSave:", error);
        res.status(500).send("An error occurred while saving the question.");
    }
}

export default randomQuestionSave;