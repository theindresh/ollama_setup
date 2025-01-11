import ollama from 'ollama';

async function randomQuestionGenerator(req, res) {
    try {
        let topic = ["science", "history", "geography", "sports", "entertainment", "technology"];
        let difficulty = ["easy", "medium", "hard"];
        const randomTopic = topic[Math.floor(Math.random() * topic.length)];
        const randomDifficulty = difficulty[Math.floor(Math.random() * difficulty.length)];
        const prompt = `Generate a random question on the topic "${randomTopic}" with a "${randomDifficulty}" difficulty level. Include 4 options and specify the correct answer.`;

        const response = await ollama.chat({
            model: 'llama3.2',
            messages: [{ role: 'user', content: prompt }],
        });
        let questionContent = response.message.content;
        const lines = questionContent.split("\n");
        const questionLine = lines.find(line => line.startsWith("**Question:**"));
        const question = questionLine ? questionLine.replace("**Question:**", "").trim() : "No question found";
        const options = lines.filter(line => /^[A-D]\)/.test(line)).map(option => option.trim());
        const correctAnswerLine = lines.find(line => line.startsWith("**Correct Answer:**"));
        const correctAnswer = correctAnswerLine ? correctAnswerLine.replace("**Correct Answer:**", "").trim() : "No correct answer found";
        res.status(200).json({ question, options, correctAnswer });
    } catch (error) {
        console.error("Error in randomQuestionGenerator:", error);
        res.status(500).send("An error occurred while generating the question.");
    }
}

export default randomQuestionGenerator;
