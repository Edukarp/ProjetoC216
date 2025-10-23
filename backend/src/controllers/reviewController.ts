import { Request, Response } from "express";
import Review from "../models/review";
import jwt from "jsonwebtoken";

// Criar review
export const createReview = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido." });

    const jwtSecret = process.env.JWT_SECRET!;
    const decoded: any = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    const { movie, rating, comment } = req.body;
    const review = new Review({ user: userId, movie, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar review.", error });
  }
};
// Listar reviews de um filme
export const getReviewsByMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const reviews = await Review.find({ movie: movieId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar reviews.", error });
  }
};

// Atualizar review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review não encontrada." });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar review.", error });
  }
};

// Deletar review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ message: "Review não encontrada." });
    res.json({ message: "Review removida com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover review.", error });
  }
};