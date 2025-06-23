import express from "express";
import { loginDoctor, loginUser, meUser, registerDoc, registerUser } from "../controllers/auth.controller.js"

// import { registerSchema, validate } from "../validation/validation.js";


const authRouter = express.Router();

// authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/register/user", registerUser);
authRouter.post("/register/doctor", registerDoc);
authRouter.post("/login/user", loginUser);
authRouter.post("/login/doctor", loginDoctor);
authRouter.get("/me/user", meUser)


export default authRouter;