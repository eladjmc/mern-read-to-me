import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import users from "./routes/userRoutes.js"
import documents from "./routes/documentRoutes.js"
import directories from "./routes/directoryRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import cors from 'cors';

dotenv.config();

connectDB();

const DEV_PORT = 5000;
const port = parseInt(process.env.PORT) || DEV_PORT;

const app = express();

app.use(cors());
app.use(express.json()); // Body parser middleware

app.use('/api/v1/users', users);
app.use('/api/v1/users', directories);
app.use('/api/v1/users', documents);

app.use(errorHandler); // Error handler middleware

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
