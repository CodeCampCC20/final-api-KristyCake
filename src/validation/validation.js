import { object, ref, string } from "yup";

export const registerSchema = object({
  username: string().min(2, "ชื่อคนต้องมากกว่า 2 ตัวนะค้าาา"),
  password: string().min(4, "password ต้องมากกว่า 4 ตัว"),
  confirmPassword: string().oneOf([ref("password", null)], "รหัสผ่านไม่ต้องกันค้าาา")
})

export const loginSchema = object({
  username: string().min(2, "ชื่อคนต้องมากกว่า 2 ตัวนะค้าาา"),
  password: string().min(4, "password ต้องมากกว่า 4 ตัว")
})

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false })
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(", ");
    console.log(errTxt)
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
}