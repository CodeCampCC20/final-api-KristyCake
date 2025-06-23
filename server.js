import express from "express";
import cors from "cors";
import { notFound } from "./src/utils/not-found.util.js";
import { error } from "./src/utils/error.util.js";
import authRouter from "./src/routes/auth.route.js";
// import morgan from "morgan";

const app = express();
const PORT = 3939;

app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRouter) // for login and register of doctor and user

// 404
app.use(notFound)

// Error
app.use(error)

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));