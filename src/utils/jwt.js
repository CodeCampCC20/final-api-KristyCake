import jwt from "jsonwebtoken"

export function verifyTokenUser(tokenUser) {
  const payload = jwt.verify(tokenUser, process.env.SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
}

export function verifyTokenDoctor(tokenDoctor) {
  const payload = jwt.verify(tokenDoctor, process.env.SECRET_DOC, {
    algorithms: ["HS256"],
  });
  return payload;
}