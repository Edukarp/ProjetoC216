import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Erro ao cadastrar usuário.\nDescricao do Erro:\n ${error}`,
      });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "minha_chave_secreta",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Erro ao fazer login.\nDescricao do Erro:\n ${error}` });
  }
};
