import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(401);
  console.log("authHeader=>", authHeaders);
  const token = authHeaders.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next()
  } catch {
    res.sendStatus(403);
  }
}