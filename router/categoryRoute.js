import express from 'express';
import { getCategoria } from '../controller/categoryController.js';
import  {verifyToken}  from '../middleware/auth.js';

const rotuer = express.Router();

// Definición de rutas corregida
rotuer.get('/getCategorias', verifyToken, getCategoria);

export default rotuer;