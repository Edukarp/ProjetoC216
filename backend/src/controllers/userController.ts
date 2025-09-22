import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      message: `Erro ao cadastrar usuário.\nDescricao do Erro:\n ${error}`,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Erro ao fazer login.\nDescricao do Erro:\n ${error}` });
  }
};
