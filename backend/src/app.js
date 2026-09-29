import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientRoutes);

// Servir frontend estático en producción (opcional si se aloja junto)
app.use(express.static('../frontend'));

app.listen(PORT, () => {
  console.log(`Servidor de Los Primos corriendo en http://localhost:${PORT}`);
});