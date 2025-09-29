import { Request, Response } from "express";
import Movie from "../models/movie";

// Criar novo filme/série
export const createMovie = async (req: Request, res: Response) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error('Erro ao criar filme/série:', error);
    res.status(500).json({ message: "Erro ao criar filme/série.", error });
  }
};

// Listar todos os filmes/séries
export const getAllMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filmes/séries.", error });
  }
};

// Buscar filme/série por ID
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findOne({ id: req.params._id });
    if (!movie)
      return res.status(404).json({ message: "Filme/série não encontrado." });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filme/série.", error });
  }
};

// Buscar filmes/séries por tipo (Filme ou Serie)
export const getMoviesByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const movies = await Movie.find({ type });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar por tipo.", error });
  }
};

// Buscar filmes/séries por gênero
export const getMoviesByGenre = async (req: Request, res: Response) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre: genre });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar por gênero.", error });
  }
};

// Buscar melhores avaliados (rating >= 4.7)
export const getBestRatedMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.find({ rating: { $gte: 4.7 } });
    res.json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar melhores avaliados.", error });
  }
};

// Atualizar filme/série
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { id: req.params._id },
      req.body,
      { new: true }
    );
    if (!movie)
      return res.status(404).json({ message: "Filme/série não encontrado." });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar filme/série.", error });
  }
};

// Remover filme/série
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findOneAndDelete({ id: req.params._id });
    if (!movie)
      return res.status(404).json({ message: "Filme/série não encontrado." });
    res.json({ message: "Filme/série removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover filme/série.", error });
  }
};
