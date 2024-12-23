import ollama from 'ollama';

async function chat(req, res) {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).send({ error: 'Message is required' });
        }
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{ role: 'user', content: message }],
        });

        res.send({ reply: response.message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
}

export default chat;