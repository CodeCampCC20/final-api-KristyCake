import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import jwt from "jsonwebtoken";

export async function createUser(username_cust, password) {
  const hashPassword = await bcrypt.hash(password, 12);
  const result = prisma.user.create({
    data: {
      username_cust: username_cust,
      password: hashPassword
    }
  });
  return result
}

export async function createDoctor(username_doc, password) {
  const hashPassword = await bcrypt.hash(password, 12);
  const result = prisma.doctor.create({
    data: {
      username_doc: username_doc,
      password: hashPassword
    }
  });
  return result
}

export async function verifyUser(username_cust, password) {
  const user = await prisma.user.findUnique({ where: { username_cust } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}

export function generateTokenUser(userId) {
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return token;
}

export async function verifyDoctor(username_doc, password) {
  const doctor = await prisma.doctor.findUnique({ where: { username_doc } });
  if (!doctor) return null;
  const isMatch = await bcrypt.compare(password, doctor.password);
  return isMatch ? doctor : null;
}

export function generateTokenDoctor(doctorId) {
  const token = jwt.sign({ doctorId }, process.env.SECRET_DOC, {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return token;
}

export async function getMeUser(userId) {
  const user = await prisma.user.findUnique({ where: { userId } });
  return user;
}