import { Request, Response } from "express";
import User from "../models/user";

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
    res.status(500).json({ message: `Erro ao cadastrar usuário.\nDescricao do Erro:\n ${error}` });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
};
