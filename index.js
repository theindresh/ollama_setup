import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const port = process.env.PORT || 8050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use("/api/v1", router);
app.get("/", (req, res) => {
    res.send("Welcome to Ollama Chat API");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
