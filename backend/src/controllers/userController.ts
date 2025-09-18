import { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
};