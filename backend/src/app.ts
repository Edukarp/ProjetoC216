import express from 'express';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

dotenv.config();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Erro: MONGO_URI não está definido nas variáveis de ambiente.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
