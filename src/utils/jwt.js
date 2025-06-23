import jwt from "jsonwebtoken"

export function verifyTokenUser(tokenUser) {
  const payload = jwt.verify(tokenUser, process.env.SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
}