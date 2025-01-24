import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { MailtrapClient } from "mailtrap";

import { User } from "../models/user";
import { IUser } from "../common/interfaces/user";
import { CustomError } from "../common/customError";

export async function register(user: IUser) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(user.email)) throw new CustomError("Invalid email", 409);

  /*const client = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

  const sender = {
    email: "mailtrap@cacgdev.xyz",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: "cacg98@gmail.com",
    },
  ];

  client
    .send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
    })
    .then(console.log, console.error);*/

  const userExist = await User.findOne({ email: user.email });

  if (userExist) throw new CustomError("Email already used", 409);

  const hashPassword = await bcrypt.hash(user.password, 10);
  await User.create({
    email: user.email,
    password: hashPassword,
  });
}

export async function login(user: IUser) {
  const existingUser = await User.findOne({ email: user.email });

  if (!existingUser) throw new CustomError("Wrong email or password", 409);

  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!isValidPassword) throw new CustomError("Wrong email or password", 409);

  const accessToken = generateToken(existingUser._id.toString(), "1h");
  const refreshToken = generateToken(existingUser._id.toString(), "24h");
  return { accessToken, refreshToken };
}

export async function refreshToken(id: string) {
  const accessToken = generateToken(id, "1h");
  const refreshToken = generateToken(id, "24h");
  return { accessToken, refreshToken };
}

function generateToken(userId: string, expiresIn) {
  return jwt.sign({ data: userId }, process.env.TOKEN_SECRET, { expiresIn });
}
