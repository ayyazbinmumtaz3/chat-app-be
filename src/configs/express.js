import cors from "cors";
import 'dotenv/config';
import express from 'express';
import { AuthRoutes, MessageRoutes } from "../routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT ?? 3000;

// health check
app.get('/', (req, res) => {
    return res.send('App is up and running!');
});

// routes
app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})