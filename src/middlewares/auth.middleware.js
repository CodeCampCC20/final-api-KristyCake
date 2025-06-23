import { verifyTokenDoctor } from "../utils/jwt.js";
import { verifyTokenUser } from "../utils/jwt.js";

export function authMiddlewareUser(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(401);
  console.log("authHeader=>", authHeaders);
  const tokenUser = authHeaders.split(" ")[1];
  try {
    const payload = verifyTokenUser(tokenUser);
    req.userId = payload.userId;
    next()
  } catch {
    res.sendStatus(403);
  }
}

export function authMiddlewareDoctor(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(401);
  console.log("authHeader=>", authHeaders);
  const tokenDoctor = authHeaders.split(" ")[1];
  try {
    const payload = verifyTokenDoctor(tokenDoctor);
    req.doctorId = payload.doctorId;
    next()
  } catch {
    res.sendStatus(403);
  }
}