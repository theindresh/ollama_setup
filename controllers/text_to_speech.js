import fs from 'fs';
import path from 'path';
import { TextToSpeechClient } from 'ollama-tts';
import util from 'util';

async function textToSpeec(req, res) {
    try {
        const client = new TextToSpeechClient();
        const request = {
            text: req.body.text,               
            voice: 'en-US-Wavenet-D',          
            audioEncoding: 'MP3',             
        };
        const audioContent = await client.synthesizeSpeech(request);

        const outputPath = path.join(__dirname, 'output.mp3');

        const writeFile = util.promisify(fs.writeFile);
        await writeFile(outputPath, audioContent, 'binary');
        
        res.status(200).send({ message: 'Text to speech conversion successful.', audioFile: outputPath });
      
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
}

export default textToSpeec;
