import prisma from "../config/prisma.js";
import { createDoctor, createUser, verifyUser, generateTokenUser, verifyDoctor, generateTokenDoctor, getMeUser } from "../services/auth.service.js";
// import { createError } from "../utils/create.error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export async function registerUser(req, res) {
  const { username_cust, password } = req.body;
  const user = await createUser(username_cust, password);
  console.log(user)
  res.status(201).json({ id: user.id, username: user.username_cust })
}

export async function registerDoc(req, res) {
  const { username_doc, password } = req.body;
  const doctor = await createDoctor(username_doc, password);
  console.log(doctor)
  res.status(201).json({ id: doctor.id, username: doctor.username_doc })
}

export async function loginUser(req, res) {
  const { username_cust, password } = req.body;
  const user = await verifyUser(username_cust, password);
  if (!user) return res.status(401).json({ err: "Invalid USER" })
  const accessToken = generateTokenUser(user.id)
  res.json({ accessToken })
}

export async function loginDoctor(req, res) {
  const { username_doc, password } = req.body;
  const doctor = await verifyDoctor(username_doc, password);
  if (!doctor) return res.status(401).json({ err: "Invalid DOCTOR" })
  const accessToken = generateTokenDoctor(doctor.id)
  res.json({ accessToken })
}

export async function meUser(req, res) {
  const { userId } = req.userId;
  const user = await getMeUser(userId);
  res.json({ id: user.id, name: user.username_cust })
}