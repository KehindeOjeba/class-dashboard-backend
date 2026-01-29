import AgentAPI from "apminsight";
AgentAPI.config()


import express from "express";
import subjectRouter from './routes/subjects.js'
import cors from "cors";
import securityMiddleware from "./middleware/security.js";
import {auth} from "./lib/auth";
import {toNodeHandler} from "better-auth/node";
const app = express();
const PORT = 8000;

if (!process.env.FRONTEND_URL) throw new Error("FRONTEND_URL is not set in .env file");

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(securityMiddleware)
app.use(express.json());
app.use('/api/subjects', subjectRouter);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})